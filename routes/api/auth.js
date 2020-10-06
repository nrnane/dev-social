const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
//@route GET api/auth
//@dsc Test Auth
//@access Public

router.get('/',auth, async (req,res)=>{
    console.log(req.user);
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(err.message);
        res.status(500).send('Server Erro');
    }
    //res.send('Auth route')
});

module.exports = router

