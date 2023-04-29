const OrderModel = require("../../models/nosql/orders");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
