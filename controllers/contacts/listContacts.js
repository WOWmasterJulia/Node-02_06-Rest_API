const {Contact} = require("../../models/contact");

const { HttpError } = require("../../helpers");

const listContacts = async (req, res) => {
  console.log("ListContacts");
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  // console.log(req.query);
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", " email subscription ");
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = listContacts;