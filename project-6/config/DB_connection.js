const mongoose =   require("mongoose")

const DB_connection = async (req, res) => {
    await mongoose.connect("mongodb+srv://reshanakrani_db_user:resha1006@cluster0.o04v9vu.mongodb.net/admin-panel")
    .then("connection successfully ")
    .catch((err) =>  console.log(err))
}

module.exports = DB_connection;
