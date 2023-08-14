const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String,require:true},
    password:{type:String,required:true},
    content:[[String]]
},{
    versionKey:false
})

const usermodel = mongoose.model("user",userSchema);

module.exports = {usermodel}