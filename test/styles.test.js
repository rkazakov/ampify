const path = require('path');
const test = require('./ampify-assertion');

describe('inline styles', function() {

  it('should inject inline css into style tag', function() {
    test(
      '<link rel="stylesheet" href="styles.css">',
      '<style amp-custom="">body{background-color:#fff}</style>',
      {cwd: __dirname.split(path.sep).pop()}
    );
  });

});
