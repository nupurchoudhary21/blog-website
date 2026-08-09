import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

export default function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  // Fetch blog and comments
  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/blog/${id}`);

      console.log(res.data);

      setBlog(res.data.blog);
      setComments(res.data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  // Add Comment
  const addComment = async () => {
    if (!content.trim()) {
      alert("Please write a comment first.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8000/blog/comment/${id}`,
        {
          content,
        },
        {
          withCredentials: true,
        },
      );

      console.log(res.data);

      setContent("");

      // Refresh comments
      fetchBlog();
    } catch (err) {
      console.log(err);
      alert("Please login to add Comments.");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="text-center mt-20 text-2xl font-semibold">Loading...</div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-full bg-[#FFF4EA]">
        <div className="max-w-4xl pb-10 pt-15 px-6 mx-auto">
          {/* Cover Image */}
          <img
            src={`http://localhost:8000${blog.coverImageURL}`}
            alt={blog.title}
            className="w-[55vh] object-contain rounded-xl shadow-md border-[#C96868] p-3 border-3"
          />

          {/* Title */}
          <h1 className="text-5xl font-bold text-[#C96868] mt-8">
            {blog.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 mt-5">
            <img
              src="/user.jpg"
              alt="User"
              className="w-12 h-12 rounded-full object-cover"
            />

            <p className="text-gray-600 text-lg">
              By{" "}
              <span className="font-semibold">{blog.createdBy?.fullName}</span>
            </p>
          </div>

          {/* Blog Body */}
          <div className="mt-8 text-lg leading-8 whitespace-pre-wrap text-gray-700">
            {blog.body}
          </div>

          {/* Comments */}
          <div className="mt-14">
            <h2 className="text-3xl font-bold mb-6 text-[#C96868]">Comments</h2>

            {comments.length === 0 ? (
              <p className="text-gray-500 text-[#C96868]">No comments yet.</p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="border-2 border-[#C96868] rounded-xl p-4 mb-4 shadow-sm bg-[#fce4d2]"
                >
                  <h3 className="font-semibold text-[#283618]">
                    {comment.createdBy?.fullName}
                  </h3>

                  <p className="mt-2 text-gray-700">{comment.content}</p>
                </div>
              ))
            )}
          </div>

          {/* Add Comment */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-[#C96868]">
              Leave a Comment
            </h2>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment..."
              rows={4}
              className="w-full border-2 border-[#C96868] rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#C96868]"
            />

            <button
              onClick={addComment}
              className="mt-4 bg-[#FFF4EA] hover:bg-[#fce4d2] text-[#C96868] border-[#C96868] border-2 px-6 py-3 rounded-lg transition duration-200"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
