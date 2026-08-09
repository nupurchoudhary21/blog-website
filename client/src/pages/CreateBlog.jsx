
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function CreateBlog(){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [coverImage, setCoverImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        if(!title.trim() || !body.trim()){
            alert("Please enter both title and blog content.");
            return;
        }

        if(!coverImage){
            alert("Please select a cover image ");
            return;
        }

        try{
            const formData = new FormData();

            formData.append("title",title);
            formData.append("body", body);
            formData.append("coverImage", coverImage);

            const res = await axios.post(
                "http://localhost:8000/blog",
                formData,{
                    withCredentials: true,
                }
            );
            console.log(res.data);

            navigate("/");
        } catch(err){
            console.log(err);
            alert("Unable to create blog");
        }
         
    };


    return(
        <>
        <div className="max-w-3xl mx-auto p-3 mt-10 rounded-xl">

            <h1 className="text-xl font-bold mb-8 text-center">
                Create Blog
            </h1>

             <form onSubmit={handleSubmit}>

             <label className="block font-semibold mb-2">
                Blog Title
             </label>
            
             <input
             type= "text"
             value={title}
             onChange={(e)=>setTitle(e.target.value)}
             placeholder="Enter the blog title"
             className="p-4 w-full border rounded-lg" />

            <label className="block font-semibold mb-2">
                Cover Image
            </label>

             <input 
             type="file"
             onChange={(e)=>setCoverImage(e.target.files[0])} 
             className="mb-6"
             />


             <label className="block font-semibold mb-2">
               Blog Content
             </label>

             <textarea
             value={body}
             onChange={(e)=>setBody(e.target.value)} 
             rows={10}
             placeholder="Write your blog here....."
             className="w-full p-4 border rounded-lg mb-6"
             />

             <button 
             className="w-full py-3 rounded-lg">
                Publish Blog
             </button>  

             </form>

        </div>
        </>
    )
} 