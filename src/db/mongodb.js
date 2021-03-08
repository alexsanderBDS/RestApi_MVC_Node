const mongoose = require("mongoose");

const startDB = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE_PRODUCTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB Connected");
  } catch (error) {
    console.log("DB connection error", error);
  }
};

module.exports = startDB;
