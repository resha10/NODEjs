const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDB = require("./config/dbConnection");

const app = express();
connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", require("./routes/index.routes"));

app.listen(5000, () => console.log("Server running on port 5000"));
