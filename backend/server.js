const express = require("express");
const bodyParser = require("body-parser");

const cors = require('cors');
const {Server} = require('socket.io');
const http = require("http");
let ip = require("ip");

const app = express();
const server = http.createServer(app);
console.dir (ip.address());
const port = 3000;

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origins: '*'
}))

app.get('/', (req, res) => {
    res.json({"hello": "world!"});
})

io.on("connection",(socket) =>{
    console.log(socket.id)
    socket.on("message", (data)=>{
        console.log(data)
        // io.emit("sendFront", data)
        app.post('/', function(req, res) {
            res.send(data);
        });
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
