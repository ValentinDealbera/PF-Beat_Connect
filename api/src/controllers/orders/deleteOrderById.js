const userModel = require("../../models/nosql/user");
const OrderModel = require("../../models/nosql/orders");

module.exports = async (req, res) => {
  try {
    const { userid } = req.headers;
    const { id } = req.params;
    const comprobante = await OrderModel.findById(id).populate("buyer");
    const comprobanteUser = await userModel.findById(userid);
    if (!comprobanteUser)
      return res.status(400).json({ message: "Ese usuario no existe" });
    if (!comprobante)
      return res.status(400).json({ message: "Esa orden no existe" });
    if (comprobante.buyer.email !== comprobanteUser.email)
      return res
        .status(400)
        .json({ message: "No pueden eliminar una orden que no sea tuya" });
    const order = OrderModel.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
