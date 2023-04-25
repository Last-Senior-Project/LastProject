const express = require('express');
const router = express.Router();
const {get,getById,add}=require("../controllers/postClient")

router.get("/getAll",get)
router.get("/getById/:idpostclient",getById)
router.post("/add",add)


module.exports=router