const reviewSchema = require("../../models/nosql/reviews");
const beatModel = require("../../models/nosql/beats");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      try {
        const deletedReview = await reviewSchema.findByIdAndDelete(id);
        const beat = await beatModel.findById(deletedReview.beat);
        const beatIndex = beat.review.findIndex(
          (beat) => beat._id === deletedReview._id,
        );
        const deletedReviewInBeat = beat.review.splice(beatIndex, 1);
        await beat.save();
        res.json(deletedReview);
      } catch (error) {
        res.json({ error: error.message }).status(SERVER_ERROR);
      }
    } else return res.status(400).json({ message: "ingresa una ID" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
