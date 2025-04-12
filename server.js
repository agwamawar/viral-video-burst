
const express = require('express');
const app = express();
const port = 9005;

app.get('/', (req, res) => {
  res.send('Server is running on localhost:9005');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
