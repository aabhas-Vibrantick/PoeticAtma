import React, { useEffect, useRef, useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import JoditEditor from 'jodit-react';

function UserAddBlog() {
  const nav = useNavigate();
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blog, setBlog] = useState("");
  const [image, setImage] = useState(null); 
  const [allCategory, setAllCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    apiServices.getallcategory().then((data) => {
      if (data.data.success) {
        setAllCategory(data.data.data);
      }
    });
  }, []);

  const handleblogData = async (e) => {
    e.preventDefault();

    if (!title || !blog || !categoryId || !image || !tag || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("blog", blog);
    formData.append("Category_id", categoryId);
    formData.append("Image", image);
    formData.append("tag", tag);

    try {
      const response = await apiServices.addblog(formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          nav("/user-profile");
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <main className=" ">
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col">
              <h2>Publish Blog</h2>
              <form className="mt-5" onSubmit={handleblogData}>

                {/* Category input */}

                <div className="form-group fs-5 mb-4">
                  <label for="exampleFormControlInput1" className="form-label text-dark">Select Category</label>
                  <select
                    className="form-select mb-2"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    aria-label=".form-select-lg example"
                  >
                    <option value="">Select Category</option>
                    {allCategory.map((data, index) => (
                      <option key={index} value={data._id}>
                        {data.Category_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Title input */}
                <div className="form-outline mb-4">
                  <label for="exampleFormControlInput1" className="form-label text-dark">Title</label>
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-4">
                  <label for="exampleFormControlInput1" className="form-label text-dark">Description </label>
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                {/* Blog input */}
                <div className="form-outline mb-4">
                  <label for="exampleFormControlInput1" className="form-label text-dark">Blog content </label>
                  
                  <JoditEditor
                    ref={editor}
                    value={blog}
                    className="text-dark"
                    onChange={newContent => setBlog(newContent)}
                  />
                </div>

              

                {/* tag input */}
                <div className="form-outline mb-4">
                  <label for="exampleFormControlInput1" className="form-label text-dark">Tag</label>
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="#tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>
                {/* Blog image */}
                <div className="mb-4">
                <label for="exampleFormControlInput1" className="form-label text-dark">Upload Image </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary-1 btn-block mb-4"
                >
                  Post
                </button>
              </form>
             
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default UserAddBlog;
