import {useNavigate} from "react-router-dom"
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
const url =  REACT_APP_BASE_URL+"profile/create"

const AddProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [image,setImage] = useState("")

  const navigate = useNavigate();
 

// add user profile to data base using api
  const addProfileData = async(data)=>{
    const toastId = toast.loading("Loading...")
    try {
      const response = await axios.post(url,data,);
      if(!response.data.success){
        toast.error(response.data.message)
      }

      toast.success(response.data.message)
      navigate("/")
    } catch (error) {
      toast.error("Error while adding data, please try again")
    }

    toast.dismiss(toastId)
    
  }

  // upload image 
  const fileUpload = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
      setImage(reader.result);
    }
  }

  const submitHandler = (e) =>{
    e.preventDefault();
  
    const data = {name,email,contactNumber,occupation,gender,about,image}
    addProfileData(data);
  }

  return (
    <div className="w-11/12 max-w-[400px] border border-blue-300 p-5 mx-auto my-16 rounded-md">
      
      <form action="" className="w-full flex flex-col gap-4" onSubmit={submitHandler}>
        <label htmlFor="" className="flex flex-col w-full gap-2">
          <p>Name : </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            className="w-full border border-blue-300 rounded-md px-4 focus:outline-blue-400"
            placeholder="Enter your full name "
          />
        </label>

        <label htmlFor="" className="flex flex-col w-full gap-2">
          <p>Email : </p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="emal"
            name="email"
            className="w-full border border-blue-300 rounded-md px-4 focus:outline-blue-400"
            placeholder="Enter your Email  "
          />
        </label>

        <label htmlFor="" className="flex flex-col w-full gap-2">
          <p>Contact Number : </p>
          <input
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            type="number"
            name="contactNumber"
            className="w-full border border-blue-300 rounded-md px-4 focus:outline-blue-400"
            placeholder="Enter your contactNumber  "
          />
        </label>

        <label htmlFor="" className="flex flex-col w-full gap-2">
          <p>Occupation : </p>
          <input
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            type="text"
            name="occupation"
            className="w-full border border-blue-300 rounded-md px-4 focus:outline-blue-400"
            placeholder="Enter your profession  "
          />
        </label>

        <label htmlFor="" className="flex flex-col w-full gap-2">
          <p>Gender : </p>
          <input
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            type="text"
            name="gender"
            className="w-full border border-blue-300 rounded-md px-4 focus:outline-blue-400"
            placeholder=" gender  "
          />
        </label>

        <label htmlFor="" className="flex flex-col w-full gap-2">
          <p>About : </p>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            type="text"
            name="about"
            className="w-full border border-blue-300 rounded-md px-4 focus:outline-blue-400"
            placeholder="enter your bio ... max length 200 "
          />
        </label>

        <label htmlFor="" className="flex flex-col w-full gap-2">
          <p>Image : </p>
          <input
           
            onChange={fileUpload}
            accept="image/*"
            multiple
            type="file"
            name="image"
            className="w-full border border-blue-300 rounded-md px-4 py-1 focus:outline-blue-400"
            placeholder=" select profile image   "
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddProfile;
