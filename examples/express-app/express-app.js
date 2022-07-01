const express = require('express');
const ampify = require('ampify');

const app = express();

app.use(express.static('public'));

app.get('/article', async (req, res) => {
  const html = `
    <html>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-123456789-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-123456789-1');
        </script>
        <title>AMP page</title>
        <link rel="stylesheet" type="text/css" href="http://localhost:5000/styles.css">
      </head>
      <body>
        <p>This is an AMP article</p>
        <div>
          <p>AMP Image</p>
          <img src="http://localhost:5000/image.png" />
        </div>
        <div>
          <p>AMP Youtube</p>
          <iframe src="http://www.youtube.com/embed/OO9oKhs80aI"
            width="560" height="315" frameborder="0" allowfullscreen>
          </iframe>
        </div>
      </body>
    </html>
  `;

  const amp = await ampify(html, { cwd: 'amp' });
  res.send(amp); // serving AMP content
});

app.listen(5001, () => {
  console.log('Listening on port 5001!');
});
