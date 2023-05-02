const beatModel = require("../../models/nosql/beats");
const userModel = require("../../models/nosql/user");
const reviewModel = require("../../models/nosql/reviews");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const beat = await beatModel.findById(id);
    if (!beat) return res.status(400).json({ message: "Este beat no existe" });
    const deletedBeat = await beatModel.findByIdAndDelete(id);

    const user = await userModel.findById(deletedBeat.userCreator);
    const beatIndex = user.createdBeats.findIndex(
      (beat) => beat._id === deletedBeat._id
    );
    // const deletedBeatInUser = user.createdBeats.splice(beatIndex, 1);
    user.createdBeats = user.createdBeats.filter(
      (beat) => beat._id !== deletedBeat._id
    );
    await user.save();

    const reviewsDeletedInConsequence = await reviewModel.deleteMany({
      beat: deletedBeat._id,
    });

    res.json(deletedBeat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
