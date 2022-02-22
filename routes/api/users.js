const express = require('express');

const { authenticate, upload, controllerSync } = require('../../middlewares');
const { atherUserAction } = require('../../controllers');
const { auth } = require('../../controllers');

const router = express.Router();

router.get('/current', authenticate, controllerSync(auth.currentUser));

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  controllerSync(atherUserAction.uploadAvatar),
);

module.exports = router;
