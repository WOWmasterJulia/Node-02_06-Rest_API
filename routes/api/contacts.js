const express = require('express');

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();



// маршруты:
router.get("/", ctrl.listContacts);
router.get('/:id', ctrl.getById);
router.post('/', validateBody(schemas.addSchema), ctrl.addContact);
router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);
router.delete("/:id", ctrl.removeContact);

module.exports = router;



// Старий варіант коду:
// const express = require("express");

// const contacts = require("../../models/contacts");

// const { HttpError } = require("../../helpers");

// const router = express.Router();

// // const schemas = require("../../schemas/contacts");

// const Joi = require("joi"); // описание требований к обьекту

// // требования к каждому полю:
// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

// // маршруты:
// router.get("/", async (req, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.json({ data: result });
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contacts.getById(id);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:id", async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const { id } = req.params;
//     const result = await contacts.updateContact(id, req.body);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await contacts.removeContact(id);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     // res.status(204).send()
//     res.json({
//       message: "Contact deleted",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;
