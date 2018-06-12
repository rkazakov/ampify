const assert = require('./assert');

describe('amp-youtube tag', () => {
  test('should replace youtube iframe tag with amp-youtube', () => {
    assert(
      `<html>
        <head></head>
        <body><iframe
            src="http://www.youtube.com/embed/OO9oKhs80aI"
            width="560"
            height="315"
            frameborder="0"
            allowfullscreen>
          </iframe>
        </body>
        </html>`,
      `<html amp="">
        <head><script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript></head>
        <body>
    <amp-youtube data-videoid="OO9oKhs80aI" width="560" height="315" layout="responsive">
    </amp-youtube>
        </body>
        </html>`,
      {},
    );
  });

  test('should replace https://www.youtube.com/', () => {
    assert(
      `<html>
        <head></head>
        <body><iframe
            src="https://www.youtube.com/embed/OO9oKhs80aI"
            width="560"
            height="315"
            frameborder="0"
            allowfullscreen>
          </iframe>
        </body>
        </html>`,
      `<html amp="">
        <head><script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript></head>
        <body>
    <amp-youtube data-videoid="OO9oKhs80aI" width="560" height="315" layout="responsive">
    </amp-youtube>
        </body>
        </html>`,
      {},
    );
  })

  test('should replace http://youtu.be/', () => {
    assert(
      `<html>
        <head></head>
        <body><iframe
            src="https://youtu.be/OO9oKhs80aI"
            width="560"
            height="315"
            frameborder="0"
            allowfullscreen>
          </iframe>
        </body>
        </html>`,
      `<html amp="">
        <head><script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript></head>
        <body>
    <amp-youtube data-videoid="OO9oKhs80aI" width="560" height="315" layout="responsive">
    </amp-youtube>
        </body>
        </html>`,
      {},
    );
  })

  test('should replace https://youtu.be/', () => {
    assert(
      `<html>
        <head></head>
        <body><iframe
            src="https://youtu.be/OO9oKhs80aI"
            width="560"
            height="315"
            frameborder="0"
            allowfullscreen>
          </iframe>
        </body>
        </html>`,
      `<html amp="">
        <head><script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript></head>
        <body>
    <amp-youtube data-videoid="OO9oKhs80aI" width="560" height="315" layout="responsive">
    </amp-youtube>
        </body>
        </html>`,
      {},
    );
  })
});
