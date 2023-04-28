const express = require("express");
const router = express();

const postReview = require("../controllers/review/postReview");
const getAllReviews = require("../controllers/review/getAllReviews");
const getReviewById = require("../controllers/review/getReviewById");
const putReviewById = require("../controllers/review/putReviewById");
const deleteReviewById = require("../controllers/review/deleteReviewById");

router.post("/", postReview);

router.get("/", getAllReviews);

router.get("/:id", getReviewById);

router.put("/:id", putReviewById);

router.delete("/:id", deleteReviewById);

module.exports = router;
