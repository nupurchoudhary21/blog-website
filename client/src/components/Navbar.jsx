import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
      setMenuOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#C96868] shadow-md z-50">
      <div className="flex items-center justify-between h-16 px-4 md:px-8 text-white">

        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Blogify Logo"
            className="h-10 w-10 rounded-lg"
          />

          <div className="text-2xl font-bold">
            Blogify
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-lg">

          <Link
            to="/"
            className="hover:text-gray-200 transition"
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                to="/createBlog"
                className="hover:text-gray-200 transition"
              >
                Create Blog
              </Link>

              <div className="flex items-center gap-2">
                <img
                  src={user.profileImageURL}
                  alt={user.fullName}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <span>
                  {user.fullName.toUpperCase()}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="hover:text-gray-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="hover:text-gray-200 transition"
              >
                Create Account
              </Link>

              <Link
                to="/login"
                className="hover:text-gray-200 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#C96868] border-t border-white/20 px-6 py-5">

          <div className="flex flex-col gap-5 text-lg">

            <Link
              to="/"
              onClick={closeMenu}
              className="hover:text-gray-200 transition"
            >
              Home
            </Link>

            {user ? (
              <>
                {/* User */}
                <div className="flex items-center gap-3">
                  <img
                    src={user.profileImageURL}
                    alt={user.fullName}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <span>
                    {user.fullName.toUpperCase()}
                  </span>
                </div>

                <Link
                  to="/createBlog"
                  onClick={closeMenu}
                  className="hover:text-gray-200 transition"
                >
                  Create Blog
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left hover:text-gray-200 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="hover:text-gray-200 transition"
                >
                  Create Account
                </Link>

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="hover:text-gray-200 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}