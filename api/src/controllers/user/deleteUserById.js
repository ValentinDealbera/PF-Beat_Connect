const UserModel = require("../../models/nosql/user");
const beatModel = require("../../models/nosql/beats");
const ReviewModel = require("../../models/nosql/reviews");

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
    try {
      // Elimina review creada x el usuario
      await ReviewModel.deleteMany({ createdBy: id });

      // Todos los beats creados por el usuario
      const userBeats = await beatModel.find({ userCreator: id });
      // Elimino todos los beats del usuario
      await beatModel.deleteMany({ userCreator: id });

      // Elimino review asociadas con los beats del usuario.
      await ReviewModel.deleteMany({
        beat: { $in: userBeats.map((beat) => beat._id) },
      });

      // Elimino el usuario
      await UserModel.findByIdAndDelete(id);

      res.json({ message: "Usuario eliminado con éxito." });
    } catch (error) {
      console.error(error);
      res.json({ error: error.message }).status(500);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
