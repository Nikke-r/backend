const mongoose = require('mongoose');

const ClickSchema = mongoose.Schema({
    username: String,
});

module.exports = mongoose.model('Clicks', ClickSchema);