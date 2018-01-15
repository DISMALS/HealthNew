const authorize = require('../authorize/authorize.routers');

module.exports = (appModule) => {
    return Array.prototype.concat([],authorize(appModule));
}