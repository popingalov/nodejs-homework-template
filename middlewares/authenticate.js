const jwt = require('jsonwebtoken');
const CreateError = require('http-errors');

///

const { User } = require('../models');
const { badAuth } = require('../libs/http-responses');

///

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new CreateError(badAuth.code, badAuth.status);
    }
    // wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww

    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw new CreateError(badAuth.code, badAuth.status);
    }

    // wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
    const { SECRET_KEY } = process.env;
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(_id);
    if (!user.token) {
      throw new CreateError(badAuth.code, badAuth.status);
    }
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
