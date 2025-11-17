const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://reshanakrani_db_user:resha1006@cluster0.o04v9vu.mongodb.net/admin-panel");
    // await mongoose.connect("");
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Database Connection Failed:", err);
  }
};

module.exports = dbConnect;
 