import { Link } from "react-router-dom";

const Card = ({ blog }) => {
  return (
    <div className="bg-[#FBEFEF] rounded-xl overflow-hidden border-[#C5B3D3] border-2 mb-5">

      <img
        src={`http://localhost:8000${blog.coverImageURL}`}
        alt={blog.title}
        className="w-full mt-4 py-3 px-3 h-56 object-contain"
      />

      <div className="p-5 flex flex-col">

        <h2 className="text-2xl font-semibold text-[#9B7EBD] font-bold line-clamp-2 text-center">
          {blog.title}
        </h2>

        <Link
          to={`/blog/${blog._id}`}
          className="mx-auto items-center mt-5 w-fit bg-[#C5B3D3] text-white px-5 py-2 rounded-lg hover:bg-[#30191E] transition"
        >
          View
        </Link>

      </div>
    </div>
  );
};

export default Card;
