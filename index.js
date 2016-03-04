var cheerio = require('cheerio');

module.exports = function(html, options) {
  var tags = {
    amp: ['img', 'video']
  };

  var round;
  var options = {}, $;
  options.normalizeWhitespace = options.normalizeWhitespace || false;
  options.xmlMode = options.xmlMode || false;
  options.decodeEntities = options.decodeEntities || false;

  options.cwd = options.cwd || '';
  options.round = options.round || true;

  $ = cheerio.load(html, options);

  if (options.round) {
    round = function(numb) { return Math.round(numb / 5) * 5; }
  }
  else {
    round = function(numb) { return numb; }
  }

  /* html ⚡ */
  $('html').each(function() {
    $(this).attr('amp', '');
  });

  return $.html();
}
