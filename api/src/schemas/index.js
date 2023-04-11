const models = {
    UserCreatorModel: require('./nosql/userCreator'),
    UserBuyerModel: require('./nosql/userBuyer'),
    BeatsModel: require('./nosql/beats'),
    GenreModel: require('./nosql/genre'),
    ReviewModel: require('./nosql/reviews'),
    UserSuperModel: require('./nosql/usersuper')
}
module.exports = models
