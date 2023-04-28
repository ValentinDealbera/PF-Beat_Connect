const beatModel = require("../../models/nosql/beats");
const userModel = require("../../models/nosql/user");
const reviewModel = require("../../models/nosql/reviews");

module.exports = async (req, res) => {
  const { id } = req.params;
  const { userid } = req.headers;
  console.log(req.headers);
  console.log(id, userid);

  try {
    const beat = await beatModel.findById(id).populate("userCreator");
    const userAux = await userModel.findById(userid);
    console.log(beat.userCreator._id, userAux._id);
    if (!beat) return res.status(400).json({ message: "Este beat no existe" });
    if (beat.userCreator.email !== userAux.email)
      return res.status(400).json({
        message: "No puedes eliminar un beat que no sea de tu autoria",
      });
    const deletedBeat = await beatModel.findByIdAndDelete(id);

    const user = await userModel.findById(deletedBeat.userCreator);
    const beatIndex = user.createdBeats.findIndex(
      (beat) => beat._id === deletedBeat._id
    );
    const deletedBeatInUser = user.createdBeats.splice(beatIndex, 1);
    await user.save();

    const reviewsDeletedInConsequence = await reviewModel.deleteMany({
      beat: deletedBeat._id,
    });

    res.json(deletedBeat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
