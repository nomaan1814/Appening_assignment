const express=require('express');
const router=express.Router();
const { registerUser, loginUser, listAllUser } = require('../controllers/userController');
const { protect } = require('../services/authServices');

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get('/allUser',protect,listAllUser);
module.exports=router;