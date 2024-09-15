const app = require("./app");
const mongoose = require("mongoose");

mongoose
  //   .connect(process.env.DB_HOST)
  .connect("localhost:3000")
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
