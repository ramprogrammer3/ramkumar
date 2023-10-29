
const express = require("express");
const router = express.Router();

const {createProfile, getProfiles, deleteProfile, getProfile, updateProfile} = require("../controllers/userController");

router.post("/profile/create",createProfile);
router.get("/profile/getAllUsers",getProfiles)
router.delete("/profile/delete/:id",deleteProfile)
router.get("/profile/getOne/:id",getProfile)
router.put("/profile/update/:id",updateProfile)



module.exports = router;