const userModel = require("../models/user");
const { config } = require("../config");

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

        //* update horizon role
        config.rolesArray.forEach((roleConfig) => {
            user._roles.forEach((roleId) => {
                const role = roles.find((roles) => roles.id === roleId);
                if (role.id === roleConfig) {
                    user.roles.remove(role);
                }
            });
        });

        //* heaven
        if (req.level === 99) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.heaven
            );
            user.roles.add(role);
        }
        //* clouds
        if (req.level > 95 && req.level < 99) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.clouds
            );
            user.roles.add(role);
        }
        //* snow
        if (req.level > 90 && req.level < 96) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.snow
            );
            user.roles.add(role);
        }
        //* ice peaks
        if (req.level > 85 && req.level < 91) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.icePeaks
            );
            user.roles.add(role);
        }
        //* emerald fishs
        if (req.level > 80 && req.level < 86) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.fishs
            );
            user.roles.add(role);
        }
        //* seas
        if (req.level > 75 && req.level < 81) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.seas
            );
            user.roles.add(role);
        }
        //* lights
        if (req.level > 70 && req.level < 76) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.lights
            );
            user.roles.add(role);
        }
        //* rainbows
        if (req.level > 65 && req.level < 71) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.rainbows
            );
            user.roles.add(role);
        }
        //* vulcans
        if (req.level > 55 && req.level < 66) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.vulcans
            );
            user.roles.add(role);
        }
        //* shiny stones
        if (req.level > 45 && req.level < 56) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.shinyStones
            );
            user.roles.add(role);
        }
        //* stones
        if (req.level > 35 && req.level < 46) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.stones
            );
            user.roles.add(role);
        }
        //* rivers
        if (req.level > 25 && req.level < 36) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.rivers
            );
            user.roles.add(role);
        }
        //* flowers
        if (req.level > 15 && req.level < 26) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.flowers
            );
            user.roles.add(role);
        }
        //* trees
        if (req.level > 5 && req.level < 16) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.trees
            );
            user.roles.add(role);
        }
        //* arriving
        if (req.level < 6) {
            const role = roles.find(
                (roles) => roles.name === config.rolesIds.arriving
            );
            user.roles.add(role);
        }
    },
};
