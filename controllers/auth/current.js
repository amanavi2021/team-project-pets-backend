// отримати дані поточного користувача
const current = async (req, res) => {
    const { email, name } = req.user;
    res.json({
      email,
      name,
    });
  };

module.exports = current; 