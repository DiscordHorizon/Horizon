const { Schema, model } = require('mongoose');

const User = Schema({
    id: String,
    lastConnection: Number,
    accumulatedTime: Number,
    tasks: Array,
});

module.exports = model("User", User);