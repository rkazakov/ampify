var fs = require('fs');
var sizeOf = require('image-size');
var request = require('sync-request');

module.exports = function (options) {
  var tags = {
    amp: ['img', 'video']
  };

  var round;
  var options = options || {};
  options.cwd = options.cwd || '';
  options.round = options.round || true;
  if (options.round) {
    round = function (numb) {
        return Math.round(numb / 5) * 5
    }
  } else {
    round = function (numb) {
        return numb;
    }
  }

  return function ($) {
    /* html ⚡ */
    $('html').each(function () {
      $(this).attr('amp', '');
    });

    /* amp-img, amp-video */
    $(tags.amp.join(',')).each(function () {
        this.name = 'amp-' + this.name;
    });

    /* local amp-img */
    $('amp-img[src]:not([src*="//"]):not(width):not(height)').each(function () {
        var image = options.cwd + '/' + $(this).attr('src');
        if (fs.existsSync(image)) {
          var size = sizeOf(image);
          $(this).attr({
              width: round(size.width),
              height: round(size.height)
          });
        }
    });

    /* remote amp-img */
    $('amp-img[src*="//"]:not(width):not(height)').each(function () {
      var imageUrl = this.attribs.src;
      var response = request('GET', imageUrl);
      if (response.statusCode === 200) {
        var size = sizeOf(response.body);
        $(this).attr({
          width: round(size.width),
          height: round(size.height)
        });
      }
    });

    /* inline styles */
    $('link[rel=stylesheet]').each(function () {
      var src = $(this).attr('href');
      var path = src;
      var file = '';
      var setFile = function (data) {
            return '<style amp-custom>' + data + '</style>';
      };

      if (src.indexOf('//') === -1) {
        path = options.cwd + '/' + src;
        if (fs.existsSync(path)) {
          file = setFile(String(fs.readFileSync(path)));
        }
      }
      else if (src.indexOf('//') != -1) {
        file = setFile(String(request(path).data));
      };

      $(this).replaceWith(file);
    });

  };
};
