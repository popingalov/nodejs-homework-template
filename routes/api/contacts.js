const express = require('express');

///
const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contacts');
const { controllerSync, validation } = require('../../middlewares');
const { contacts } = require('../../controllers');
///
const router = express.Router();

router.get('/', controllerSync(contacts.listContacts));

router.get('/:contactId', controllerSync(contacts.getContactById));

router.post('/', validation(joiSchema), controllerSync(contacts.addContact));

router.delete('/:contactId', controllerSync(contacts.removeContact));

router.post(
  '/:contactId',
  validation(joiSchema),
  controllerSync(contacts.updateContactById),
);
///

router.patch(
  '/:contactId/favorite',
  validation(updateFavoriteJoiSchema),
  controllerSync(contacts.updateFavoriteByID),
);

module.exports = router;
