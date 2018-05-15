require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const jwt = require('jsonwebtoken');

const app = express();
module.exports = app;
app.set('superSecret', config.secret);
app.set('emailSecret', config.email_secret);
app.set('emailFrom', config.email_from);
app.set('emailPassword', config.email_password);
app.set('appUrl', config.app_url);

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json({ type: 'application/json' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.app_url);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if ('OPTIONS' === req.method) {
    //respond with 200
    res.sendStatus(200);
  } else {
    next();
  }
});

function isAuthenticated(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    // Handle token presented as a Bearer token in the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    try {
      const payload = jwt.verify(token, app.get('superSecret'));
      req.userId = payload.userId;
      return next();
    } catch(err) {
      res.send(401, err);
    }
  }

  res.send(401);
}

app.use('/api/wars', isAuthenticated, require('./routes/wars'));
app.post('/api/authenticate', require('./routes/authenticate'));
app.post('/api/signup', require('./routes/signup'));
app.get('/api/confirmation/:token', require('./routes/confirmation'));

app.listen(9080, () => console.log('Example app listening on port 9080!'));
module.exports = app;
