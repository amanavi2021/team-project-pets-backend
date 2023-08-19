const register = require('./register');
const login = require('./login');
const refresh = require('./refresh');
const logout = require('./logout');
const update = require('./update');
const current = require('./current');
const { ctrlWrapper } = require('../../helpers');





module.exports = {
    register: ctrlWrapper(refresh),
    login: ctrlWrapper(login),
    refresh: ctrlWrapper(refresh),
    logout: ctrlWrapper(logout),
    update: ctrlWrapper(update),
    current: ctrlWrapper(current),
};