const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    first_Name: String,
    last_Name: String,
    email: String,
    gender: String,
    city: [String],
    country: String,
    phoneNumber: Number,
    currentAddress: String,
    permanentAddress: String,
    remeberme: Boolean
});

module.exports = mongoose.model('user', userSchema);