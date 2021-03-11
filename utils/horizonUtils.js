let config;
try {
    config = require("../config.json");
} catch (error) {
    config = null;
}

exports.discord = config ? config.discord : process.env.DISCORD;
exports.mongoUri = config ? config.mongo : process.env.MONGO_URI;
exports.tasks = {
    log: config ? config.channels.tasks.log : process.env.LOG,
    tasks: config ? config.channels.tasks.tasks : process.env.TASKS,
    add: config ? config.channels.tasks.add : process.env.ADD,
    remove: config ? config.channels.tasks.remove : process.env.REMOVE,
};
