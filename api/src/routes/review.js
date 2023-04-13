const express = require("express");
const router = express();
const mongoose = require("mongoose");
const reviewSchema = require("../Schemas/nosql/reviews");
const {
  OK,
  CREATED,
  NOT_FOUND,
  SERVER_ERROR,
} = require("../controllers/status");
const {
  getReviewById,
  getAllReviews,
} = require("../controllers/reviewController");

router.get("/", async (req, res) => {
  try {
    const reviews = await getAllReviews();
    if (reviews.length === 0)
      return res.send("No hay reviews disponibles").status(OK);
    return res.json(reviews).status(OK);
  } catch (error) {
    res.json({ error: error.message }).status(NOT_FOUND);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reviewById = await getReviewById(id);
    reviewById
      ? res.json(reviewById).status(OK)
      : res.send("La id es incorrecta o no existe").status(NOT_FOUND);
  } catch (error) {
    res.json({ error: error.message }).status(NOT_FOUND);
  }
});

router.post("/", async (req, res) => {
  const { id, rating, title, comment, createdBy, beat } = req.body;

  try {
    const newReview = await reviewSchema.create({
      id: id,
      rating: rating,
      title: title,
      comment: comment,
      createdBy: createdBy,
      beat: beat,
    });

    res.json(newReview).status(CREATED);
  } catch (error) {
    res.json({ error: error.message }).status(SERVER_ERROR);
  }
});

module.exports = router;
