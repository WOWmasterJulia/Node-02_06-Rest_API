const { Contact } = require("../../models/contact");

const { HttpError, ctrlWrapper } = require("../../helpers");


const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  // if (!Object.keys(req.body).includes("favorite")) {
  //   throw HttpError(400, "missing field favorite");
  // }
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateFavorite;
