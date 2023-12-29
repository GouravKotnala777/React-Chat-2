const mongoose = require("mongoose");

const database = () => {
    mongoose.connect("mongodb://localhost:27017/ChatApp", {
        useUnifiedTopology:true
    })
    .then(() => {
        console.log("database....");
    }).catch((error) => {
        console.log(error);
    });
};

module.exports = {mongoose, database};