const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        maxLength : 50
    },

    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    contactNumber : {
        type : Number,
        required : true,
        maxLength : 13,
        minLength : 10
    },
    occupation : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        default : "male"
    },
    about : {
        type : String,
        maxLength : 200,
        default : "something about yourself !"
    },
    image : {
        type : String,
        required : true,
    }

},{timestamps : true})

module.exports = new mongoose.model("Profile",profileSchema);