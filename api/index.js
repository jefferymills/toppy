const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ type: 'application/json' }));

app.use('/api/battle', require('./routes/battle'));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(9080, () => console.log('Example app listening on port 9080!'))
module.exports = app;