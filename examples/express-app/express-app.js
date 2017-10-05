const ampify = require('ampify');
const express = require('express');

const app = express();

app.get('/article', (req, res) => {
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

	const amp = ampify(html, {cwd: 'amp'});
	res.send(amp); // serving AMP content
});

app.listen(3000, () => {
	console.log('Listening on port 3000!');
});
