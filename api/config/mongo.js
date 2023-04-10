const mongoose = require("mongoose");

const { DB_URI } = process.env;

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("**** CONEXION CORRECTA ****");
  } catch (err) {
    console.log("**** ERROR DE CONEXION ****");
    console.error(err);
  }
};

module.exports = dbConnect;
