const {mongoose} = require("../config/database");
const bcryptJS = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        required:true,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    chats:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }],
    role:{
        type:String,
        default:"user"
    }

});

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        console.log("password is modified");
        return next();
    }
    this.password = await bcryptJS.hash(this.password, 7);
});

userSchema.methods.comparePassword = async function(password){
    const isPasswordMatched = await bcryptJS.compare(password, this.password);
    return isPasswordMatched;
}

userSchema.methods.generateToken = async function(){
    const token = await jwt.sign({id:this._id}, "thisismysecret", {expiresIn: "1h"});
    return token;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;