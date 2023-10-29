import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const url = REACT_APP_BASE_URL+"/profile/getOne/";
const url1 = REACT_APP_BASE_URL+"/profile/update/"

const EditProfile = () => {
  const location = useLocation();
  const getId = location.pathname.split("/");
  const id = getId[getId.length - 1];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [image,setImage] = useState("")


  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  
  // get user data by id
  const getUserData = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}${id}`);
      setName(response.data.data.name)
      setEmail(response.data.data.email)
      setContactNumber(response.data.data.contactNumber)
      setOccupation(response.data.data.occupation)
      setGender(response.data.data.gender)
      setAbout(response.data.data.about)
      setImage(response.data.data.image)

      toast.success(response.data.message);
      setLoading(false);
    } catch (error) {
      toast.error("Failed while fetching user data")
    }
    setLoading(false);
  };

// upload image 
  const fileUpload = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
      setImage(reader.result);
    }
  }


// update user profile by id
  const updateUser = async(id,data)=>{
    const toastId = toast.loading("Updating...")
    try {
      const response = await axios.put(`${url1}${id}`,data);
      if(!response.data.success){
        toast.error(response.data.message)
      }
      toast.success(response.data.message)
      navigate("/")
    } catch (error) {
      toast.error("Unable to update user profile on UI")
    }
    toast.dismiss(toastId)
  }


  useEffect(() => {
    getUserData(id);
  }, []);

  // on submit function to call update user profile api
  const submitHandler = (e) =>{
    e.preventDefault();
    const data = {
      name,email,contactNumber,occupation,gender,about,image
    }

    updateUser(id,data);
    
  }

  if (loading) {
    return <div> loading ...</div>;
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

      <div className="w-[150px] h-[150px] mt-10">
        <img src= {image} alt=""  height="150px" className="rounded-full w-40 h-40 aspect-square object-cover" />
      </div>
    </div>
  );
};

export default EditProfile;
