const  GenreModel = require('../schemas/index');

const getGenresController = async () =>{

    const genres = await GenreModel.find();
    return genres;
}

module.exports = getGenresController;