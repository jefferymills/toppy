const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const jwt = require('jsonwebtoken');

const app = express();
module.exports = app;
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json({ type: 'application/json' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3006');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  } else {
    next();
  }
});

function isAuthenticated(req, res, next) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    // Handle token presented as a Bearer token in the Authorization header
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    try {
      const payload = jwt.verify(token, app.get('superSecret'));
      console.log(payload);
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

app.listen(9080, () => console.log('Example app listening on port 9080!'));
module.exports = app;
