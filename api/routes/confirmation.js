const User = require('../models/User');
const jwt = require('jsonwebtoken');
const app = require('../index');

module.exports = async (req, res) => {
    try {
        const { user } = jwt.verify(req.params.token, app.get('emailSecret'));
        const result = await User.update({ confirmed: true }, { where: { id: user } });
        res.send({ success: true, result });
    } catch (e) {
        res.send(e);
    }
};
