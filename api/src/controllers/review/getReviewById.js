const reviewSchema = require("../../models/nosql/reviews");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await reviewSchema
      .find({ beat: id })
      .populate("createdBy")
      .populate("beat");

    if (reviews.length === 0) {
      return res.send("No hay reviews para este beat");
    }

    return res.json(reviews).status(OK);
  } catch (error) {
    res.json({ error: error.message }).status(SERVER_ERROR);
  }
};
