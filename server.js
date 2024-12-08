const app = require("./app");
const mongoose = require("mongoose");

const db =
  "mongodb+srv://Alexandr:eez1buKqGiREs4Xh@cluster0.vwoosru.mongodb.net/Shop_shop?retryWrites=true&w=majority";

mongoose
  //   .connect(process.env.DB_HOST)
  .connect(db)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
