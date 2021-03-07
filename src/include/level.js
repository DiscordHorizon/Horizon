const userModel = require("../models/user");
const { config } = require("../config");

async function updateHorizonRole(user, guildRoles) {
    const userReq = await userModel.findOne({ id: user.id });
    const roles = config.roles;
    var adding = true;

    roles.forEach((role) => {
        if (userReq.level >= role.level) {
            if (adding) {
                const horizonRole = guildRoles.find(
                    (roles) => roles.id === role.id
                );
                user.roles.add(horizonRole);
                adding = false;
            } else {
                user._roles.forEach((roleId) => {
                    const userRole = roles.find((roles) => roles.id === roleId);
                    if (userRole.id === role.id) {
                        user.roles.remove(role);
                    }
                });
            }
        }
    });
}

module.exports = {
    async setLevel(user, roles) {
        const req = await userModel.findOne({ id: user.id });

        user._roles.forEach((roleId) => {
            const role = roles.find((roles) => roles.id === roleId);
            if (role.name.startsWith("level")) {
                user.roles.remove(role);
            }
        });

        //* level role
        const level = roles.find(
            (roles) => roles.name === `level ${req.level}`
        );
        user.roles.add(level);

        //* update horizon roles
        updateHorizonRole(user, roles);
    },
};
