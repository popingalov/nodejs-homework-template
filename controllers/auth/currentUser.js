const { User } = require('../../models');
const jwt = require('jsonwebtoken');

//

const { sendSucc } = require('../../helpers/index');
const { ok } = require('../../libs/http-responses');

///
const getCurrentUser = async (req, res) => {
  const { SECRET_KEY } = process.env;
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(' ');

  const { _id } = jwt.verify(token, SECRET_KEY);

  //
  const currentUser = await User.findById(_id);
  //
  sendSucc(res, { currentUser }, ok.code, ok.status);
};

module.exports = getCurrentUser;
