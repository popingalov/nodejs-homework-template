const { sendSucc } = require('../../helpers');
const { Contact } = require('../../models');

const listContacts = async (_, res) => {
  const result = await Contact.find({});
  sendSucc(res, result);
};

module.exports = listContacts;
