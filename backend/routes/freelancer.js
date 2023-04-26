const express = require('express');
const router = express.Router();


const {getAllFree,addFree,getOneFree,getFreeName,deleteOne,updateOne}=require('../controllers/freelancer')

router.get('/getAll', getAllFree);

router.get('/:idFreelancer', getOneFree);

router.get('/:firstnamefreelancer',getFreeName)
router.post('/add', addFree);
router.delete('/:idFreelancer', deleteOne);
router.put('/:idFreelancer', updateOne);

module.exports = router;