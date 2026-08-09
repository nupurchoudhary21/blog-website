// import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails"; // adjust path if needed
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/blog/:id" element={<BlogDetails />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createBlog" element={<CreateBlog />} />
    </Routes>
  );
}
