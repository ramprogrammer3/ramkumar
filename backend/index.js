const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db");
const profileRoute = require("./routes/userProfileRoute");
const {cloudinaryConnect} = require("./config/cloudinary");

const app = express();
const port = process.env.port || 8000;

// middleware
app.use(express.json({limit : "50mb"}));
app.use(cors());
app.use(fileUpload({
    useTempFiles : true,
   
}))

// cloudinary connection
cloudinaryConnect();


// routes
app.use("/api/v1",profileRoute);

// db connection
connectDB();


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})