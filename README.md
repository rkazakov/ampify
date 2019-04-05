# ampify

[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]

[![Build Status](https://travis-ci.org/rkazakov/ampify.svg?branch=master)](https://travis-ci.org/rkazakov/ampify)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Known Vulnerabilities](https://snyk.io/test/github/rkazakov/ampify/badge.svg)](https://snyk.io/test/github/rkazakov/ampify)
[![Greenkeeper badge](https://badges.greenkeeper.io/rkazakov/ampify.svg)](https://greenkeeper.io/)

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

## Options

### cwd

### Assets (images/styles) file path

- Type: `String`
- Default: `''`

### round

### Enable images dimensions rounding

- Type: `String`
- Default: `true`

## Example

### Input

```html
<html>
  <head>
    <link rel="stylesheet" href="styles.css">
  </head>
  <img src="image.png">
</html>
```

#### image.png

[image.png](/test/image.png)

#### style.css

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

## More examples

See `/examples` folder for full source code.

### Using in Express App

```js
const ampify = require('ampify');
const express = require('express');

const app = express();

app.get('/article', async (req, res) => {
  const html = `
    <html>
      <head>
      <title>AMP page</title>
      </head>
      <body>
        <div>
          <p>This is an AMP article</p>
        </div>
      </body>
    </html>
  `;

  const amp = await ampify(html, {cwd: 'amp'});
  res.send(amp); // serving AMP content
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
```

### Using as Express middleware

```js
const ampify = require('ampify');
const express = require('express');

const app = express();

app.use((req, res, next) => {
  if (req.url.startsWith('/amp')) {
    const send = res.send;
    res.send = async (html) => {
      const amp = await ampify(html, {cwd: 'amp'});
      send.call(this, amp);
    };
  }
  next();
});

app.get('/amp/article', (req, res) => {
  const html = `
    <html>
      <head>
        <title>AMP page</title>
      </head>
      <body>
        <div>
          <p>This is AMP article</p>
        </div>
      </body>
    </html>
  `;
  res.send(html);
});

app.get('/article', (req, res) => {
  const html = `
    <html>
      <head>
        <title>HMTL page</title>
      </head>
      <body>
        <div>
          <p>This is HTML article</p>
        </div>
      </body>
    </html>
  `;
  res.send(html);
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
```

## Release History

[HISTORY](./HISTORY.md)

## Licence

MIT (c) Ruslan Kazakov and [contributors](https://github.com/rkazakov/ampify/graphs/contributors)

[PostXML]: https://github.com/postxml/postxml
[npm-url]: https://www.npmjs.org/package/ampify
[npm-image]: https://img.shields.io/npm/v/ampify.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/ampify.svg?style=flat-square
