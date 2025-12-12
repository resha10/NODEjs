const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB is Connected'))
    .catch((err) => console.log('DB connection error:', err));
};

module.exports = dbConnect;
