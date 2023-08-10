const beatModel = require("../../models/nosql/beats");
const userModel = require("../../models/nosql/user");
const reviewModel = require("../../models/nosql/reviews");

module.exports = async (req, res) => {
  const { id } = req.params;
  const { userid } = req.headers;
  console.log("a borrar: " + id);

  try {
    const beat = await beatModel.findById(id).populate("userCreator");
    const userAux = await userModel.findById(userid);
    if (!beat) return res.status(400).json({ message: "Este beat no existe" });
    if (beat.userCreator.email !== userAux.email)
      return res.status(400).json({
        message: "No puedes eliminar un beat que no sea de tu autoria",
      });
    const deletedBeat = await beatModel.findByIdAndDelete(id);

    const user = await userModel.findById(deletedBeat.userCreator);
    const beatIndex = user.createdBeats.findIndex(
      (beat) => beat._id === deletedBeat._id,
    );
    user.createdBeats = user.createdBeats.filter(
      (beat) => beat._id !== deletedBeat._id,
    );
    await user.save();

    const reviewsDeletedInConsequence = await reviewModel.deleteMany({
      beat: deletedBeat._id,
    });

    res.status(200).json(deletedBeat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
