const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const {check,validationResult} = require('express-validator');

//@route GET api/profile
//@dsc Get all users profiles
//@access public
router.get('/',async(req,res) => {
    try {
        const profile = await Profile.find().populate('user',['name','avatar']);
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

//@route POST api/profile/user/:user_id
//@dsc Get User profile by user id
//@access public
router.get('/user/:user_id',async(req,res) => {
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if(!profile) return res.status(400).json({msg:'There is no profile for this user'});
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        if(error.kind=='ObjectId'){
            return res.status(400).json({msg:'Profile not found'});
        }
        res.status(500).send('Server error');
    }
});

//@route Get api/profile/github/:username
//@dsc Get User repos from github
//@access public
router.get('/github/:username',async(req,res) => {
    try {
        const options = {
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method:'GET',
            headers:{'user-agent':'node.js'}
        };
        request(options,(error,response,body)=>{
            if(error) console.log(error);
            //console.log(response);
            if(response.statusCode!==200){
                return res.status(404).json({msg:'No Github Profile found'});
            }
            res.json(JSON.parse(body));
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});


//@route GET api/profile/me
//@dsc Get loggedin User profile
//@access private
router.get('/me', auth, async (req,res)=>{
    //res.send('Profiles route')
    try {
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'});
        }
        res.json(profile);

    } catch (error) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

//@route DELETE api/profile
//@dsc Delete user profile
//@access private
router.delete('/',auth,async(req,res)=>{
    try {
        await Profile.findOneAndRemove({user:req.user.id});

        await User.findOneAndRemove({_id:req.user.id});
        res.json("profile deleted");

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

//@route PUT api/profile/experience
//@dsc Add profile experiance
//@access private
router.put('/experience',[auth,[
    check('title','Title is required')
        .not()
        .isEmpty(),
    check('company','Company is required')
        .not()
        .isEmpty(),
    check('from','Form date is required')
        .not()
        .isEmpty()        
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})


//@route Delete api/profile/experience/:exp_id
//@dsc Delete profile experiance
//@access private
router.delete('/experience/:exp_id',auth,async (req,res)=>{

    try {
        const profile = await Profile.findOne({user:req.user.id});
        
        //get remove index
        const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
        if(removeIndex>=0){
            profile.experience.splice(removeIndex,1);
            await profile.save();
        }
        res.json(profile);


    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})


//@route PUT api/profile/education
//@dsc Add profile education
//@access private
router.put('/education',[auth,[
    check('school','School is required')
        .not()
        .isEmpty(),
    check('degree','Degree is required')
        .not()
        .isEmpty(),
    check('fieldofstudy','Fieldofstudy is required')
        .not()
        .isEmpty(),
    check('from','Form date is required')
        .not()
        .isEmpty()        
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.education.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})


//@route Delete api/profile/education/:edu_id
//@dsc Delete profile education
//@access private
router.delete('/education/:edu_id',auth,async (req,res)=>{

    try {
        const profile = await Profile.findOne({user:req.user.id});
        
        //get remove index
        const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id);
        if(removeIndex>=0){
            profile.education.splice(removeIndex,1);
            await profile.save();
        }
        res.json(profile);

        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})



//@route POST api/profile
//@dsc Get loggedin User profile
//@access private
router.post('/', [auth,[
    check('status','Status is required')
    .not()
    .isEmpty(),
    check('skills','skills is required')
    .not()
    .isEmpty()
]], async (req,res)=>{
    console.log(req.user);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill=>skill.trim());
    }

    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;

    console.log(profileFields);
    

    try {
        let profile = await Profile.findOne({user:req.user.id});
        if(profile){
            profile = await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFields},
                {new:true}
                );
                return res.json(profile);
        }
        
        //Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (error) {
        console.log(error,message);
        res.status(500).send('Server error');
    }
});


module.exports = router

