const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const {check,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config')
const bcrypt = require('bcryptjs');

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

router.post('/',[
    check('email','Please enter a valid email').isEmail(),
    check('password','Please enter a password ').exists()
],async (req,res)=>{
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors:[{msg:"Invalid credentials"}]});
        }
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg:"Invalid credentials"}]});
        }

        //return jsonwebtoken
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:36000},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            }
        );
        
    } catch(err){
        console.log(err.message);
        res.status(500).send("server error");
    }
});

module.exports = router

