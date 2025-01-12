const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const dataClientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name objeckt is required"],
      unique: true,
    },
    client: {
      type: String,
      required: [true, "Client name is required"],
    },
    adress: {
      type: String,
      default: "",
      required: true,
    },
    phone: [
      {
        name: {
          type: String,
        },
        number: { type: String, match: /^[0-9: -/+]+$/, required: true },
      },
    ],
    adminName: [
      {
        type: String,
        default: "",
      },
    ],
    clientObjects: [
      {
        type: String,
        default: "",
      },
    ],
    magazine: [
      {
        type: String,
        default: "",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

dataClientSchema.post("save", handleMongooseError);

const DataClient = model("dataClient", dataClientSchema);

module.exports = DataClient;
// type: String,
//         match: /^[0-9: -/+]+$/,
//         required: true,
