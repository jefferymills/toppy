const User = require('../models/User');
const jwt = require('jsonwebtoken');
const app = require('../index');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const { email, password, passwordConfirm, firstName, lastName } = req.body;
  
    if (password === passwordConfirm) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOrCreate({
            where: { email },
            defaults: { password: hashedPassword, firstName, lastName }
        });
        const [newUser, isNew] = user;
        
        if (!isNew) {
            res.json({ success: false, message: `Email ${email} already exists`});
        } else {
            res.json({ success: true });
        }

    } else {
        res.json({ success: false, message: 'Password confirmation did not match' })
    }
};
