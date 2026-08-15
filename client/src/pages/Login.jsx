import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
        `${import.meta.env.VITE_API_URL}/user/signin`,
        formData,
        {
          withCredentials: true,
        },
      );

      console.log(response.data);
      alert("Login successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <Header />
      <div className="h-screen bg-[#FFF4EA] flex items-center justify-center px-4 pt-0">
        <div className="w-full max-w-md bg-[#C96868] rounded-3xl shadow-lg p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#FFF4EA]">
              Login to your Account
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="email"
                className="text-[#FFF4EA] font-semibold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
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
                Password:
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
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
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
