const path = require('path');
const assert = require('./assert');

describe('inline styles', () => {
  test('should inject inline css into style tag', () => {
    assert(
      '<head><link rel="stylesheet" href="styles1.css"></head>',
      '<head><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript><style amp-custom="">body{background-color:#fff}</style></head>',
      { cwd: __dirname.split(path.sep).pop() },
    );
  });
  test('should inject inline css into style tag on multiple files', () => {
    assert(
      '<head><link rel="stylesheet" href="styles1.css"><link rel="stylesheet" href="styles2.css"></head>',
      '<head><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript><style amp-custom="">body{background-color:#fff}footer{background-color:#fff}</style></head>',
      { cwd: __dirname.split(path.sep).pop() },
    );
  });

  test('should inject inline css into style tag on multiple files', () => {
    assert(
      '<head><link rel="stylesheet" href="styles1.css"><link rel="stylesheet" href="styles2.css"></head>',
      '<head><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript><style amp-custom="">body{background-color:#fff}footer{background-color:#fff}</style></head>',
      { cwd: __dirname.split(path.sep).pop() },
    );
  });
});
