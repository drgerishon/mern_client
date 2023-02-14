const io = require("socket.io-client");
const socket = io.connect("http://localhost:8000/api/user/mpesa-order");

let init = (httpServer) => {
    socket.on("PaypalOrderId", (data) => {
        console.log(data);
    });
};

module.exports = {socket, init};