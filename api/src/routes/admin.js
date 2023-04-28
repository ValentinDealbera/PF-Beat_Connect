const express = require("express");
const router = express();

const adminMiddleware = require("../middleware/adminVerify");

/* ------ USER ------ */

const getAllUsers = require("../controllers/admin/getAllUsers");
const postUser = require("../controllers/admin/postUser");
const putUserById = require("../controllers/admin/putUserById");
const deleteUserById = require("../controllers/admin/deleteUserById");

router.get("/user", adminMiddleware, getAllUsers);

router.post("/user", adminMiddleware, postUser);

router.put("/user/:id", adminMiddleware, putUserById);

router.delete("/user/:id", adminMiddleware, deleteUserById);

/* ------ BEATS ------ */

const postBeat = require("../controllers/admin/postBeat");
const putBeatById = require("../controllers/admin/putBeatById");
const deleteBeatById = require("../controllers/admin/deleteBeatById");

router.post("/beat", adminMiddleware, postBeat);

router.put("/beat/:id", adminMiddleware, putBeatById);

router.delete("/beat/:id", adminMiddleware, deleteBeatById);

/* ------ REVIEWS ------ */

const deleteReviewById = require("../controllers/admin/deleteReviewById");
const postReview = require("../controllers/admin/postReview");
const putReviewById = require("../controllers/admin/putReviewById");

router.post("/review", adminMiddleware, postReview);

router.put("/review/:id", adminMiddleware, putReviewById);

router.delete("/review/:id", adminMiddleware, deleteReviewById);

/* ------ ORDERS ------ */

const deleteOrderById = require("../controllers/admin/deleteOrderById");

router.delete("/order/:id", adminMiddleware, deleteOrderById);

module.exports = router;
