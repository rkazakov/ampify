const express = require('express');
const ampify = require('../../index');

const app = express();

app.get('/article', (req, res) => {
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
      </head>
      <body>
        <div>
          <p>This is an AMP article</p>
          <iframe src="http://www.youtube.com/embed/OO9oKhs80aI"
                  width="560" height="315" frameborder="0" allowfullscreen></iframe>
        </div>
      </body>
    </html>
  `;

	const amp = ampify(html, {cwd: 'amp'});
	res.send(amp); // serving AMP content
});

app.listen(5000, () => {
	console.log('Listening on port 5000!');
});
