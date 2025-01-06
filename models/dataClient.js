const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const dataClientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      required: [true, "Email is required"],
      unique: true,
    },
    adress: {
      type: String,
      default: "",
      required: true,
    },
    phone: {
      type: String,
      match: /^[0-9: -/+]+$/,
      required: true,
    },
    adminName: {
      type: String,
      // required: true,
      default: "",
    },
    clientObjects: {
      type: [{ nameObj: String, document: [String] }],
      default: [],
    },
    magazine: {
      type: [
        {
          action: String,
          date: Date,
          comments: String,
        },
      ],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

dataClientSchema.post("save", handleMongooseError);

const DataClient = model("dataClient", dataClientSchema);

module.exports = DataClient;
