const UserModel = require("../models/nosql/user");

const getAllUser = async () => {
  try {
    const db = await UserModel.find({ softDelete: false });
    return db;
  } catch (err) {
    console.log("catch getUserModel");
    console.log(err);
    console.log("catch getUserModel");
  }
};

const getUserId = async (id) => {
  try {
    let dbUserID = await UserModel.findById(id);
    return dbUserID;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllUser,
  getUserId,
};
