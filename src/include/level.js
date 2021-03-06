const userModel = require('../models/user');

module.exports = {
    async setLevel(user, roles) {
        const req = await userModel.findOne({ id: user.id });

        const level = roles.find( roles => roles.name === `level ${req.level}` );

        user.roles.add(level);
    }
}