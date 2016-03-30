var cheerio = require('cheerio');
var fs = require('fs');
var sizeOf = require('image-size');
var request = require('sync-request');
var cleanCss = require('clean-css');

module.exports = function(html, options) {
  var tags = {
    amp: ['img', 'video']
  };

  var $, round;
  var options = options || {};
  
  options.normalizeWhitespace = options.normalizeWhitespace || false;
  options.xmlMode = options.xmlMode || false;
  options.decodeEntities = options.decodeEntities || false;

  options.cwd = options.cwd || '';
  options.round = options.round || true;

  $ = cheerio.load(html, options);

  if (options.round) {
    round = function(numb) { return Math.round(numb / 5) * 5; }
  }
  else {
    round = function(numb) { return numb; }
  }

  /* html ⚡ */
  $('html').each(function() {
    $(this).attr('amp', '');
  });

  /* img dimensions */
  $('img:not(width):not(height)').each(function() {
    var src = $(this).attr('src');
    if (src.indexOf('//') === -1) {
      var image = options.cwd + '/' + $(this).attr('src');
      if (fs.existsSync(image)) {
        var size = sizeOf(image);
        $(this).attr({
            width: round(size.width),
            height: round(size.height)
        });
      }
    }
    else if (src.indexOf('//') != -1) {
      var imageUrl = this.attribs.src;
      var response = request('GET', imageUrl);
      if (response.statusCode === 200) {
        var size = sizeOf(response.body);
        $(this).attr({
          width: round(size.width),
          height: round(size.height)
        });
      }
    };
  });

  /* inline styles */
  $('link[rel=stylesheet]').each(function() {
    var src = $(this).attr('href');
    var path = src;
    var file = '';
    var setFile = function (data) {
      var minified = new cleanCss().minify(data).styles;
      return '<style amp-custom>' + minified + '</style>';
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

  /* amp tags */
  $(tags.amp.join(',')).each(function() {
    this.name = 'amp-' + this.name;
  });

  return $.html();
}
