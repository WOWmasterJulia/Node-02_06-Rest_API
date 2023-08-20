const { ctrlWrapper } = require("../helpers");

const listContacts = require("./listContacts");
const getById = require("./getById");
const addContact = require("./addContact");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");
// module.exports = {
//   listContacts,
//   getById,
//   addContact,
//   removeContact,
//   updateContact,
//   updateFavorite,
// };
module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
