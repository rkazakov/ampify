# ampify

[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![Known Vulnerabilities](https://snyk.io/test/github/rkazakov/ampify/badge.svg)](https://snyk.io/test/github/rkazakov/ampify)

> Convert plain HTML to Google AMP (Accelerated Mobile Pages)

## Installation
```sh
npm install ampify --save
```

## Usage

```js
const ampify = require('ampify');
const html = '<YOUR_HTML_CONTENT>';
const amp = ampify(html, {cwd: 'amp'});
console.log(amp); // Content of AMP HTML
```

## Simple Express App

```js
const ampify = require('ampify');
const express = require('express');

const app = express();

app.get('/', function (req, res) {
  const html = `
    <html>
      <head>
      <title>AMP page</title>
      </head>
      <body>
        <div>
          <p>This is text</p>
        </div>
      </body>
    </html>
  `;

  const amp = ampify(html, {cwd: 'amp'});

  res.send(amp); // Serving AMP HTML 
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
```

## Options
### cwd
**Assets (images/styles) file path**
Type: `String`
Default: `''`

### round
**Enable images dimensions rounding**
Type: `String`
Default: `true`

## Example

### Input
```html
<html>
  <head>
    <link rel="stylesheet" href="style.css">
  </head>
  <img src="image.png">
</html>
```

###### image.png
[image.png](/test/image.png)

###### style.css
```css
body {
  background-color: #fff;
}
```

### Output
```html
<html amp="">
  <head>
    <style amp-custom="">body{background-color:#fff}</style>
  </head>
  <amp-img src="image.png" width="600" height="400"></amp-img>
</html>
```

## Release History

[HISTORY](./HISTORY.md)

## Licence
MIT (c) Ruslan Kazakov and [contributors](https://github.com/rkazakov/ampify/graphs/contributors)

[PostXML]: https://github.com/postxml/postxml
[npm-url]: https://www.npmjs.org/package/ampify
[npm-image]: https://img.shields.io/npm/v/ampify.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/ampify.svg?style=flat-square
