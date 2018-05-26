const expect = require('chai').expect;
const ampify = require('../');

module.exports = function(input, output, options) {
	var processed = ampify(input, options);
	expect(processed).to.eql(output);
};
