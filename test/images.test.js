const path = require('path');
const assert = require('./assert');

describe('amp-img tag', () => {
  test('should replace img tag with amp-img', () => {
    assert(
      '<img src="image.png" width="600" height="400">',
      '<amp-img src="image.png" width="600" height="400"></amp-img>',
      {},
    );
  });

  test('should add width and height attributes on amp-img tag', () => {
    assert(
      '<img src="image.png">',
      '<amp-img src="image.png" width="600" height="400"></amp-img>',
      { cwd: __dirname.split(path.sep).pop() },
    );
  });

  test('should remove invalid img tag', () => {
    assert(
      '<img>',
      '',
      {},
    );
  });

  test('should respect width and height', () => {
    assert(
      '<img src="image.png" width="300" height="200">',
      '<amp-img src="image.png" width="300" height="200"></amp-img>',
      { cwd: __dirname.split(path.sep).pop() },
    );
  });

  test('should not change element order or remove next element', () => {
    assert(
      '<div><p>1</p><img src="image.png" width="300" height="200"><p>2</p></div>',
      '<div><p>1</p><amp-img src="image.png" width="300" height="200"></amp-img><p>2</p></div>',
      { cwd: __dirname.split(path.sep).pop() },
    );
  });
});
