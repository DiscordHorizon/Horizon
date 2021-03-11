let config;
try {
    config = require("../config.json");
} catch (error) {
    config = null;
}

exports.discord = config ? config.discord : process.env.DISCORD;
exports.mongoUri = config ? config.mongo : process.env.MONGO_URI;
exports.guild = config ? config.guild : process.env.GUILD;
exports.users = config ? config.users : process.env.USERS;
exports.tasks = {
    log: config ? config.tasks.log : process.env.LOG,
    tasks: config ? config.tasks.tasks : process.env.TASKS,
    add: config ? config.tasks.add : process.env.ADD,
    remove: config ? config.tasks.remove : process.env.REMOVE,
};
