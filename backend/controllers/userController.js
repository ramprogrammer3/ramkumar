
const Profile = require("../models/userModel");
const {uploadeImageTocloudinary} = require("../imageUploader");
require("dotenv").config();


exports.createProfile = async(req,res)=>{
    try {

        // fetching data from body
        
        const {name,email,contactNumber, occupation,gender,about} = req.body;
        
        // validating data 
        if(!name || !email || !contactNumber || !occupation){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }
      
        // const image = req.files.image || req.body.image;
        const {image} = req.body;
       
        if(!image){
            return res.status(400).json({
                success : false,
                message : "please fill profile picture"
            })
        }
        const profileImage = await uploadeImageTocloudinary(image,process.env.FOLDER)

        const existingUser = await Profile.findOne({email})

        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "User profile already exist,please change email "
            })
        }
        

        const user = await Profile.create({
            name,
            email,
            contactNumber,
            occupation,
            gender,
            about,
            image : profileImage.secure_url,
        })
       
       return res.status(200).json({
        success : true,
        message : "user profile created successfully",
        data : user,
       })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Unable to create profile, please try again"
        })
    }
}

exports.getProfiles = async(req,res)=>{
    try {

        const allUsers = await Profile.find({}).sort({"createdAt" : -1})
        
        return res.status(200).json({
            success : true,
            message : "data found successfully",
            data : allUsers
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Unable to fetch data, please try again"
        })
    }
}

exports.deleteProfile = async(req,res)=>{
    try {

        // fetch user by id
        const id = req.params.id;
        
        await Profile.findByIdAndDelete(id)

        return res.status(200).json({
            success : true,
            message : "User profile deleted successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "User is not deleted, please try again"
        })
    }
}

exports.getProfile = async(req,res)=>{
    try {

        // get user data
        const id = req.params.id;

        const user = await Profile.findById(id);

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Unable to fetched user data"
            })
        }
        // return response
        res.send({
            success : true,
            message : "User data fetched successfully",
            data : user
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Unable to fatched user data"
        })
    }
}

exports.updateProfile = async(req,res)=>{
    try {

        const id = req.params.id;
        const {name,email,contactNumber,occupation,gender,about,image} = req.body;
        
        const profileImage = await uploadeImageTocloudinary(image,process.env.FOLDER)

        const updatedUser = await Profile.findByIdAndUpdate({_id : id},
            {
                name,email,contactNumber,occupation,gender,about,image : profileImage.secure_url
            },{new : true})

        return res.status(200).json({
            success : true,
            message : "Profile Updated successfully",
            data : updatedUser
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Unable to update profile"
        })
    }
}