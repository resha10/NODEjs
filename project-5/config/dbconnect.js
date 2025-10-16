const mongoose = require('mongoose');

const dbConnnection = () => {
    mongoose.connect("mongodb+srv://reshanakrani_db_user:resha1006@cluster0.o04v9vu.mongodb.net/Bookmyshow")
        .then(() => console.log("DB is Connected"))
        .catch(err => console.log(err));
}

module.exports = dbConnnection;