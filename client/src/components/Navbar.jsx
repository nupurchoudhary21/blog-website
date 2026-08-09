import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar(){
   
   const [user, setUser] = useState(null);

   useEffect(()=>{
    axios.get("http://localhost:8000/user/me",{
      withCredentials: true
    })
    .then((response) =>{
      setUser(response.data.user);
    })
    .catch(()=>{
      setUser(null);
    });
   }, []);

   const handleLogout = async() =>{
    try{
      await axios.get("http://localhost:8000/user/logout",
        {
          withCredentials: true
        }
      );
      setUser(null);
    }catch(error){
      console.log(error);
    }
   };


    return(
      <nav className="fixed top-0 left-0 w-full  bg-[#C5B3D3] shadow-md z-10 ">
       <div className="flex items-center justify-left h-16 px-4 py-4 space-x-8 text-white text-lg">
        <div className="text-2xl font-bold">Blogify </div>
      <Link to="/">Home</Link>
       
     {  user ? (
      <>
      <img 
      src={user.profileImageURL}
      alt ={user.fulName}
      className="h-10 w-10"
      />

      <span> {user.fullName}</span>

      <button onClick={handleLogout}>
           Logout  
      </button>   

      <Link to="/createBlog">
      Create Blog
      </Link>

      </>
     ) : (
      <>
     <Link to="/signup">Create Account</Link>
      <Link to="/login">Login</Link>
       </>
     )
    }
       </div>
      </nav>
    )
}