const { Contact } = require("../../models/contact");

const { HttpError, ctrlWrapper } = require("../../helpers");

const listContacts = async (req, res) => {
  console.log("ListContacts");
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
};