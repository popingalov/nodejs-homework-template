const { sendSucc } = require('../../helpers');
const { Contact } = require('../../models');

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite, sort } = req.query;
  const skip = (page - 1) * limit;

  const query = favorite ? { owner: _id, favorite } : { owner: _id };

  const result = await Contact.find(query)
    .select('-owner -createdAt -updatedAt')
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sort);

  sendSucc(res, result);
};

module.exports = listContacts;
