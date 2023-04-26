const express = require('express');
const router = express.Router();


const {getAllExp,addExp,getOneExp,deleteOne,updateOne}=require('../controllers/experience')

router.get('/getAll', getAllExp);

router.get('/:idexperience', getOneExp);

router.post('/add', addExp);
router.delete('/:idexperience', deleteOne);
router.put('/:idexperience', updateOne);

module.exports = router;