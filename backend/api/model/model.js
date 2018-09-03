const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    country: String
});

module.exports = mongoose.model('user', userSchema);