const app = require("./app");
// const express = require("express");
// const app = express();
const PORT = 8000;
const {database} = require("./config/database");
const http = require("http");
// const socketIO = require("socket.io");
// const connectedUser = {};

database();

app.get("/", (req, res) => {
    res.json({data:"this is it"});
});


const server = http.createServer(app);
// const io = socketIO(server);


// io.on("connect", (socket) => {
//     console.log("New Connection from Server....");

    
//     socket.on("joined", (userNameFromPage1) => {
//         connectedUser[userNameFromPage1] = socket.id;
//         socket.broadcast.emit("joineddBroad", userNameFromPage1);
//         socket.emit("joinedd", userNameFromPage1);

//     })
//     socket.on("messaged", ({content, contentId, userName}) => {
//         if (connectedUser[userName]) {
//             socket.to(connectedUser[userName]).emit("messageDataIO", {content, contentId, userName});
//             // socket.to([connectedUser[contentId], connectedUser[userName]]).emit("messageDataIO", {content, contentId, userName});
//             console.log(userName);
//             console.log(connectedUser[userName]);
//         }
//         else{
//             io.emit("messageDataIO", {content, contentId, userName});
//         }
        
//     });
    

// });




server.listen(PORT, () => {
    console.log("listening.....");
});