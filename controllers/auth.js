const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const gravatar = require("gravatar");
// const path = require("path");
// const fs = require("fs/promises");
// const Jimp = require("jimp");
// const { nanoid } = require("nanoid");

const UserModel = require("../models/modelUser");
const { HttpError, ctrlWrapper } = require("../helpers");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  //   const avatarURL = gravatar.url(email, { s: 250 });
  // const verificationToken = nanoid();
  const verificationToken = "jhgjhgjhgjhgjgjhgjgjhgjhgjhgjg";
  const newUser = await UserModel.create({
    ...req.body,
    password: hashPassword,
    // avatarURL,
    verificationToken,
  });
  if (!newUser) {
    throw HttpError(404, "Not found");
  }
  const { email: emailUse, subscription } = newUser;
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

  res.status(201).json({ user: { email: emailUse, subscription } });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  //   login: ctrlWrapper(login),
  //   current: ctrlWrapper(current),
  //   logout: ctrlWrapper(logout),
  //   nweAvatar: ctrlWrapper(nweAvatar),
  //   authVerify: ctrlWrapper(authVerify),
  //   verify: ctrlWrapper(verify),
};
