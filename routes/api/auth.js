const express = require('express');

const { userJoiSchema } = require('../../models/users');
const {
  controllerSync,
  validation,
  authenticate,
} = require('../../middlewares');
const { auth } = require('../../controllers');

const router = express.Router();

router.post(
  '/users/register',
  validation(userJoiSchema),
  controllerSync(auth.register),
);

router.post(
  '/users/login',
  validation(userJoiSchema),
  controllerSync(auth.login),
);

router.get('/users/logout', authenticate, controllerSync(auth.logout));

router.get('/users/current', authenticate, controllerSync(auth.getCurrentUser));

module.exports = router;
