const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_CNN);
    console.log("db_online");
  } catch (error) {
    console.log(error);
    throw new Error("Error when initializing database");
  }
};

module.exports = { dbConnection };
