const User = require('../models/User');
const jwt = require('jsonwebtoken');
const app = require('../index');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.json({ success: false, message: 'Authentication failed. User not found.' });
  } else if (!user.confirmed) {
    res.json({ success: false, message: 'User email not confirmed'});
  } else {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const payload = { userId: user.id };
      const token = jwt.sign(payload, app.get('superSecret'), {
        expiresIn: 60 * 60 * 24,
      });
      res.json({ success: true, message: 'ok', token });
    } else {
      res.json({ success: false, message: 'invalid email or password' });
    }
  }
};
