const DataClient = require("../models/dataClient");
const { HttpError, ctrlWrapper } = require("../helpers");

const fs = require("fs").promises;
const path = require("path");

const addDataClient = async (req, res) => {
  const data = await DataClient.create({ ...req.body });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(data);
};
const getDataClient = async (_, res) => {
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
const getObjectsAdmin = async (req, res) => {
  const name = req.params.name;
  const allObjects = await DataClient.find();
  const objectsAdmin = allObjects.filter((obj) => {
    return obj.adminName.includes(name);
  });
  res.status(200).json(objectsAdmin);
};
const getObjectsClient = async (req, res) => {
  const name = req.params.name;
  const allObjects = await DataClient.find();
  const objectsAdmin = allObjects.filter((obj) => {
    return obj.client.includes(name);
  });
  res.status(200).json(objectsAdmin);
};
const getDataClientByName = async (req, res) => {
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
  const adminName = req.query.elementName;
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
  const adminName = req.query.elementName;
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

const addPhoneNumber = async (req, res) => {
  const newPhone = req.body;
  const name = req.params.name;
  const params = { returnDocument: "after" };
  const allClients = await DataClient.find({ name });
  if (!allClients) {
    throw HttpError(404, "Not found");
  }
  const adm = allClients[0].phone;
  const newAdmin = { phone: [...adm, newPhone] };
  const query = { name: name };
  const data = await DataClient.findOneAndUpdate(query, newAdmin, params);
  if (!data) {
    throw HttpError(500, "servis error");
  }
  res.status(200).json(data);
};
const deletePhoneByName = async (req, res) => {
  const nameObj = req.params.name;
  const name = req.body.name;
  const allClients = await DataClient.find({ name: nameObj });
  if (!allClients) {
    throw HttpError(404, "Not found");
  }
  const adm = allClients[0].phone.filter((number) => number.name !== name);
  const newAdmin = { phone: [...adm] };
  const query = { name: nameObj };
  const params = { returnDocument: "after" };
  const data = await DataClient.findOneAndUpdate(query, newAdmin, params);
  if (!data) {
    throw HttpError(500, "servis error");
  }
  res.status(200).json(data);
};
// ======================================================
const addFile = async (req, res, next) => {
  // console.log(req.body);
  const fileDir = req.file.path;
  const FILE_STORAGE = path.join(
    process.cwd(),
    "pablic",
    process.env.FILE_STORAGE,
    req.file.originalname
  );
  if (req.file) {
    await fs.rename(fileDir, FILE_STORAGE);
  }
  // _____________________________________________________
  const name = req.body.nameUser;
  const params = { returnDocument: "after" };
  const allClients = await DataClient.find({ name });
  if (!allClients) {
    throw HttpError(404, "Not found");
  }
  const adm = allClients[0].clientObjects;
  const newfile = { clientObjects: [...adm, FILE_STORAGE] };
  const query = { name: name };
  const data = await DataClient.findOneAndUpdate(query, newfile, params);
  if (!data) {
    throw HttpError(500, "servis error");
  }
  // ____________________________________________________
  res.json(data);
};

const deleteFile = async (req, res, next) => {
  const deleteFile = req.body.dirFile;

  await fs.unlink(deleteFile);

  res.json(deleteFile);
};
// ======================================================

module.exports = {
  getDataClient: ctrlWrapper(getDataClient),
  getDataClientByName: ctrlWrapper(getDataClientByName),
  addDataClient: ctrlWrapper(addDataClient),
  getObjectsAdmin: ctrlWrapper(getObjectsAdmin),
  getObjectsClient: ctrlWrapper(getObjectsClient),
  changeContact: ctrlWrapper(changeContact),
  deleteAdminByName: ctrlWrapper(deleteAdminByName),
  addPhoneNumber: ctrlWrapper(addPhoneNumber),
  deletePhoneByName: ctrlWrapper(deletePhoneByName),
  addFile: ctrlWrapper(addFile),
  deleteFile: ctrlWrapper(deleteFile),

  //   deleteFeedbackById: ctrlWrapper(deleteFeedbackById),
};
