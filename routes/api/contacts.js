const express = require("express");

// const ctrl = require("../../controllers/contacts_all");
// или:
const ctrl = require("../../controllers/index.js");


const { schemas } = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const router = express.Router();

// маршруты:
router.get("/", authenticate, ctrl.listContacts);
router.get("/:id", authenticate, isValidId, ctrl.getById);
router.post(
  "/contacts",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);
router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);
router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);
router.delete("/:id", authenticate, isValidId, ctrl.removeContact);

module.exports = router;
