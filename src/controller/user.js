const userModel = require('../models/user');

async function userVerify(userId, name) {
    const req = await userModel.findOne({ id: userId });

    if (!req) {
        const newUser = new userModel({
            id: userId,
            lastConnection: Date.now(),
            accumulatedTime: 0,
            tasks: Array,
        });
        await newUser.save();
    }

    return (user = await userModel.findOne({ id: userId }));
};

module.exports = {
    
};