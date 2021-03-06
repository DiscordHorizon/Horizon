const { Schema, model } = require('mongoose');

const User = Schema({
    id: String,
    level: Number,
    lastConnection: Number,
    accumulatedTime: Number,
    tasks: Array,
});

module.exports = model("User", User);