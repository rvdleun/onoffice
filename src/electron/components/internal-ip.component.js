const internalIp = require('internal-ip');

module.exports.init = function(global) {
    global.getInternalIP = function() {
        const ip = internalIp.v4.sync();

        return ip ? `${ip}:24242` : null;
    }
};
