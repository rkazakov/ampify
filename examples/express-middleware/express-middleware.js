const express = require('express');
const ampify = require('ampify');

const app = express();

app.use((req, res, next) => {
  if (req.url.startsWith('/amp')) {
    const { send } = res;
    res.send = async (html) => {
      const amp = await ampify(html, { cwd: 'amp' });
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

app.listen(5000, () => {
  console.log('Listening on port 5000!');
});
