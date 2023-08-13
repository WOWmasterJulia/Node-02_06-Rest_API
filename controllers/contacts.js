// const Joi = require("joi"); // описание требований к обьекту

const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

// // требования к каждому полю:
// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });


const listContacts = async (req, res) => {
    const result = await contacts.listContacts();
    res.json(result);  
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
};

const addContact = async (req, res) => {
    // const { error } = addSchema.validate(req.body);
    // if (error) {
    //   throw HttpError(400, error.message);
    // }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

const updateContact = async (req, res) => {
    // const { error } = addSchema.validate(req.body);
    // if (error) {
    //   throw HttpError(400, error.message);
    // }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
};

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    // res.status(204).send()
    res.json({
      message: "Contact deleted",
    });

};


module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};