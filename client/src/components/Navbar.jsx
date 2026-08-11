import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/me`, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full  bg-[#C96868] shadow-md z-50 ">
      <div className="flex items-center justify-left h-16 px-4 py-4 space-x-8 text-white text-lg">
        <img className="h-10 w-13 rounded-lg mx-2" src="/logo.png" />
        <div className="text-2xl font-bold">Blogify </div>
        <Link to="/">Home</Link>

        {user ? (
          <>
            <div className="flex flex-cols items-center">
              <img
                src={user.profileImageURL}
                alt={user.fulName}
                className="h-10 w-10 rounded-3xl mx-1"
              />

              <div className="mx-1"> {user.fullName.toUpperCase()} </div>
            </div>
            <button onClick={handleLogout}>Logout</button>

            <Link to="/createBlog">Create Blog</Link>
          </>
        ) : (
          <>
            <Link to="/signup">Create Account</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
