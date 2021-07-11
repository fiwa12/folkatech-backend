const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please insert a valid username'],
        minLength: [6, 'Please enter more than 6 characters'],
        unique: true
    },
    accountNumber: {
        type: String,
        required: [true, 'Please insert an account number, Account number can only contain numbers'],
        unique: true,
        match: [/^\d+$/, 'Please insert only numbers'],
        minLength: 6,
        maxLength: 9
    },
    emailAddress: {
        type: String,
        required: [true, 'Please insert a valid email'],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
        unique: true
},
    identityNumber: {
        type: String,
        required: [true, 'Please insert a valid identity number. Identity number can only contain numbers'],
        match: [/^\d+$/, 'Please insert only numbers'],
        minLength: 6,
        maxLength: 9,
        unique: true
    },
});

userSchema.plugin(uniqueValidator);
  
const User = mongoose.model("User", userSchema);

module.exports = User;