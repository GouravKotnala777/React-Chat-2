const Users = require("../models/userModel");

exports.register = async(req, res, next) => {
    try {
        const {name, email, password, pic, role} = req.body;
        if (!name, !email, !password) {
            return res.json({success:false, message:"all fields are required"});
        }
        const userRegisExist = await Users.findOne({email});
    
        if (userRegisExist) {
            return res.json({success:false, message:"user already exist"});
        }
    
        const userRegisNew = await Users.create({name, email, password, pic, role});
    
        res.json({success:true, message:userRegisNew});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
};

exports.login = async(req, res, next) => {
    try {
        const {email, password} = req.body;

        if (!email, !password) {
            return res.json({success:false, message:"all fields are required"});
        }

        const userLoginExist = await Users.findOne({email});

        if (!userLoginExist) {
            return res.json({success:false, message:"wrong email or password1"});
        }
        
        const isPasswordMatched = await userLoginExist.comparePassword(password);
        
        if (!isPasswordMatched) {
            return res.json({success:false, message:"wrong email or password3"});
        }

        const token = await userLoginExist.generateToken();

        res.cookie("token", token, {expire:new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), httpOnly:true}).json({success:true, message:userLoginExist});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
};

exports.myProfile = async(req, res, next) => {
    const {user} = req
    res.json({success:true, message:user});
};

exports.allUsers = async(req, res, next) => {
    let keywors = req.body.userId
                    ?
                    {
                        $or:[
                            {name:{$regex:req.body.userId, $options:"i"}},
                            {email:{$regex:req.body.userId, $options:"i"}}
                        ]
                    }
                    :
                    {}
    const allUsers = await Users.find(keywors);

    if (!req.body.userId) {
        return res.json({success:true, message:allUsers, message2:[]});
    }
    // console.log(allUsers);
    res.json({success:true, message:allUsers, message2:allUsers});
};
exports.findSingleUser = async(req, res, next) => {
    if (!req.body.email) {
        return res.json({success:false, message:"email is required"});
    }
    const findUser = await Users.findOne({email:req.body.email});

    if (!findUser) {
        return res.json({success:false, message:"user not found"});
    }

    res.json({success:true, message:findUser.email, message2:findUser._id});
};
