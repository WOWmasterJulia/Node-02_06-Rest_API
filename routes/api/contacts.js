const express = require("express");

const ctrl = require("../../controllers/contacts");

// const schemas = require("../../schemas/contacts");
const { schemas } = require("../../models/contact");
const { validateBody, isValidId } = require("../../middlewares");
const router = express.Router();

// маршруты:
router.get("/contacts", ctrl.listContacts);
router.get("/contacts/:id", isValidId, ctrl.getById);
router.post("/contacts", validateBody(schemas.addSchema), ctrl.addContact);
router.put(
  "/contacts/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);
router.patch(
  "/contacts/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);
router.delete("/contacts/:id", isValidId, ctrl.removeContact);

module.exports = router;
