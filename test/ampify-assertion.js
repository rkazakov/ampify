const ampify = require('../');

module.exports = (input, output, options) => {
  const processed = ampify(input, options);
  expect(processed).toBe(output);
};
