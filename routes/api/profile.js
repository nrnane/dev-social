const express = require('express');
const router = express.Router();
//@route GET api/profile
//@dsc Test Users
//@access Public

router.get('/',(req,res)=>res.send('Profiles route'));

module.exports = router

