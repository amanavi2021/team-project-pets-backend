const register = require('./register');
const login = require('./login');
const refresh = require('./refresh');
const logout = require('./logout');
const current = require('./current')

module.exports = {
    register,
    login,
    refresh,
    logout,
    current
};