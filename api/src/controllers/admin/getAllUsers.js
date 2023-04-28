const UserModel = require("../../models/nosql/user");

module.exports = async (req, res) => {
  const page = req.query.page || 1;
  const limit = 5;
  try {
    const users = await UserModel.find()
      .populate("createdBeats")
      .populate("bougthBeats")
      .populate("userFavorites");
    let initialUser = page * limit - 5;
    let limitUser = page * limit;
    let sliceUsers = users.slice(initialUser, limitUser);
    res.status(200).json(sliceUsers);
  } catch (err) {
    return res.status(500).json({ message: error.message });
  }
};
