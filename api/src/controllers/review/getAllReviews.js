const reviewSchema = require("../../models/nosql/reviews");

module.exports = async (req, res) => {
  try {
    const reviews = await reviewSchema
      .find()
      .populate("createdBy")
      .populate("beat");

    if (reviews.length === 0) {
      return res.json({ message: "No hay reviews disponibles" }).status(200);
    }

    return res.json(reviews).status(200);
  } catch (error) {
    res.json({ error: error.message }).status(200);
  }
};
