import { Link } from "react-router-dom";

const Card = ({ blog }) => {
  return (
    <div className="bg-[#FFF4EA] rounded-xl overflow-hidden border-[#C96868] border-2 mb-5">
      <img
        src={`${import.meta.env.VITE_API_URL}${blog.coverImageURL}`}
        alt={blog.title}
        className="w-full mt-4 py-3 px-3 h-56 object-contain"
      />

      <div className="p-5 flex flex-col">
        <h2 className="text-2xl font-semibold text-[#C96868] font-bold line-clamp-2 text-center">
          {blog.title.toUpperCase()}
        </h2>

        <Link
          to={`/blog/${blog._id}`}
          className="mx-auto items-center mt-5 w-fit bg-[#C96868] text-white px-5 py-2 rounded-lg hover:bg-[#FFF4EA] border-[#C96868] border-2 hover:text-[#C96868] transition"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default Card;
