const express = require("express");

const ctrl = require("../../controllers/dataClient");

// const {
//   validateContact,
//   isValidId,
//   autenticate,
// } = require("../../middlewares");
// const schemas = require("../../schemas/schemContact");
const { autenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", autenticate, ctrl.getDataClient);

router.get("/:name", autenticate, ctrl.getDataClientByName);

router.get("/adminObjects/:name", autenticate, ctrl.getObjectsClient);

// router.post(
//   "/",
//   autenticate,
//   validateContact(schemas.contactSchema),
//   ctrl.addContact
// );
router.post("/", autenticate, ctrl.addDataClient);

// router.delete("/:contactId", autenticate, isValidId, ctrl.deleteContactById);
router.delete("/adminName/:name", autenticate, ctrl.deleteAdminByName);

router.patch("/adminName/:name", autenticate, ctrl.changeContact);

// router.put(
//   "/:contactId",
//   autenticate,
//   isValidId,
//   validateContact(schemas.contactSchema),
//   ctrl.changeContact
// );

module.exports = router;
