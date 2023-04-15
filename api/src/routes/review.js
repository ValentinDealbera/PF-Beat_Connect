const express = require("express");
const reviewSchema = require("../models/nosql/reviews");
const userModel = require('../models/nosql/user')
const beatModel = require('../models/nosql/beats')
const {
  OK,
  ALL_OK,
  CREATED,
  NOT_FOUND,
  SERVER_ERROR,
} = require("../controllers/status");
const {
  getReviewById,
  getAllReviews,
  getReviewsPerBeat,
  deleteReview,
} = require("../controllers/reviewController");

const router = express();

router.post("/", async (req, res) => {
  const { rating, title, comment, createdBy, beat } = req.body;
  const creator = await userModel.findById(createdBy)
  const reviewedBeat = await beatModel.findById(beat)
  if(!reviewedBeat) return res.status(400).json({error: 'this beat does not exist'})
  if(!creator) return res.status(400).json({error: 'this user does not exist'})
  try {
    const newReview = await reviewSchema.create({
      rating: rating,
      title: title,
      comment: comment,
      createdBy: creator._id,
      beat: reviewedBeat._id,
    });

    reviewedBeat.review = [...reviewedBeat.review, newReview._id]
    reviewedBeat.save()

    res.json(newReview).status(CREATED);
  } catch (error) {
    res.json({ error: error.message }).status(SERVER_ERROR);
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await getAllReviews();

    if (reviews.length === 0) {
      return res.send("No hay reviews disponibles").status(OK);
    }

    return res.json(reviews).status(OK);
  } catch (error) {
    res.json({ error: error.message }).status(NOT_FOUND);
  }
});

//  IMPORTANTE el param "id" de esta ruta es el id del beat
//  cuyas reviews se quieren enviar al front

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await getReviewsPerBeat(id);

    if (reviews.length === 0) {
      return res.send("No hay reviews para este beat");
    }

    return res.json(reviews).status(OK);
  } catch (error) {
    res.json({ error: error.message }).status(SERVER_ERROR);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { rating, title, comment } = req.body;

  if (id) {
    try {
      const reviewToModify = await getReviewById(id);

      rating && (reviewToModify.rating = rating);
      title && (reviewToModify.title = title);
      comment && (reviewToModify.comment = comment);

      await reviewToModify.save();

      return res.json(reviewToModify).status(ALL_OK);
    } catch (error) {
      res.json({ error: error.message }).status(NOT_FOUND);
    }
  } else return res.send("No hay ninguna review con ese ID").status(NOT_FOUND);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    try {
      const deletedReview = await reviewSchema.findByIdAndDelete(id);
    const beat = await beatModel.findById(deletedReview.beat)
    const beatIndex = beat.review.findIndex(beat => beat._id === deletedReview._id);
    const deletedReviewInBeat = beat.review.splice(beatIndex, 1)
    await beat.save()
    res.json(deletedReview);
    } catch (error) {
      res.json({ error: error.message }).status(SERVER_ERROR);
    }
  }
});

module.exports = router;
