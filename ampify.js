var postxml = require('postxml');
//var plugin = require('postxml-custom-tags');
var cheerioOptions = {};

var html = '<html><head><link rel="stylesheet" href="assets/style.css"></head><img src="http://www.bendigodogtraining.com.au/Images/Dog%20line/C7.gif"><img src="assets/test.png"></html>';

var output = postxml([
      require('postxml-amp')({cwd:'F:/RK/Projects/ampify'})
   ])
   .process(html, cheerioOptions);

console.log(output);
