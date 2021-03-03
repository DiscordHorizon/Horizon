const mongoose = require("mongoose");
const { config } = require('../config');

mongoose
    .connect(config.tokens.mongoUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    })
    .then(console.log("[Database] connected"))
    .catch((err) => console.log(err));