const jwt = require('jsonwebtoken');

const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const tokens = async (_id) => {
    const payload = { id: _id };
    
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '30d' });
  
    return { token, refreshToken };
};


module.exports = { tokens };