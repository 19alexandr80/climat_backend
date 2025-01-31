const app = require("./app");
const mongoose = require("mongoose");

// ======================================================================
const path = require("path");
const fs = require("fs").promises;
require("dotenv").config();

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};
const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR);
const FILE_STORAGE = path.join(__dirname, "pablic", process.env.FILE_STORAGE);
// =====================================================================

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(3707, async () => {
      await createFolderIsNotExist(UPLOAD_DIR);
      await createFolderIsNotExist(FILE_STORAGE);
      console.log("Server running. Use our API on port: 3707");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
