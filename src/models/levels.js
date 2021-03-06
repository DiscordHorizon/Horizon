const { Schema, model } = require('mongoose');

const Levels = Schema({
    name: String,
    exp: Array
});

module.exports = model("Levels", Levels);