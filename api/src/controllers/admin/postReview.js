const reviewSchema = require("../../models/nosql/reviews");
const userModel = require("../../models/nosql/user");
const beatModel = require("../../models/nosql/beats");

module.exports = async (req, res) => {
  try {
    const { rating, title, comment, createdBy, beat } = req.body;
    const creator = await userModel.findById(createdBy);
    const reviewedBeat = await beatModel.findById(beat);
    if (!reviewedBeat)
      return res.status(400).json({ error: "El beat no existe!" });
    if (!creator)
      return res.status(400).json({ error: "El usuario no existe!" });
    try {
      const newReview = await reviewSchema.create({
        rating: rating,
        title: title,
        comment: comment,
        createdBy: creator._id,
        beat: reviewedBeat._id,
      });

      creator.userReviews = [...creator.userReviews, newReview._id];
      creator.save();

      reviewedBeat.review = [...reviewedBeat.review, newReview._id];
      reviewedBeat.relevance = reviewedBeat.relevance + rating;
      reviewedBeat.save();

      res.json(newReview).status(CREATED);
    } catch (error) {
      res.json({ error: error.message }).status(SERVER_ERROR);
    }
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};
