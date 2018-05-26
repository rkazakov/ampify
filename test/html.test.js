const test = require('./ampify-assertion');

describe('html amp tag', function() {

  it('should add amp attribute on html tag', function() {
    test(
      '<html></html>',
      '<html amp=""></html>',
      {}
    );
  });

});