const ampify = require('../');

module.exports = (input, output, options, canonicalURL) => {
  const processed = ampify(input, options, canonicalURL);
  expect(processed).toBe(output);
};
