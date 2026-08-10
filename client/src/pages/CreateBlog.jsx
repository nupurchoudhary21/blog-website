import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Please enter both title and blog content.");
      return;
    }

    if (!coverImage) {
      alert("Please select a cover image ");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("body", body);
      formData.append("coverImage", coverImage);

      const res = await axios.post("http://localhost:8000/blog", formData, {
        withCredentials: true,
      });
      console.log(res.data);

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Unable to create blog");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-full h-[90vh] bg-[#FFF4EA]">
        <div className="max-w-3xl mt-16 bg-[#FFF4EA] mx-auto p-3 rounded-xl">
          <h1 className="text-xl font-bold mb-8 text-center text-[#C96868]">
            Create Blog
          </h1>

          <form onSubmit={handleSubmit}>
            <label className="block font-semibold mb-2 text-[#C96868]">
              Blog Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the blog title"
              className="w-full px-4 py-3 rounded-lg
                         bg-[#FFF4EA] text-gray-800
                         border-2 border-[#C96868]
                         outline-none
                         focus:border-[#C96868]
                         placeholder:text-gray-400"
            />

            <label className="block font-semibold mb-2 text-[#C96868]">
              Cover Image
            </label>

            <input
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="w-full px-4 py-3 rounded-lg
                         bg-[#FFF4EA] text-gray-800
                         border-2 border-[#C96868]
                         outline-none
                         focus:border-[#C96868]
                         placeholder:text-gray-400"
            />

            <label className="block font-semibold mb-2 text-[#C96868]">
              Blog Content
            </label>

            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              placeholder="Write your blog here....."
              className="w-full px-4 py-3 rounded-lg
                         bg-[#FFF4EA] text-gray-800
                         border-2 border-[#C96868]
                         outline-none
                         focus:border-[#C96868]
                         placeholder:text-gray-400"
            />

            <button
              className="mt-4 bg-[#FFF4EA] 
            hover:bg-[#fce4d2] text-[#C96868] 
            border-[#C96868] border-2 px-6 py-3 rounded-lg 
            transition duration-200"
            >
              Publish Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
