const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ type: 'application/json' }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3005");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/wars', require('./routes/wars'));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(9080, () => console.log('Example app listening on port 9080!'))
module.exports = app;