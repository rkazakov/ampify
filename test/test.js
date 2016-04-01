var path = require('path');
var expect = require('chai').expect;
var ampify = require('../');

var test = function(input, output, options) {
	var processed = ampify(input, options);
	expect(processed).to.eql(output);
};

describe('ampify', function() {

	describe('html amp tag', function() {

		it('should add amp attribute on html tag', function () {
			test(
				'<html></html>',
				'<html amp=""></html>',
				{}
			);
		});

	});

	describe('head tag', function() {

		describe('amp library script tag', function() {

			it('should include amp library script tag', function () {
				test(
					'<html><head><meta charset="utf-8"></head></html>',
					'<html amp=""><head><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script></head></html>',
					{}
				);
			});

			it('should not include amp library script tag if it is already there', function () {
				test(
					'<html amp=""><head><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script></head></html>',
					'<html amp=""><head><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script></head></html>',
					{}
				);
			});

		});

		describe('meta tag', function() {

			it('should include meta tag with utf-8 charset attribute', function () {
				test(
					'<html><head></head></html>',
					'<html amp=""><head><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script></head></html>',
					{}
				);
			});

			it('should not include meta tag if it is already there', function () {
				test(
					'<html amp=""><head><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script></head></html>',
					'<html amp=""><head><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script></head></html>',
					{}
				);
			});

		});

	});

	describe('inline styles', function() {

		it('should inject inline css into style tag', function () {
			test(
				'<link rel="stylesheet" href="style.css">',
				'<style amp-custom="">body{background-color:#FFF}</style>',
				{cwd: __dirname.split(path.sep).pop()}
			);
		});

	});

	describe('amp-img tag', function() {

		it('should replace img tag with amp-img', function() {
			test(
				'<img src="image.png" width="600" height="400">',
				'<amp-img src="image.png" width="600" height="400"></amp-img>',
				{}
			);

		});

		it('should add width and height attributes on amp-img tag', function() {
			test(
				'<img src="image.png">',
				'<amp-img src="image.png" width="600" height="400"></amp-img>',
				{cwd: __dirname.split(path.sep).pop()}
			);
		});

	});

	describe('amp-video tag', function() {

		it('should replace video tag with amp-video', function() {
			test(
				'<video src="test.mpg">',
				'<amp-video src="test.mpg"></amp-video>',
				{}
			);
		});

	});

});
