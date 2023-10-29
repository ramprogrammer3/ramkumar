const cloudinary = require("cloudinary").v2;
require("dotenv").config();


exports.uploadeImageTocloudinary = async(file,folder)=>{
    const options = {folder}
    
    options.width = 150,
    options.height = 150,
    options.crop ="fill",
    options.radius = "max"
    
    
    options.resource_type  = "auto";
   

    return await cloudinary.uploader.upload(file,options,)

}