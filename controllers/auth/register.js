const CreateError = require('http-errors');
const gravatar = require('gravatar');
//

const { User } = require('../../models');
const { сonflict, created } = require('../../libs/http-responses');
const { authSucc } = require('../../helpers/index');
//
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new CreateError(сonflict.code, сonflict.status(email));
  }

  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, avatarURL });

  newUser.setPassword(password);

  await newUser.save();
  authSucc(
    res,
    { user: { email, subscription: 'starter' } },
    created.code,
    created.status,
  );
};

module.exports = register;
