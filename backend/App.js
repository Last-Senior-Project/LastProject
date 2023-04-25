const express = require("express");
const app = express();
const clientRouter =require('./routes/clientRouter')
const edcuationRouter=require("./routes/educationRoute")
const postClientRouter =require("./routes/postClientRouter")
const clien_has_worker =require("./routes/client_hasFreelancerRouter")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/client',clientRouter)
app.use("/api/education",edcuationRouter)
app.use("/api/postClient",postClientRouter)
app.use("/api/client-worker",clien_has_worker)
module.exports = app;
