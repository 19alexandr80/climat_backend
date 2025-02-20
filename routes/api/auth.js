const express = require("express");

// const { validateContact, autenticate, upload } = require("../../middlewares");
const { autenticate } = require("../../middlewares");
// const schemas = require("../../schemas/schemContact");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  //   validateContact(schemas.userRegistrSchema),
  ctrl.registerUser
);
// router.post("/login", validateContact(schemas.userRegistrSchema), ctrl.login);
router.post("/login", ctrl.login);
router.post("/logout", autenticate, ctrl.logout);
router.get("/allUsers", ctrl.getAllUser);
router.delete("/deleteUser", ctrl.deletewUser);
router.patch("/changePassword", ctrl.changePassword);

// changePassword

module.exports = router;
