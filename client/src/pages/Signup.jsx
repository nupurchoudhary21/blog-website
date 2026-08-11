import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        formData, {
          withCredentials: true
        }
      );

      console.log(response.data);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "signup failed");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-160 bg-[#FFF4EA] flex items-center justify-center px-4 pt-0">
        <div className="w-full max-w-md bg-[#C96868] rounded-3xl shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#FFF4EA]">
              Create Account
            </h1>

            <p className="text-[#FFF4EA]/80 mt-2">
              Create your Blogify account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="fullName"
                className="text-[#FFF4EA] font-semibold mb-2"
              >
                Full Name:
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg
                         bg-[#FFF4EA] text-gray-800
                         border-2 border-transparent
                         outline-none
                         focus:border-[#FFF4EA]
                         placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col mb-5">
              <label
                htmlFor="email"
                className="text-[#FFF4EA] font-semibold mb-2"
              >
                {" "}
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter a valid Email address"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg
                         bg-[#FFF4EA] text-gray-800
                         border-2 border-transparent
                         outline-none
                         focus:border-[#FFF4EA]
                         placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col mb-5">
              <label
                htmlFor="password"
                className="text-[#FFF4EA] font-semibold mb-2"
              >
                {" "}
                Password:
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg
                         bg-[#FFF4EA] text-gray-800
                         border-2 border-transparent
                         outline-none
                         focus:border-[#FFF4EA]
                         placeholder:text-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FFF4EA] text-[#C96868]
                       font-bold py-3 rounded-lg
                       hover:bg-[#fce4d2]
                       transition duration-200"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
