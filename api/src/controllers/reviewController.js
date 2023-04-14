const reviewSchema = require("../models/nosql/reviews");

const getReviewById = async (id) => {
  try {
    const db = await reviewSchema.findById(id);
    return db;
  } catch (error) {
    console.error(error);
  }
};

const getAllReviews = async () => {
  try {
    const db = await reviewSchema.find();
    return db;
  } catch (error) {
    console.error(error);
  }
};

const getReviewsPerBeat = async (beatId) => {
  try {
    const reviewList = await reviewSchema.find({ beat: beatId });
    return reviewList;
  } catch (error) {
    console.error(error);
  }
};

const deleteReview = async (id) => {
  try {
    await reviewSchema.deleteOne({ _id: id });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllReviews,
  getReviewsPerBeat,
  getReviewById,
  deleteReview,
};
