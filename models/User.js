const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    points: Number,
});

module.exports = mongoose.model('User', UserSchema);