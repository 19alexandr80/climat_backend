const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(3707, () => {
      console.log("Server running. Use our API on port: 3707");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
