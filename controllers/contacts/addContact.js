const { authSucc } = require('../../helpers');
const { Contact } = require('../../models');
const { created } = require('../../libs/http-responses');
//
const addContact = async (req, res) => {
  const { _id } = req.user;
  const { email, name, phone, favorite } = await Contact.create({
    ...req.body,
    owner: _id,
  });
  const user = { email, name, phone, favorite };
  authSucc(res, { user }, created.code, created.status);
};
module.exports = addContact;
