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

  /* head */

  /* main amp library */
  $('head script[src="https://cdn.ampproject.org/v0.js"]').remove();
  $('head').prepend('<script async src="https://cdn.ampproject.org/v0.js"></script>');

  /* meta charset */
  $('head meta[charset="utf-8"]').remove();
  $('head meta[charset="UTF-8"]').remove();
  $('head').prepend('<meta charset="utf-8">');

  /* meta viewport */
  if ($('head meta[content="width=device-width,minimum-scale=1,initial-scale=1"]').length === 0) {
    $('head').append('<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">');
  }

  /* style amp-boilerplate */
  if ($('head style[amp-boilerplate]').length === 0) {
    $('head').append('<style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>');
  }

  /* img dimensions */
  $('img:not(width):not(height)').each(function() {
    var src = $(this).attr('src');
    if (!src) {
      return $(this).remove();
    }
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

		try {
			if (src.indexOf('//') === -1) {
				path = options.cwd + '/' + src;
				if (fs.existsSync(path)) {
					file = setFile(String(fs.readFileSync(path)));
				}
			}
			else if (src.indexOf('//') != -1) {
				file = setFile(String(request(path).data));
			};
		} catch (err) {
			console.dir(err);	
		}

    $(this).replaceWith(file);
  });

  /* amp tags */
  $(tags.amp.join(',')).each(function() {
    this.name = 'amp-' + this.name;
  });

  return $.html();
}
