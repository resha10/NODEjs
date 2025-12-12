require('dotenv').config();
const express = require('express');

const port = process.env.PORT || 9000;
const app = express();
const dbConnect = require('./config/dbConnection');
const morgan = require('morgan');
const cors = require('cors');
dbConnect()

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"))

app.use("/api", require("./routes/index.routes"));


app.listen(port, ()=> {
    console.log(`Server start at http://localhost:${port}`);
})