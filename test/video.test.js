const test = require('./ampify-assertion');

describe('amp-video tag', function() {

  it('should replace video tag with amp-video', function() {
    test(
      '<video src="test.mpg">',
      '<amp-video src="test.mpg"></amp-video>',
      {}
    );
  });

});
