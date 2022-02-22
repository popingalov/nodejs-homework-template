const express = require('express');

///
const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contacts');
const {
  controllerSync,
  validation,
  authenticate,
} = require('../../middlewares');
const { contacts } = require('../../controllers');
///
const router = express.Router();

router.get('/', authenticate, controllerSync(contacts.listContacts));

router.get(
  '/:contactId',
  authenticate,
  controllerSync(contacts.getContactById),
);

router.post(
  '/',
  authenticate,
  validation(joiSchema),
  controllerSync(contacts.addContact),
);

router.delete('/:contactId', controllerSync(contacts.removeContact));

router.post(
  '/:contactId',
  authenticate,
  validation(joiSchema),
  controllerSync(contacts.updateContactById),
);
///

router.patch(
  '/:contactId/favorite',
  authenticate,
  validation(updateFavoriteJoiSchema),
  controllerSync(contacts.updateFavoriteByID),
);

module.exports = router;
