const express = require("express");

// const ctrl = require("../../controllers/contacts_all");
const ctrl = require("../../controllers/index.js");


// const schemas = require("../../schemas/contacts");
const { schemas } = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const router = express.Router();

// маршруты:
router.get("/contacts", authenticate, ctrl.listContacts);
router.get("/contacts/:id", authenticate, isValidId, ctrl.getById);
router.post(
  "/contacts",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);
router.put(
  "/contacts/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);
router.patch(
  "/contacts/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);
router.delete("/contacts/:id", authenticate, isValidId, ctrl.removeContact);

module.exports = router;
