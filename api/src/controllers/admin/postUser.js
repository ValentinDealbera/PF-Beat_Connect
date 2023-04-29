const UserModel = require("../../models/nosql/user");
const sharp = require("sharp");
module.exports = async (req, res) => {
  const { body } = req;
  if (body.image === "") delete body.image;
  try {
    const user = await UserModel.create(body);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
