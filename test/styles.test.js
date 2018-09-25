const nock = require('nock');
const path = require('path');
const assert = require('./assert');

describe('inline styles', () => {
  test('should inject inline css into style tag', () => {
    const customStyles = '<style amp-custom="">body{background-color:#fff}b{font-size:10px}</style>';
    assert('<html><head><link rel="stylesheet" href="styles1.css"><link rel="stylesheet" href="styles2.css"></head></html>',
      `<html amp=""><head>${customStyles}<meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript></head></html>`,
      { cwd: __dirname.split(path.sep).pop() });
  });

  test.only('should inject inline css retrieved via the network into style tag', (done) => {
    nock('http://www.example.com')
      .get('/styles.css')
      .reply(200, `
          body {
            background-color: #FFF;
          }
      `);

    assert(
      '<link rel="stylesheet" href="http://www.example.com/styles.css">',
      '<style amp-custom="">body{background-color:#fff}</style>',
      { cwd: __dirname.split(path.sep).pop() },
    );
    done();
  });
});
