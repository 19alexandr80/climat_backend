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
const getDataClientByName = async (req, res) => {
  // console.log(req.params.email);
  const name = req.params.name;
  const data = await DataClient.find({ name });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};
const deleteAdminByName = async (req, res) => {
  const name = req.params.name;
  const chapter = req.body.chapter;
  const adminName = req.query.adminName;
  const allClients = await DataClient.find({ name });
  if (!allClients) {
    throw HttpError(404, "Not found");
  }
  const adm = allClients[0][chapter].filter((adm) => adm !== adminName);
  const newAdmin = { [chapter]: [...adm] };
  const query = { name: name };
  const params = { returnDocument: "after" };
  const data = await DataClient.findOneAndUpdate(query, newAdmin, params);
  if (!data) {
    throw HttpError(500, "servis error");
  }
  res.status(200).json(data);
};
const changeContact = async (req, res) => {
  const chapter = req.body.chapter;
  const name = req.params.name;
  const adminName = req.query.adminName;
  const params = { returnDocument: "after" };
  const allClients = await DataClient.find({ name });
  if (!allClients) {
    throw HttpError(404, "Not found");
  }
  const adm = allClients[0][chapter];
  const newAdmin = { [chapter]: [...adm, adminName] };
  const query = { name: name };
  const data = await DataClient.findOneAndUpdate(query, newAdmin, params);
  if (!data) {
    throw HttpError(500, "servis error");
  }
  res.status(200).json(data);
};

module.exports = {
  getDataClient: ctrlWrapper(getDataClient),
  getDataClientByName: ctrlWrapper(getDataClientByName),
  addDataClient: ctrlWrapper(addDataClient),
  changeContact: ctrlWrapper(changeContact),
  deleteAdminByName: ctrlWrapper(deleteAdminByName),
  //   deleteFeedbackById: ctrlWrapper(deleteFeedbackById),
};
