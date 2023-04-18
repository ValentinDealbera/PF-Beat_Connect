const express = require("express");
const router = express();
const mongoose = require("mongoose");
const UserModel = require("../models/nosql/user");
const beatModel = require("../models/nosql/beats");
const ReviewModel = require("../models/nosql/reviews")


const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  USER_NOT_FOUND,
  SERVER_ERROR,
  ALL_OK,
  ALL_NOT_OK,
} = require("../controllers/status");
const { getActiveUser, getUserId } = require("../controllers/userController");

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().populate('createdBeats').populate('bougthBeats');
    res.json(users);
  } catch (err) {
    res.status(SERVER_ERROR).send(USER_NOT_FOUND);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allUserId = await UserModel.findById(id).populate({
    path: 'createdBeats',
    populate: [
      {
        path: 'genre',
        model: 'Genre',
      },
      {
        path: 'review',
        model: 'Review',
      },
      {
        path: 'userCreator',
        model: 'User',
      },
    ],
  }).populate({
    path: 'bougthBeats',
    populate: [
      {
        path: 'genre',
        model: 'Genre',
      },
      {
        path: 'review',
        model: 'Review',
      },
    ],
  });
    allUserId
      ? res.status(OK).send(allUserId)
      : res.status(NOT_FOUND).send(USER_NOT_FOUND);
  } catch (err) {
    res.status(NOT_FOUND).send(USER_NOT_FOUND);
  }
});

router.post("/", async (req, res) => {
  const { body } = req;

  try {
    const user = await UserModel.create(body);
    res.send(user);
  } catch (err) {
    console.error(err.message);
  }
});

//put para convertirse en vendedor
// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   if (id) {
//     try {
//       const userId = await getUserId(id);
//       if (userId) {
//         userId.isSeller = true;
//         res.status(OK).send(ALL_OK);
//       }
//     } catch (err) {
//       res.status(SERVER_ERROR).send(ALL_NOT_OK);
//     }
//   }
//   res.status(NOT_FOUND).send(USER_NOT_FOUND);
// });

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { seller, admin, soft } = req.body;

  if (
    (seller && seller !== "VENDEDOR") ||
    (admin && admin !== "ADMIN") ||
    (soft && soft !== "DELETE")
  ) {
    return res.status(BAD_REQUEST).send(ALL_NOT_OK);
  }

  if (id && seller === "VENDEDOR") {
    try {
      const userId = await getUserId(id);
      if (userId) {
        userId.isSeller = true;
        await userId.save();
        res.status(OK).send(ALL_OK);
      } else {
        res.status(NOT_FOUND).send(USER_NOT_FOUND);
      }
    } catch (err) {
      res.status(SERVER_ERROR).send(ALL_NOT_OK);
    }
  }
  if (id && admin === "ADMIN") {
    try {
      const userId = await getUserId(id);
      if (userId) {
        userId.superAdmin = true;
        await userId.save();
        res.status(OK).send(ALL_OK);
      } else {
        res.status(NOT_FOUND).send(USER_NOT_FOUND);
      }
    } catch (err) {
      res.status(SERVER_ERROR).send(ALL_NOT_OK);
    }
  }

  if (id && soft === "DELETE") {
    try {
      const userId = await getUserId(id);
      if (userId) {
        if (userId.softDelete === false) {
          userId.softDelete = true;
          await userId.save();
          res.status(OK).send(ALL_OK);
        } else {
          userId.softDelete = false;
          await userId.save();
          res.status(OK).send(ALL_OK);
        }
      }
    } catch (err) {
      res.status(SERVER_ERROR).send(ALL_NOT_OK);
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Elimina review creada x el usuario
    await ReviewModel.deleteMany({ createdBy: id });
    
    // Todos los beats creados por el usuario
    const userBeats = await beatModel.find({ userCreator: id });
    // Elimino todos los beats del usuario
    await beatModel.deleteMany({ userCreator: id });
    
    // Elimino review asociadas con los beats del usuario.
    await ReviewModel.deleteMany({ beat: { $in: userBeats.map((beat) => beat._id) } });
    
    // Elimino el usuario
    await UserModel.findByIdAndDelete(id);

    res.json({ message: "Usuario eliminado con éxito." });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message }).status(SERVER_ERROR);
  }
});



module.exports = router;
