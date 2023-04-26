const express = require('express');
const router = express.Router();


const {getAllPostfree,addPostfree,getPostfree,deleteOne,updateOne}=require('../controllers/postfreelancer')

router.get('/getAll', getAllPostfree);

router.get('/:idpostfreelancer', getPostfree);

router.post('/add', addPostfree);
router.delete('/:idpostfreelancer', deleteOne);
router.put('/:idpostfreelancer', updateOne);

module.exports = router;