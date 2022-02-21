const { sendSucc } = require('../../helpers');
const { Contact } = require('../../models');
const CreateError = require('http-errors');
const { notFound } = require('../../libs/http-responses');
const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new CreateError(notFound.code, notFound.status(contactId));
  }
  sendSucc(res, result);
};
module.exports = getContactById;
