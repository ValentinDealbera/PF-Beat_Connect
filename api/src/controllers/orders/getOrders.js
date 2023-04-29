const OrderModel = require("../../models/nosql/orders");
const UserModel = require("../../models/nosql/user");

module.exports = async (req, res) => {
  try {
    const order = await OrderModel.find()
      .populate({
        path: "beat",
        populate: [
          {
            path: "userCreator",
            model: "User",
            select: "firstName lastName _id image",
          },
        ],
      })
      .populate("buyer")
      .populate("seller");
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
