const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const mockResponse = {
  foo: 'bar',
  bar: 'foo',
  baz: 'baz',
};
app.use(express.static(DIST_DIR));
app.get('/api', (req, res) => {
  res.send(mockResponse);
});
app.get('/', (req, res) => {
 res.sendFile(HTML_FILE);
});
app.listen(PORT, function () {
 console.log(`App listening on port: ${PORT}`);
});
