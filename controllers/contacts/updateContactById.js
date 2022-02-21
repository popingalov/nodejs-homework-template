const CreateError = require('http-errors');
const { notFound } = require('../../libs/http-responses');

const { sendSucc } = require('../../helpers');
const { Contact } = require('../../models');

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new CreateError(notFound.code, notFound.status(contactId));
  }
  sendSucc(res, result);
};

module.exports = updateContactById;
