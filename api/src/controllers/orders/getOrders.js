const OrderModel = require("../../models/nosql/orders");

module.exports = async (req, res) => {
  try {
    const order = await OrderModel.find()
      .populate("beat")
      .populate("buyer")
      .populate("seller");
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
