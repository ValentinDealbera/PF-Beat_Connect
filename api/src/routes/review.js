const express = require("express");
const reviewSchema = require("../models/nosql/reviews");
const userModel = require("../models/nosql/user");
const beatModel = require("../models/nosql/beats");
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
const adminMiddleware = require("../middleware/adminVerify");

const router = express();

router.post("/admin", adminMiddleware, async (req, res) => {
  try {
    const { rating, title, comment, createdBy, beat } = req.body;
  const creator = await userModel.findById(createdBy);
  const reviewedBeat = await beatModel.findById(beat);
  if (!reviewedBeat)
    return res.status(400).json({ error: "El beat no existe!" });
  if (!creator)
    return res.status(400).json({ error: "El usuario no existe!" });
  try {
    const newReview = await reviewSchema.create({
      rating: rating,
      title: title,
      comment: comment,
      createdBy: creator._id,
      beat: reviewedBeat._id,
    });

    reviewedBeat.review = [...reviewedBeat.review, newReview._id];
    reviewedBeat.relevance = reviewedBeat.relevance + rating
    reviewedBeat.save();

    res.json(newReview).status(CREATED);
  } catch (error) {
    res.json({ error: error.message }).status(SERVER_ERROR);
  }
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { rating, title, comment, createdBy, beat } = req.body;
  const {userid} = req.headers
  const user = await userModel.findById(userid)
  const creator = await userModel.findById(createdBy);
  const reviewedBeat = await beatModel.findById(beat).populate('userCreator');
  if(user.email !== creator.email) return res.status(400).json({message: 'No puedes hacer una review a nombre de otro usuario'})
  if(user.email === reviewedBeat.userCreator.email) return res.status(400).json({message: 'No puedes hacer una review a tu propio beat'})
  if (!reviewedBeat)
    return res.status(400).json({ error: "this beat does not exist" });
  if (!creator)
    return res.status(400).json({ error: "this user does not exist" });
  try {
    const newReview = await reviewSchema.create({
      rating: rating,
      title: title,
      comment: comment,
      createdBy: creator._id,
      beat: reviewedBeat._id,
    });

    creator.userReviews = [...creator.userReviews, newReview._id]
    creator.save();

    reviewedBeat.relevance = reviewedBeat.relevance + rating
    reviewedBeat.review = [...reviewedBeat.review, newReview._id];
    reviewedBeat.save();

    res.json(newReview).status(CREATED);
  } catch (error) {
    res.json({ error: error.message }).status(SERVER_ERROR);
  }
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });    
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await reviewSchema
      .find()
      .populate("createdBy")
      .populate("beat");

    if (reviews.length === 0) {
      return res.send("No hay reviews disponibles").status(OK);
    }

    return res.json(reviews).status(OK);
  } catch (error) {
    res.json({ error: error.message }).status(NOT_FOUND);
  }
});

router.get("/:id", async (req, res) => {
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
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {userid} = req.headers
    const { rating, title, comment } = req.body;
  
    if (id) {
      try {
        const reviewToModify = await reviewSchema.findById(id).populate('createdBy');
        if (!reviewToModify) return res.status(400).json({message: 'La review ingresada no es una review existente'})
        const comprobacion = userModel.findById(userid)
        if (!comprobacion.email !== reviewToModify.createdBy.email) return res.status(400).json({message: 'No puedes modificar una review ajena!'})
        rating && (reviewToModify.rating = rating);
        title && (reviewToModify.title = title);
        comment && (reviewToModify.comment = comment);
  
        await reviewToModify.save();
  
        return res.json(reviewToModify).status(ALL_OK);
      } catch (error) {
        res.json({ error: error.message }).status(NOT_FOUND);
      }
    } else return res.send("Debes ingresar una ID").status(NOT_FOUND);
  } catch (error) {
    res.json({ error: error.message }).status(NOT_FOUND);
  }
});

router.put("/admin/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {userid} = req.headers
    const { rating, title, comment } = req.body;
  
    if (id) {
      try {
        const reviewToModify = await getReviewById(id);
        if (!reviewToModify) return res.status(400).json({message: 'La review ingresada no es una review existente'})
        
        rating && (reviewToModify.rating = rating);
        title && (reviewToModify.title = title);
        comment && (reviewToModify.comment = comment);
  
        await reviewToModify.save();
  
        return res.json(reviewToModify).status(ALL_OK);
      } catch (error) {
        res.json({ error: error.message }).status(NOT_FOUND);
      }
    } else return res.send("Debes ingresar una ID").status(NOT_FOUND);
  } catch (error) {
    res.json({ message: error.message }).status(NOT_FOUND);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {userid} = req.headers

    if(!userid) return res.status(400).json({message: 'Debes estar logueado para eliminar una review'})

    console.log(id);
    if (id) {
      try {
        const comprobacionReview = await reviewSchema.findById(id).populate('createdBy')
        const comprobacionUser = await userModel.findById(userid)
        if (!comprobacionReview) return res.status(400).json({message: 'Esa review no existe'})
        if (comprobacionReview.createdBy.email !== comprobacionUser.email) return res.status(400).json({message: 'No puedes eliminar una review de otro/a usuario/a'})
        const deletedReview = await reviewSchema.findByIdAndDelete(id);
        const beat = await beatModel.findById(deletedReview.beat);
        const beatIndex = beat.review.findIndex(
          (beat) => beat._id === deletedReview._id
        );
        const deletedReviewInBeat = beat.review.splice(beatIndex, 1);
        await beat.save();
        res.json(deletedReview);
      } catch (error) {
        res.json({ error: error.message }).status(SERVER_ERROR);
      }
    }
    else return res.status(400).json({message: 'ingresa una ID'})
  } catch (error) {
    res.json({ message: error.message }).status(SERVER_ERROR);
  }
});

router.delete("/admin/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
  if (id) {
    try {
      const deletedReview = await reviewSchema.findByIdAndDelete(id);
      const beat = await beatModel.findById(deletedReview.beat);
      const beatIndex = beat.review.findIndex(
        (beat) => beat._id === deletedReview._id
      );
      const deletedReviewInBeat = beat.review.splice(beatIndex, 1);
      await beat.save();
      res.json(deletedReview);
    } catch (error) {
      res.json({ error: error.message }).status(SERVER_ERROR);
    }
  }
  else return res.status(400).json({message: 'ingresa una ID'})
  } catch (error) {
  res.status(500).json({message: error.message})
  }
});

module.exports = router;
