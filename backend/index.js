const app = require ('./App')
const http = require('http').createServer(app)
const port =5000;
const db =require("./database/index")
http.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
})