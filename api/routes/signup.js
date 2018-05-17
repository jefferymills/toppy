const User = require('../models/User');
const jwt = require('jsonwebtoken');
const app = require('../index');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: app.get('emailFrom'),
    pass: app.get('emailPassword'),
  },
});

const CONFIRMATION_URL = `${app.get('appUrl')}/confirmation`;

module.exports = async (req, res) => {
  const {
    email, password, passwordConfirm, firstName, lastName,
  } = req.body;

  if (password === passwordConfirm) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOrCreate({
      where: { email },
      defaults: {
        password: hashedPassword,
        firstName,
        lastName,
        confirmed: false,
      },
    });
    const [newUser, isNew] = user;

    if (!isNew) {
      res.json({ success: false, message: `Email ${email} already exists` });
    } else {
      const token = jwt.sign({ user: newUser.id }, app.get('emailSecret'));
      const confirmUrl = `${CONFIRMATION_URL}/${token}`;
      const mailOptions = {
        from: app.get('emailFrom'), // sender address
        to: email, // list of receivers
        subject: 'Toppy email confirmation', // Subject line
        html: `<p><a href="${confirmUrl}">Click here</a> to confirm your email address.</p>`, // plain text body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });

      res.json({ success: true });
    }
  } else {
    res.json({
      success: false,
      message: 'Password confirmation did not match',
    });
  }
};
