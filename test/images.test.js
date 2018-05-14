const path = require('path');
const test = require('./ampify-assertion');

describe('amp-img tag', function() {

  it('should replace img tag with amp-img', function() {
    test(
      '<img src="image.png" width="600" height="400">',
      '<amp-img src="image.png" width="600" height="400"></amp-img>',
      {}
    );

  });

  it('should add width and height attributes on amp-img tag', function() {
    test(
      '<img src="image.png">',
      '<amp-img src="image.png" width="600" height="400"></amp-img>',
      {cwd: __dirname.split(path.sep).pop()}
    );
  });

  it('should remove invalid img tag', function() {
    test(
      '<img>',
      '',
      {}
    );
  });

});
