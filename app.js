const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const upload = require("./helpers/multer");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const dataClientRouter = require("./routes/api/dataClient");
// const feedbackRouter = require("./routes/api/feetback");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", authRouter);
app.use("/dataClient", dataClientRouter);
// app.use("/api/contacts", contactsRouter);
// ================================================

// app.post("/uploud", upload.single("file"), async (req, res, next) => {
//   console.log(req.file);
//   console.log(req.body);
//   res.json(req.file.path);
// });
// =================================================

app.use((req, res) => {
  res.status(404).json({ message: "Not founddd" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message: message,
  });
});

module.exports = app;
