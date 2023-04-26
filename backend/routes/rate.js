const express = require('express');
const router = express.Router();


const {getAllRate,addRate,getRate,deleteOne,updateOne}=require('../controllers/rate')

router.get('/getAll', getAllRate);

router.get('/:idrate', getRate);

router.post('/add', addRate);
router.delete('/:idrater', deleteOne);
router.put('/:idrate', updateOne);

module.exports = router;