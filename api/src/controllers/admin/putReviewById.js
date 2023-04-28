const reviewSchema = require("../../models/nosql/reviews");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, title, comment, softDelete } = req.body;
    if (rating || title || comment || id || softDelete) {
      try {
        const reviewToModify = await reviewSchema.findById(id);
        if (!reviewToModify)
          return res.status(400).json({
            message: "La review ingresada no es una review existente",
          });

        rating && (reviewToModify.rating = rating);
        title && (reviewToModify.title = title);
        comment && (reviewToModify.comment = comment);
        if (softDelete) {
          reviewToModify.softDelete = softDelete === "true" ? true : false;
        }

        await reviewToModify.save();

        return res.json(reviewToModify).status(ALL_OK);
      } catch (error) {
        res.json({ error: error.message }).status(NOT_FOUND);
      }
    } else return res.status(400).json({ message: "ningun dato recibido" });
  } catch (error) {
    res.json({ message: error.message }).status(NOT_FOUND);
  }
};
