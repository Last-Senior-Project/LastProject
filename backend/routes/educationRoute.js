const express = require('express');
const router = express.Router();
const {get,add,deleteone} = require("../controllers/education")
router.get("/getAll",get)
router.post("/Add",add)
router.delete("/delete/:ideducation",deleteone)

module.exports=router