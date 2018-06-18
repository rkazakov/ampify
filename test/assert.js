const ampify = require('../');

module.exports = async (input, output, options) => {
  const processed = await ampify(input, options);
  expect(processed).toBe(output);
};
