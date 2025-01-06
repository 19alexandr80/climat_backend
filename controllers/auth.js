const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const gravatar = require("gravatar");
// const path = require("path");
// const fs = require("fs/promises");
// const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const UserModel = require("../models/modelUser");
const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KYE } = process.env;

const registerUser = async (req, res) => {
  const { name, password } = req.body;
  const user = await UserModel.findOne({ name });
  if (user) {
    throw HttpError(409, "Email in usee");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  //   const avatarURL = gravatar.url(email, { s: 250 });
  const verificationToken = nanoid();
  const newUser = await UserModel.create({
    ...req.body,
    password: hashPassword,
    // avatarURL,
    verificationToken,
  });
  if (!newUser) {
    throw HttpError(404, "Not found");
  }
  const { name: emailUse, subscription } = newUser;
  //   const message = {
  //     from: process.env.SMTP_USER,
  //     to: email,
  //     subject: process.env.API_URL,
  //     text: `To confirm your registration, please clik on link below\n
  //     http://localhost:3000/users/verify/${verificationToken}`,
  //     html: `<p>To confirm your registration, please clik on link below</p>
  //     <p><a href="http://localhost:3000/users/verify/${verificationToken}">Clic</a></p>`,
  //   };
  //   await sendActivetionMail(message);

  res.status(201).json({ user: { name: emailUse, subscription } });
};

const login = async (req, res) => {
  const { name, password } = req.body;
  const user = await UserModel.findOne({ name });

  if (!user) {
    throw HttpError(401, "Name or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Password or name invalid");
  }
  if (!user.verify) {
    throw HttpError(401, "Not verify");
  }
  const payloade = { id: user._id, subscription: user.subscription };
  const token = jwt.sign(payloade, SECRET_KYE, { expiresIn: "23h" });
  await UserModel.findByIdAndUpdate(user._id, { token });
  res.status(201).json({
    user: { name: user.name, subscription: user.subscription, id: user._id },
    token,
  });
};

const logout = async (req, res) => {
  const user = req.user;
  await UserModel.findByIdAndUpdate(user._id, { token: "" });
  res.status(204).json();
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  login: ctrlWrapper(login),
  //   current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  //   nweAvatar: ctrlWrapper(nweAvatar),
  //   authVerify: ctrlWrapper(authVerify),
  //   verify: ctrlWrapper(verify),
};
