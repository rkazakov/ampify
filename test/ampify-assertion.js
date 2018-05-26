const ampify = require('../');

module.exports = function(input, output, options) {
	var processed = ampify(input, options);
	expect(processed).toBe(output);
};
