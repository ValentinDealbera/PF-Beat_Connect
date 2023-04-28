const UserModel = require("../../models/nosql/user");
const beatModel = require("../../models/nosql/beats");
const ReviewModel = require("../../models/nosql/reviews");

module.exports = async (req, res) => {
  const { id } = req.params;

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
};
