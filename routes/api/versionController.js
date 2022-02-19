const express = require('express');

const router = express.Router();

const routerv1 = require('./v1/app');

router.use('/v1', routerv1);

const { notThisV } = require('../../libs/http-responses');

router.use('/:version', (_, res) => {
  res.status(notThisV.code).json({
    message: notThisV.status,
  });
});
module.exports = router;
