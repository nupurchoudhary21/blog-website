import Card from "../components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog`);
        setBlogs(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FFF4EA] pt-24 px-8">
        <h1 className="text-4xl text-[#C96868] text-center mb-12 font-bold">
          Latest Blogs
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs.map((blog) => (
            <Card key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
}
