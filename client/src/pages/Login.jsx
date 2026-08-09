
import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [ formData , setFormData ] = useState({
        email: "",
        password:"",
    });

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name] : e.target.value,
        });
    };

    const handleSubmit = async (e) =>{
         e.preventDefault();

         try{
            const response = await axios.post("http://localhost:8000/user/signin",
                formData,{
                    withCredentials: true,
                }
            );

            console.log(response.data);
            alert("Login successful");
         } catch(error){
            console.log(error);
            alert(error.response?.data?.message || "Login Failed");
         }
    };

    return (
        <>
        <div>
        <h1> Login </h1>

        <form onSubmit={handleSubmit}>
            
           <input
           type="email"
           name="email"
           placeholder="Email"
           value={formData.email}
           onChange={handleChange}
           />   

            <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            />

            <button type="submit">
                Login
            </button>

        </form>

        </div>
        </>
    )
}