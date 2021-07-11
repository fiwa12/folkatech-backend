require('dotenv').config();

const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const User = require('./model/users');
const Admin = require('./model/admin');
const jwt = require('jsonwebtoken')


const usersRoutes = require('./routes/usersRoutes');
const adminRoutes = require('./routes/adminRoutes');
const morgan = require('morgan');

const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/safira';

const AppError = require('./AppError');

app.use(morgan('tiny'))

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  })
  .catch((err) => { 
    console.log("SOMETHING IS NOT RIGHT..");
    console.log(err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/dog', (req, res) => {
  res.send('WOOF!!')
})

app.get('/chicken', (req, res) => {
  chicken.fly();
})

app.get('/admin', (req, res) => {
  throw new AppError('You are not an administrator', 403)
})

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
const { checkServerIdentity } = require("tls");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, admin) => {
        if (err) return res.sendStatus(403)
        req.admin = admin
        next()
    })
}


app.use('/users', authenticateToken, usersRoutes);
app.use('/auth', adminRoutes);

app.use((req,res) => {
  res.status(404).send(`URL NOT FOUND`)
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'SOMETHING WENT WRONG' } = err
  res.status(status).send(message)
})


const port = process.env.PORT || 3001
app.listen(port, console.log(`> APP IS LISTENING ON PORT ${port}`));
