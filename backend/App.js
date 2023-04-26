const express = require("express");
const app = express();
const clientRouter =require('./routes/clientRouter')
const edcuationRouter=require("./routes/educationRoute")
const postClientRouter =require("./routes/postClientRouter")
const clien_has_worker =require("./routes/client_hasFreelancerRouter")
const freeRoute = require('./routes/freelancer');
const expRoute = require('./routes/experience');
const postFreeRoute = require('./routes/postfreelancer')
const rateRoute = require('./routes/rate')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/client',clientRouter)
app.use("/api/education",edcuationRouter)
app.use("/api/postClient",postClientRouter)
app.use("/api/client-worker",clien_has_worker)
app.use('/api/freelance', freeRoute);
app.use('/api/experience', expRoute);
app.use('/api/postFreelance', postFreeRoute);
app.use('/api/rate', rateRoute);
module.exports = app;
