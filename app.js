const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());
app.use("/", userRoute);
app.use("/", chatRoute);
app.use("/", messageRoute);


module.exports = app;