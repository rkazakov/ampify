const path = require('path');
const assert = require('./assert');

describe('amp-img tag', () => {
  test('should replace img tag with amp-img', () => {
    assert(
      '<img src="image.png" width="600" height="400">',
      '<html amp=""><head><meta charset="utf-8"><script async="" src="https://cdn.ampproject.org/v0.js"></script><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript></head><body><amp-img src="image.png" width="600" height="400" layout="responsive"></amp-img></body></html>',
      {},
    );
  });

  test('should add width and height attributes on amp-img tag', () => {
    assert(
      '<img src="image.png">',
      '<html amp=""><head><meta charset="utf-8"><script async="" src="https://cdn.ampproject.org/v0.js"></script><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript></head><body><amp-img src="image.png" width="600" height="400" layout="responsive"></amp-img></body></html>',
      { cwd: __dirname.split(path.sep).pop() },
    );
  });

  test('should remove invalid img tag', () => {
    assert(
      '<img>',
      '<html amp=""><head><meta charset="utf-8"><script async="" src="https://cdn.ampproject.org/v0.js"></script><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript></head><body></body></html>',
      {},
    );
  });

  test('should respect width and height', () => {
    assert(
      '<img src="image.png" width="300" height="200">',
      '<html amp=""><head><meta charset="utf-8"><script async="" src="https://cdn.ampproject.org/v0.js"></script><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript></head><body><amp-img src="image.png" width="300" height="200" layout="responsive"></amp-img></body></html>',
      { cwd: __dirname.split(path.sep).pop() },
    );
  });

  test('should not change element order or remove next element', () => {
    assert(
      '<div><p>1</p><img src="image.png" width="300" height="200"><p>2</p></div>',
      '<html amp=""><head><meta charset="utf-8"><script async="" src="https://cdn.ampproject.org/v0.js"></script><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript></head><body><div><p>1</p><amp-img src="image.png" width="300" height="200" layout="responsive"></amp-img><p>2</p></div></body></html>',
      { cwd: __dirname.split(path.sep).pop() },
    );
  });
});
