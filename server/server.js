const
    {Server} = require("socket.io"),
    server = new Server(8000);
const registerStats = require("./registerStats")


 
    
// event fired every time a new client connects:
server.on("connection", (socket) => {
  console.info(`Client connected [id=${socket.id}]`);
  let count =  0;
  setInterval(()=>{
    socket.emit("registerStats",registerStats[count]);
    count++;
    if(count == registerStats.length){
      count= 0;
    }
  }, 3000)
  
});