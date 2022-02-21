const { sendSucc } = require('../../helpers');
const { Contact } = require('../../models');
const CreateError = require('http-errors');
const { notFound, deleteEl } = require('../../libs/http-responses');
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new CreateError(notFound.code, notFound.status(contactId));
  }
  sendSucc(res, result, deleteEl.code, deleteEl.status);
};

module.exports = removeContact;
