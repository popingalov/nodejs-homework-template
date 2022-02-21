const { sendSucc } = require('../../helpers');
const { Contact } = require('../../models');
const { created } = require('../../libs/http-responses');
const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  sendSucc(res, result, created.code, created.status);
};
module.exports = addContact;
