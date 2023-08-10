const reviewSchema = require("../../models/nosql/reviews");
const userModel = require("../../models/nosql/user");
const beatModel = require("../../models/nosql/beats");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { userid } = req.headers;

    if (!userid)
      return res
        .status(400)
        .json({ message: "Debes estar logueado para eliminar una review" });

    console.log(id);
    if (id) {
      try {
        const comprobacionReview = await reviewSchema
          .findById(id)
          .populate("createdBy");
        const comprobacionUser = await userModel.findById(userid);
        if (!comprobacionReview)
          return res.status(400).json({ message: "Esa review no existe" });
        if (comprobacionReview.createdBy.email !== comprobacionUser.email)
          return res.status(400).json({
            message: "No puedes eliminar una review de otro/a usuario/a",
          });
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
    res.json({ message: error.message }).status(SERVER_ERROR);
  }
};
