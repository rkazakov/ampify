const assert = require('./assert');

describe('html amp tag', () => {
  test('should add amp attribute on html tag', () => {
    assert(
      '<html></html>',
      '<html amp=""></html>',
      {},
    );
  });
});
