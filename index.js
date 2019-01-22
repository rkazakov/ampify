const fs = require('fs');
const url = require('url');
const cheerio = require('cheerio');
const request = require('request');
const sizeOf = require('image-size');
const CleanCss = require('clean-css');

module.exports = (html, options) => {
  const tags = {
    amp: ['img', 'video'],
  };

  let youtube = false;

  const cheerioOptions = options || {
    cwd: options.cwd || '',
    round: options.round || true,
    normalizeWhitespace: options.normalizeWhitespace || false,
    xmlMode: options.xmlMode || false,
    decodeEntities: options.decodeEntities || false,
  };

  const $ = cheerio.load(html, cheerioOptions);

  const round = cheerioOptions.round
    ? numb => Math.round(numb / 5) * 5
    : numb => numb;

  /* html ⚡ */
  $('html').each((index, element) => {
    $(element).attr('amp', '');
  });

  /* head */

  /* main amp library */
  $('head script[src="https://cdn.ampproject.org/v0.js"]').remove();
  $('head').prepend('<script async src="https://cdn.ampproject.org/v0.js"></script>');

  /* meta charset */
  $('head meta[charset="utf-8"]').remove();
  $('head meta[charset="UTF-8"]').remove();
  $('head').prepend('<meta charset="utf-8">');

  /* google analytics */
  $('script').each((index, element) => {
    const src = $(element).attr('src');
    if (src) {
      const trackingId = src.match(/\bUA-\d{4,10}-\d{1,4}\b/);
      if (trackingId) {
        $(element).remove();
        $('head').prepend('<script async custom-element="amp-analytics"src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>');
        $('body').append(`<amp-analytics type="googleanalytics">
          <script type="application/json">
            { "vars": {
                "account": "${trackingId}"
              },
              "triggers": {
                "trackPageview": {
                  "on": "visible",
                  "request": "pageview"
                }
              }
            }
          </script>
        </amp-analytics>`);
      }
    }
    const scriptContent = $(element).html();
    const htmlScriptContent = scriptContent.match(/function gtag\(\){dataLayer\.push\(arguments\);}/);
    if (scriptContent && htmlScriptContent) {
      $(element).remove();
    }
  });

  /* meta viewport */
  if ($('head meta[content="width=device-width,minimum-scale=1,initial-scale=1"]').length === 0) {
    $('head').append('<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">');
  }

  /* style amp-boilerplate */
  if ($('head style[amp-boilerplate]').length === 0) {
    $('head').append('<style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>');
  }

  /* body */

  /* img dimensions */
  $('img:not([width]):not([height])').each((index, element) => {
    const src = $(element).attr('src');
    if (!src) {
      return $(element).remove();
    }
    if (src.indexOf('//') === -1) {
      const image = `${options.cwd}/${$(element).attr('src')}`;
      if (fs.existsSync(image)) {
        const size = sizeOf(image);
        $(element).attr({
          width: round(size.width),
          height: round(size.height),
        });
      }
    } else if (src.indexOf('//') !== -1) {
      const imageUrl = element.attribs.src;
      const response = request(imageUrl);
      if (response.statusCode === 200) {
        const size = sizeOf(response.body);
        $(element).attr({
          width: round(size.width),
          height: round(size.height),
        });
      }
    }
  });

  /* inline styles */
  $('link[rel=stylesheet]').each((index, element) => {
    const src = $(element).attr('href');
    let path = src;
    let file = '';
    const setFile = (data) => {
      const minified = new CleanCss().minify(data).styles;
      return `<style amp-custom>${minified}</style>`;
    };

    try {
      if (src.indexOf('//') === -1) {
        path = `${options.cwd}/${src}`;
        if (fs.existsSync(path)) {
          file = setFile(String(fs.readFileSync(path)));
        }
      } else if (src.indexOf('//') !== -1) {
        file = setFile(String(request('GET', path).body));
      }
    } catch (err) {
      console.dir(err);
    }
    $(element).replaceWith(file);
  });

  /* youtube */
  $('iframe[src*="http://www.youtube.com"],iframe[src*="https://www.youtube.com"],iframe[src*="http://youtu.be/"],iframe[src*="https://youtu.be/"]').each((index, element) => {
    youtube = true;
    const src = $(element).attr('src');
    const width = $(element).attr('width');
    const height = $(element).attr('height');
    const path = url.parse(src).pathname.split('/');
    const ampYoutube = `
    <amp-youtube
      data-videoid="${path[path.length - 1]}"
      width="${width}"
      height="${height}"
      layout="responsive">
    </amp-youtube>`;
    $(element).replaceWith(ampYoutube);
  });

  if (youtube) {
    $('head').prepend('<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js">');
  }

  /* amp tags */
  $(tags.amp.join(',')).each((index, element) => {
    const ampElement = Object.assign(element, {
      name: `amp-${element.name}`,
    });
    $(element).html($(ampElement).html());
  });

  return $.html();
};
