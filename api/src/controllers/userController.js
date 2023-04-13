const UserModel = require("../models/nosql/user");

const getAllUser = async () => {
  try {
    const db = await UserModel.find({});
    return db;
  } catch (err) {
    console.log("catch getBuyerModel");
    console.log(err);
    console.log("catch getBuyerModel");
  }
};

const getUserId = async (id) => {
  try {
    let dbBuyerID = await UserModel.findById(id);
    return dbBuyerID;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllUser,
  getUserId,
};
