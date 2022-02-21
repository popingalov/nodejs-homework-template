const addContact = require('./addContact');
const listContacts = require('./listContacts');
const removeContact = require('./removeContact');
const getContactById = require('./getContactById');
const updateContactById = require('./updateContactById');
const updateFavoriteByID = require('./updateFavoriteByID');

module.exports = {
  addContact,
  listContacts,
  removeContact,
  getContactById,
  updateContactById,
  updateFavoriteByID,
};
