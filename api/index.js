const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const app = express();
module.exports = app;
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(passport.initialize());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3006');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/api/wars', require('./routes/wars'));
app.post('/api/authenticate', require('./routes/authenticate'));

app.listen(9080, () => console.log('Example app listening on port 9080!'));
module.exports = app;
