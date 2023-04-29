const reviewSchema = require("../../models/nosql/reviews");
const userModel = require("../../models/nosql/user");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { userid } = req.headers;
    const { rating, title, comment, softDelete } = req.body;

    console.log(req.body, id, userid);
    if (rating || title || comment || id || softDelete) {
      try {
        const reviewToModify = await reviewSchema
          .findById(id)
          .populate("createdBy");
        if (!reviewToModify)
          return res.status(400).json({
            message: "La review ingresada no es una review existente",
          });
        const comprobacion = await userModel.findById(userid);
        console.log(comprobacion.email, reviewToModify.createdBy.email);
        if (comprobacion.email !== reviewToModify.createdBy.email)
          return res
            .status(400)
            .json({ message: "No puedes modificar una review ajena!" });
        rating && (reviewToModify.rating = rating);
        title && (reviewToModify.title = title);
        comment && (reviewToModify.comment = comment);
        if (softDelete) {
          reviewToModify.softDelete = softDelete === "true" ? true : false;
        }
        await reviewToModify.save();

        return res.json(reviewToModify).status(200);
      } catch (error) {
        res.json({ error: error.message }).status(404);
      }
    } else return res.status(400).json({ message: "ningun dato recibido" });
  } catch (error) {
    res.json({ error: error.message }).status(404);
  }
};
