const express = require("express");

const ctrl = require("../../controllers/dataClient");
const upload = require("../../helpers/multer");

// const schemas = require("../../schemas/schemContact");

const { autenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", autenticate, ctrl.getDataClient);

router.get("/:name", autenticate, ctrl.getDataClientByName);

router.get("/adminObjects/:name", autenticate, ctrl.getObjectsAdmin);

router.get("/getObjectClient/:name", ctrl.getObjectsClient);

router.post("/", ctrl.addDataClient);

router.delete("/chapterElement/:name", ctrl.deleteAdminByName);

router.patch("/chapterElement/:name", ctrl.changeContact);

router.post("/numberPhone/:name", ctrl.addPhoneNumber);

router.delete("/numberPhone/:name", ctrl.deletePhoneByName);

// ===========================================
router.get("/magazine/:name", ctrl.getMagazine);
// ==========================================

router.post("/upload", upload.single("file"), ctrl.addFile);

router.delete("/upload", upload.single("file"), ctrl.deleteFile);

// router.put(
//   "/:contactId",
//   autenticate,
//   isValidId,
//   validateContact(schemas.contactSchema),
//   ctrl.changeContact
// );

module.exports = router;
