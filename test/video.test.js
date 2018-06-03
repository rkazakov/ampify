const assert = require('./assert');

describe('amp-video tag', () => {
  test('should replace video tag with amp-video', () => {
    assert(
      '<video src="test.mpg">',
      '<amp-video src="test.mpg"></amp-video>',
      {},
    );
  });
});
