var path = require('path');
var expect = require('chai').expect;
var ampify = require('../');

var test = function(input, output, options) {
	var processed = ampify(input, options);
	expect(processed).to.eql(output);
};

describe('postxml-amp', function() {

	describe('html amp tag', function() {

		it('should add amp attribute on html tag', function () {
			test(
				'<html></html>',
				'<html amp=""></html>',
				{}
			);
		});

	});

	describe('inline styles', function() {

		xit('should inject inline css into style tag', function () {
			test(
				'<link rel="stylesheet" href="style.css">',
				'<style amp-custom="">body{background-color:#FFF}</style>',
				{cwd: __dirname.split(path.sep).pop()}
			);
		});

	});

	describe('amp-img tag', function() {

		xit('should replace img tag with amp-img', function() {
			test(
				'<img src="image.png" width="600" height="400">',
				'<amp-img src="image.png" width="600" height="400"></amp-img>',
				{}
			);

		});

		xit('should add width and height attributes on amp-img tag', function() {
			test(
				'<img src="image.png">',
				'<amp-img src="image.png" width="600" height="400"></amp-img>',
				{cwd: __dirname.split(path.sep).pop()}
			);
		});

	});

	describe('amp-video tag', function() {

		xit('should replace video tag with amp-video', function() {
			test(
				'<video src="test.mpg">',
				'<amp-video src="test.mpg"></amp-video>',
				{}
			);
		});

	});

});
