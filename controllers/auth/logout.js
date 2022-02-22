const { User } = require('../../models');
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  console.log('yep');
  res.status(204);

  return;

  console.log('yep2');
};

module.exports = logout;
