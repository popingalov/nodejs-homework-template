const { sendSucc } = require('../../helpers');
const { Contact } = require('../../models');
const { created } = require('../../libs/http-responses');
//
const addContact = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });

  sendSucc(res, result, created.code, created.status);
};
module.exports = addContact;
