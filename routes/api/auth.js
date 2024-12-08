const express = require("express");

// const { validateContact, autenticate, upload } = require("../../middlewares");
// const schemas = require("../../schemas/schemContact");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  //   validateContact(schemas.userRegistrSchema),
  ctrl.registerUser
);

module.exports = router;
