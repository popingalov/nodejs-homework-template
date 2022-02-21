const CreateError = require('http-errors');
const { notFound } = require('../../libs/http-responses');
const { sendSucc } = require('../../helpers');
const { Contact } = require('../../models');

const updateFavoriteByID = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true },
  );
  if (!result) {
    throw new CreateError(notFound.code, notFound.status(contactId));
  }
  sendSucc(res, result);
};

module.exports = updateFavoriteByID;
