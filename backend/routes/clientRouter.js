const express = require('express');
const router = express.Router();
const {get,add,updateClient,deleteClient} = require("../controllers/client")

router.get("/getAll",get)
router.post("/add",add)
router.put("/update/:idclient",updateClient)
router.delete("/delete/:idclient",deleteClient)
module.exports =router;