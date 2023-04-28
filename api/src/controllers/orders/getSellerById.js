const OrderModel = require("../../models/nosql/orders");

module.exports = async (req, res) => {
  try {
    const { userSellerId } = req.params;
    const orders = await OrderModel.find({ seller: userSellerId })
      .populate("beat")
      .populate("buyer")
      .populate("seller");
    if (orders.length === 0)
      return res
        .status(400)
        .json({ message: "Este usuario no tiene ninguna order" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
