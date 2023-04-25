const express = require('express');
const router = express.Router();
const {getClient,addClient,getWorker} = require("../controllers/freelancer_has_client")
router.get("/getClient/:idFreelancer",getClient)
router.get("/getWorker/:idclient",getWorker)
router.post("/addClient",addClient)
module.exports = router