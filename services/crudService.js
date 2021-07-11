const User = require('../model/users');
const AppError = require('../AppError')
const Redis = require('redis');

const redisClient = Redis.createClient();
const DEFAULT_EXPIRATION = 3600

exports.getUsers = async (req, res) => {
    redisClient.get('users', async (error, users) => {
        if (error) console.error(error)
        if (users != null) {
            console.log('redis hit')
            return res.json(JSON.parse(users))
        } else {
            const users = await User.find({})
            redisClient.setex('users', DEFAULT_EXPIRATION, JSON.stringify(users))
            console.log('redis miss')
            res.send(users)
        }
    })
}

exports.getUserByAccountOrIdentity = async (req, res, next) => {
    const { accountNumber, identityNumber } = req.query;
    redisClient.get('user', async (error, user) => {
        if (error) console.error(error)
        if (user != null) {
            console.log('redis hit')
            return res.json(JSON.parse(user))
        } else {
            console.log('redis miss')
            const user = await User.find({"$or" : [{ accountNumber: accountNumber}, {identityNumber : identityNumber}]})
            redisClient.setex('user', DEFAULT_EXPIRATION, JSON.stringify(user))
            res.send(user)
        }
    })
    
}

exports.addUser = async (req, res, next) => {
    console.log(req.body)
    const newUser = new User(req.body);
    try {
        await newUser.save();
        const updatedUsers = await User.find();
        console.log(updatedUsers)
        redisClient.setex('users', DEFAULT_EXPIRATION, JSON.stringify(updatedUsers))
        res.redirect(`/users/search?identityNumber=${newUser.identityNumber}`)
    } catch (err) {
        res.send(err)
    }
}

exports.editUser = async (req, res) => {
    const { identityNumber } = req.params;
    const query = { identityNumber: identityNumber }
    try {
        const user = await User.findOneAndUpdate(query, req.body, {runValidators: true, context: 'query', useFindAndModify: false, new:true });
        const updatedUser = await User.find({_id: user._id});
        console.log(updatedUser)
        redisClient.setex('user', DEFAULT_EXPIRATION, JSON.stringify(updatedUser))
        res.redirect(`/users/search?identityNumber=${user.identityNumber}`)
    } catch (err) {
        res.send(err)
    }
    // res.send(`you're trying to update`)
}

exports.deleteUser = async (req, res) => {
    const { identityNumber } = req.params;
    // console.log(identityNumber)
    const user = await User.findOneAndDelete({identityNumber: identityNumber})
    const updatedUsers = await User.find();
    console.log(updatedUsers)
    redisClient.setex('users', DEFAULT_EXPIRATION, JSON.stringify(updatedUsers))
    res.redirect('/users')
}