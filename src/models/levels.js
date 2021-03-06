const { Schema, model } = require('mongoose');

const Levels = Schema({
    name: String,
    expTable: Array
});

module.exports = model("Levels", Levels);