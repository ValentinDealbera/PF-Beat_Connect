const beatModel = require("../../models/nosql/beats");
const userModel = require("../../models/nosql/user");
const genreModel = require("../../models/nosql/genre");
const reviewModel = require("../../models/nosql/reviews");

module.exports = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 15;
  const { name, priceAmount, BPM, relevance, searchFilter } = req.query;
  //separamos por % y arammo un array de generos
  const genres = req.query.genre ? req.query.genre.split(",") : null;
  console.log("genres", genres);
  let sortBy;
  if (name) {
    sortBy = { name };
  }
  if (BPM) {
    sortBy = { BPM };
  }
  if (priceAmount) {
    sortBy = { priceAmount };
  }
  if (relevance) {
    sortBy = { relevance };
  }

  const minMaxFiltersFunction = ({ minPrice, maxPrice, minBPM, maxBPM }) => {
    let filters = {};
    minPrice &&
      (filters.priceAmount = {
        ...filters.priceAmount,
        $gt: minPrice - 0.01,
      });
    maxPrice &&
      (filters.priceAmount = {
        ...filters.priceAmount,
        $lt: maxPrice * 1 + 0.01,
      });
    minBPM && (filters.BPM = { ...filters.BPM, $gt: minBPM - 0.01 });
    maxBPM && (filters.BPM = { ...filters.BPM, $lt: maxBPM * 1 + 0.01 });
    return filters;
  };

  const minMaxFilters = minMaxFiltersFunction(req.query);

  try {
    const beats = await beatModel.paginate(
      {
        ...(genres && genres[0] !== "" && { genre: { $in: genres } }),
        ...(searchFilter && {
          name: {
            $regex: new RegExp("^" + searchFilter.toLowerCase(), "i"),
          },
        }),
        ...(minMaxFilters && { ...minMaxFilters }),
      },
      {
        limit,
        page,
        sort: sortBy,
        collation: {
          locale: "en",
        },
        populate: [
          {
            path: "userCreator",
            model: userModel,
          },
          {
            path: "genre",
            model: genreModel,
          },
          {
            path: "review",
            model: reviewModel,
            //poblamos el usuario que hizo el review
            populate: {
              path: "createdBy",
              model: userModel,
            },
          },
        ],
      },
    );

    res.status(200).json(beats);
  } catch (error) {
    console.log(error.message);
    res.status(500).jjson({ message: error.message });
  }
};
