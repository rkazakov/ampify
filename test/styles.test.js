const path = require('path');
const assert = require('./assert');

describe('inline styles', () => {
  test('should inject inline css into style tag', () => {
    assert(
      '<link rel="stylesheet" href="styles.css">',
      '<style amp-custom="">body{background-color:#fff}</style>',
      { cwd: __dirname.split(path.sep).pop() },
    );
  });
});
