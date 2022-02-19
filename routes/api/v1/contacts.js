//    библиотеки

const express = require('express');
const router = express.Router();
const CreateError = require('http-errors');
const Joi = require('joi');
//

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../../models/v1/contacts');

const {
  notFound,
  created,
  deleteEl,
  badValid,
} = require('../../../libs/http-responses');
//    код
const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next({});
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await getContactById(contactId);
    if (!result) {
      throw new CreateError(notFound.code, notFound.status(contactId));
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactsSchema.validate(body);
    if (error) {
      throw new CreateError(badValid.code, badValid.status);
    }
    const result = await addContact(body);
    res.status(created.code).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await removeContact(contactId);
    if (!result) {
      throw new CreateError(notFound.code, notFound.status(contactId));
    }
    res.status(deleteEl.code).json(deleteEl.status);
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw new CreateError(badValid.code, badValid.status);
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw new CreateError(notFound.code, notFound.status(contactId));
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
