const { Contact } = require("../../models/contact");

const { HttpError, ctrlWrapper } = require("../../helpers");



const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  // res.status(204).send()
  res.json({
    message: "Contact deleted",
  });
};


module.exports = {
  removeContact: ctrlWrapper(removeContact),
};
