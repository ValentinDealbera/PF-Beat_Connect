const reviewSchema = require("../../models/nosql/reviews");
const userModel = require("../../models/nosql/user");
const beatModel = require("../../models/nosql/beats");

module.exports = async (req, res) => {
  try {
    const { rating, title, comment, createdBy, beat } = req.body;
    const { userid } = req.headers;

    if (!rating || !title || !comment || !userid)
      return res
        .status(400)
        .json({ message: "Debes ingresar todos los campos" });
    console.log("userid", userid, "createdBy", createdBy);
    try {
      const user = await userModel.findById(userid);
      const creator = await userModel.findById(createdBy);
      const reviewedBeat = await beatModel
        .findById(beat)
        .populate("userCreator");
      if (user.email !== creator.email)
        return res.status(400).json({
          message: "No puedes hacer una review a nombre de otro usuario",
        });
      if (user.email === reviewedBeat.userCreator.email)
        return res
          .status(400)
          .json({ message: "No puedes hacer una review a tu propio beat" });
      if (!reviewedBeat)
        return res.status(400).json({ error: "this beat does not exist" });
      if (!creator)
        return res.status(400).json({ error: "this user does not exist" });

      const newReview = await reviewSchema.create({
        rating: rating,
        title: title,
        comment: comment,
        createdBy: creator._id,
        beat: reviewedBeat._id,
      });

      creator.userReviews = [...creator.userReviews, newReview._id];
      creator.save();

      reviewedBeat.relevance = reviewedBeat.relevance + rating;
      reviewedBeat.review = [...reviewedBeat.review, newReview._id];
      reviewedBeat.save();

      res.json(newReview).status(201);
    } catch (error) {
      res.json({ error: error.message }).status(500);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
