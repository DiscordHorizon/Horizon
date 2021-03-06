const userModel = require('../models/user');

module.exports = {
    async setLevel(user, roles) {
        const req = await userModel.findOne({ id: user.id });

        user._roles.forEach(roleId => {
            const role = roles.find(roles => roles.id === roleId)
            if (role.name.startsWith('level')) {
                user.roles.remove(role);
            }
        });

        const level = roles.find( roles => roles.name === `level ${req.level}` );

        user.roles.add(level);
    }
}