require('dotenv').config();

const Admin = require('../model/admin');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt)
    const admin = new Admin({
        username,
        password: hash
    })
    try {
        await admin.save();
        res.send(hash) 
    } catch (err) {
        console.log(err)
    }
}

exports.viewAdmin = async (req, res) => {
    const admin = await Admin.find({})
    res.send(admin)
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    const validAdmin = await bcrypt.compare(password, admin.password)
    if (validAdmin) {
        // req.session.admin_id = admin._id
        const accessToken = jwt.sign(validAdmin, process.env.ACCESS_TOKEN_SECRET)
        res.json({accessToken : accessToken})
    } else {
        res.send('sorry, you are not a registered admin')
    }
}
