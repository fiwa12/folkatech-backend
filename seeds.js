const mongoose = require("mongoose");
const User = require('./model/users');

mongoose
  .connect("mongodb://localhost:27017/folkatech-backend", {
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

const u = new User({
    userName: 'Fira',
    accountNumber: '12789647',
    emailAddress: 'fira@gmail.com',
    identityNumber: '12847'
})
u.save().then(p => {
    console.log(p)
})
.catch(e => console.log(e))