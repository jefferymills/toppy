const User = require('../models/User');
const jwt = require('jsonwebtoken');
const app = require('../index');

module.exports = (req, res) => {
  const { email, password } = req.body;
  
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        if (user.password === password) {
          const payload = { id: user.id };
          const token = jwt.sign(payload, app.get('superSecret'), {
            expiresIn: 60 * 60 * 24,
          });
          res.json({ success: true, message: 'ok', token });
        } else {
          res.json({ success: false, message: 'invalid email or password' });
        }
      }
    })
    .catch(e => res.json(e));
};
