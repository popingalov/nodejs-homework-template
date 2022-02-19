const express = require('express');

const router = express.Router();
const CreateError = require('http-errors');
const contactsRouter = require('./contacts');

router.use('/contacts', contactsRouter);

router.use((req, res, next) => {
  const method = req.method;

  try {
    if (method === 'DELETE' || method === 'PUT') {
      throw new CreateError(400, 'Where your id?');
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
