let express = require("express");
const { PORT } = require("./constant.cjs");
let app = express();


app.use(express.static( './public',{ root: __dirname }));

app.get("/", function(req,res){
    res.sendFile('./public/index.html', { root: __dirname });
})

const server = app.listen(PORT, ()=>{
    console.log(`Your server is running at ${PORT}`)
})

// Socket 

const io = require("socket.io")(server);

io.on("connection",(socket)=>{
    console.log("Socket connected ", )
    socket.on('message', (msg)=>{
    socket.broadcast.emit('message',msg)
    })
})
