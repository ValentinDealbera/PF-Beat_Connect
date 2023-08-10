const UserModel = require("../../models/nosql/user");
const beatModel = require("../../models/nosql/beats");
const ReviewModel = require("../../models/nosql/reviews");
const OrderModel = require("../../models/nosql/orders");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { userid } = req.headers;
    const user = await UserModel.findById(id);
    const userAux = await UserModel.findById(userid);
    if (!user)
      return res
        .status(400)
        .json({ message: "El usuario que quieres eliminar no existe" });
    if (user.email !== userAux.email)
      return res
        .status(400)
        .json({ message: "No puedes eliminar otro usuario!" });

    const userBeats = await beatModel.find({ userCreator: id });
    await ReviewModel.deleteMany({ createdBy: id });
    await beatModel.deleteMany({ userCreator: id });
    await ReviewModel.deleteMany({
      beat: { $in: userBeats.map((beat) => beat._id) },
    });
    await OrderModel.deleteMany({
      buyer: id,
    });
    await OrderModel.deleteMany({
      seller: id,
    });
    await UserModel.findByIdAndDelete(id);
    res.json({ message: "Usuario eliminado con éxito." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
