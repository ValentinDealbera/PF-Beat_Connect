const beatModel = require("../../models/nosql/beats");

module.exports = async (req, res) => {
  try {
    const { beatId } = req.params;
    const beat = await beatModel
      .findById(beatId)
      .populate("userCreator")
      .populate("genre")
      .populate("review");
    res.status(200).json(beat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
