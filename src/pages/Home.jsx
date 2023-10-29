import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {AiFillDelete} from "react-icons/ai"
import {BiSolidEditAlt} from "react-icons/bi"


const url = "https://ramkumar-crud-profile.onrender.com/api/v1/profile/getAllUsers";
const url1 = "https://ramkumar-crud-profile.onrender.com/api/v1/profile/delete/"

const Home = () => {
    const [userData,setUserData] = useState([]);
    const [loading,setLoading] = useState(false);
    
   
    // fetch profile data 
    const getUserData = async() =>{
      setLoading(true)
        try {
            const response = await axios.get(url);
            setUserData(response.data.data);
            toast.success(response.data.message)
            setLoading(false)
        } catch (error) {
            toast.error("unable to fetch user data");
        }
        setLoading(false)
    }

    // delete profile data api call 
    const deleteProfile = async(id)=>{
      try {
        const response = await axios.delete(`${url1}${id}`)
        toast.success(response.data.message)
        window.location.reload(false)

      } catch (error) {
        toast.error("unable to delete user profile ")
      }
    }



    useEffect(()=>{
        getUserData();
    },[])


    if(loading){
      return <div> loading ...</div>
    }

  return (
    <div className="w-9/12 max-w-[1000px] mx-auto my-20 flex flex-col gap-y-10">
      <div
        className="flex  lg:flex-row  gap-5 justify-between 
      border-b px-5 py-2 rounded-md border-blue-300"
      >
        <h1 className=" text-sm lg:text-3xl font-semibold">Users Profile</h1>
        <Link to={"/addprofile"}>
          <button
            className="bg-blue-500 text-white px-2 py-1 lg:px-3 lg:py-2 
          rounded-md text-[14px] lg:text-[18px] hover:bg-blue-600 transition-all duration-200"
          >
            {" "}
            Add Profile{" "}
          </button>
        </Link>
      </div>

      <div className="w-full">

        {
          userData.map((profile)=>(
            <div key={profile._id} className="flex flex-col md:flex-row gap-[40px]  corner border border-blue-300 mb-5 p-4 w-full items-center " id = {profile.id}>

              <div className="w-[50%]">
                <img src= {profile.image} alt="" className="gradient"  />
              </div>

              <div className="w-[50%]">
                <div className="flex flex-col gap-y-3 ">
                  <p> <span className="font-semibold">Name : </span> {profile.name} </p>
                  <p><span className="font-semibold">Email : </span> {profile.email} </p>
                  <p><span className="font-semibold">Contact : </span> {profile.contactNumber} </p>
                  <p><span className="font-semibold">Occupation : </span> {profile.occupation} </p>
                  <p><span className="font-semibold">Gender : </span> {profile.gender} </p>

                  <div className="flex justify-between mt-3">

                    <Link to = {`/edit/${profile._id}`}>
                     <BiSolidEditAlt className="text-3xl text-blue-500 cursor-pointer" /> 
                    </Link>
                    <button onClick={()=>{
                      deleteProfile(profile._id)
                    }}> <AiFillDelete className="text-3xl text-red-600 cursor-pointer" /> </button>
                  </div>
                  
                </div>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  );
};

export default Home;
