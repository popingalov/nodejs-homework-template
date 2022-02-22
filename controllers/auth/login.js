const CreateError = require('http-errors');
const jwt = require('jsonwebtoken');
//
const { User } = require('../../models');
const { authSucc } = require('../../helpers/index');
const { ok } = require('../../libs/http-responses');

//
const login = async (req, res) => {
  const { SECRET_KEY } = process.env;

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new CreateError(401, 'Invalid email or password');
  }
  const { _id } = user;
  const payload = {
    _id,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  const { subscription } = user;
  await User.findByIdAndUpdate(_id, { token });
  authSucc(res, { token, user: { email, subscription } }, ok.code, ok.status);
};

module.exports = login;
