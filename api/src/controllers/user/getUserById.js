const UserModel = require("../../models/nosql/user");

module.exports = async (req, res) => {
  try {
  } catch (error) {}
  const { id } = req.params;
  console.log("id", id);
  try {
    const allUserId = await UserModel.findById(id)
      .populate({
        path: "createdBeats",
        populate: [
          {
            path: "genre",
            model: "Genre",
          },
          {
            path: "review",
            model: "Review",
            populate: [
              {
                path: "createdBy",
                model: "User",
                select: "firstName lastName _id image",
              },
            ],
          },
          {
            path: "userCreator",
            model: "User",
            select: "firstName lastName _id image",
          },
        ],
      })
      .populate({
        path: "bougthBeats",
        populate: [
          {
            path: "genre",
            model: "Genre",
          },
          {
            path: "review",
            model: "Review",
            populate: [
              {
                path: "createdBy",
                model: "User",
                select: "firstName lastName _id image",
              },
            ],
          },
          {
            path: "userCreator",
            model: "User",
            select: "firstName lastName _id image",
          },
        ],
      })
      .populate({
        path: "userReviews",
        populate: [
          {
            path: "beat",
            model: "Beats",
          },
          {
            path: "createdBy",
            model: "User",
            select: "firstName lastName _id image",
          },
        ],
      })
      .populate({
        path: "userOrders",
        populate: [
          {
            path: "beat",
            model: "Beats",
            select: "name image price userCreator _id priceAmount",
            populate: [
              {
                path: "userCreator",
                model: "User",
                select: "firstName lastName _id image",
              },
            ],
          },
          {
            path: "seller",
            model: "User",
            select: "firstName lastName _id image",
          },
          {
            path: "buyer",
            model: "User",
            select: "firstName lastName _id image",
          },
        ],
      })
      .populate({
        path: "userFavorites",
        populate: [
          {
            path: "userCreator",
            model: "User",
            select: "firstName lastName _id image review",
          },
          {
            path: "review",
            model: "Review",
            populate: [
              {
                path: "createdBy",
                model: "User",
                select: "firstName lastName _id image",
              },
            ],
          },
        ],
      })
      .lean();

    try {
      if (
        allUserId &&
        allUserId.userOrders &&
        allUserId.userOrders.length > 0
      ) {
        allUserId.userOrders = allUserId.userOrders.map((order) => {
          if (!order || !order.beat) return order;
          if (order.buyer._id.toString() === id) {
            order.operationType = "Compra";
          } else {
            order.operationType = "Venta";
          }
          return order;
        });
      }

      allUserId
        ? res.status(200).send(allUserId)
        : res.status(404).json("El usuario no fue encontrado o no existe!");
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
