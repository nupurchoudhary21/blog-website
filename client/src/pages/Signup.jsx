
import { useState } from "react";
import axios from "axios";

export default function Signup() {
    const [ formData , setFormData ] = useState({
        fullName: "",
        email: "",
        password:"",
    });

    const handleChange = (e) => {
        setFormData({
           ...formData,
           [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:8000/user/signup", formData);

            console.log(response.data);
            alert("Signup successful");
        } catch(err){
            console.log(err);
            alert(err.response?.data?.message || "signup failed");
        }
    };

    return (
        <>
        <div>
        <h1> Signup </h1>

        <form onSubmit={handleSubmit}>
            
           <input
           type="text"
           name="fullName"
           placeholder="Full Name"
           value={formData.fullName}
           onChange={handleChange}
          />

          <input 
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          />  

          <input 
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          />

          <button type="submit">
                Sign Up  
          </button>  

        </form>
        </div>
        </>
    )
}