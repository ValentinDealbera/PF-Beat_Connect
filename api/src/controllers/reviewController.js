const reviewSchema = require("../models/nosql/reviews");

const getReviewById = async (id) => {
  try {
    const db = await reviewSchema.findById(id);
    return db;
  } catch (error) {
    console.log("Hubo un error en la solicitud");
  }
};

const getAllReviews = async () => {
  try {
    const db = await reviewSchema.find();
    return db;
  } catch (error) {
    console.log("Hubo un error en la solicitud");
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
};
