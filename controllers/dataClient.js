const DataClient = require("../models/dataClient");
const { HttpError, ctrlWrapper } = require("../helpers");

const addDataClient = async (req, res) => {
  //   console.log(req);
  //   const { _id: owner } = req.feedback;
  const data = await DataClient.create({ ...req.body });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(data);
};
const getDataClient = async (req, res) => {
  // const { page = 1, limit = 10 } = req.query;
  // const skip = (page - 1) * limit;
  // const { _id: owner } = req.user;
  // const data = await Feedback.find({ owner }, "-createdAt -updatedAt -owner", {
  //   skip,
  //   limit,
  // });
  const data = await DataClient.find();
  res.json(data);
};
const getDataClientByEmail = async (req, res) => {
  console.log(req.body.email);
  const email = req.body.email;
  const data = await DataClient.find({ email });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};
// const deleteFeedbackById = async (req, res) => {
//   console.log(req.params);
//   const id = req.params.contactId;
//   const data = await Feedback.findByIdAndRemove(id);
//   if (!data) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json({
//     message: "deleted contact",
//   });
// };

module.exports = {
  getDataClient: ctrlWrapper(getDataClient),
  getDataClientByEmail: ctrlWrapper(getDataClientByEmail),
  addDataClient: ctrlWrapper(addDataClient),
  //   deleteFeedbackById: ctrlWrapper(deleteFeedbackById),
};
