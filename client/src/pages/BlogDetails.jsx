import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
        }
      );

      console.log(res.data);

      setContent("");

      // Refresh comments
      fetchBlog();
    } catch (err) {
      console.log(err);
      alert("Unable to add comment.");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="text-center mt-20 text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-24 px-6 pb-10">

      {/* Cover Image */}
      <img
        src={`http://localhost:8000${blog.coverImageURL}`}
        alt={blog.title}
        className="w-[50vh] object-contain rounded-xl shadow-md"
      />

      {/* Title */}
      <h1 className="text-5xl font-bold text-[#283618] mt-8">
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
          <span className="font-semibold">
            {blog.createdBy?.fullName}
          </span>
        </p>
      </div>

      {/* Blog Body */}
      <div className="mt-8 text-lg leading-8 whitespace-pre-wrap text-gray-700">
        {blog.body}
      </div>

      {/* Comments */}
      <div className="mt-14">
        <h2 className="text-3xl font-bold mb-6">
          Comments
        </h2>

        {comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet.
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="border rounded-xl p-4 mb-4 shadow-sm bg-gray-50"
            >
              <h3 className="font-semibold text-[#283618]">
                {comment.createdBy?.fullName}
              </h3>

              <p className="mt-2 text-gray-700">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Add Comment */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">
          Leave a Comment
        </h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#dda15e]"
        />

        <button
          onClick={addComment}
          className="mt-4 bg-[#dda15e] hover:bg-[#bc8a4d] text-white px-6 py-3 rounded-lg transition"
        >
          Post Comment
        </button>
      </div>

    </div>
  );
}