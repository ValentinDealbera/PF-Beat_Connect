const UserModel = require("../../models/nosql/user");

module.exports = async (req, res) => {
  try {
    const users = await UserModel.find()
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
          },
          {
            path: "userCreator",
            model: "User",
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
          },
          {
            path: "userCreator",
            model: "User",
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
          },
        ],
      })
      .populate({
        path: "userOrders",
        populate: [
          {
            path: "beat",
            model: "Beats",
          },
          {
            path: "seller",
            model: "User",
          },
          {
            path: "buyer",
            model: "User",
          },
        ],
      })
      .populate("userFavorites");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
