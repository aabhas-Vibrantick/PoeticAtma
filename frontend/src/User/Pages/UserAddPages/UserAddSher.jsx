

import React, { useEffect, useRef, useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import JoditEditor from 'jodit-react';
function UserAddSher() {
  const nav = useNavigate();
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [sher, setSher] = useState("");
  const [image, setImage] = useState(null); // Changed "Image" to "image"
  const [allCategory, setAllCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [tag, setTag] = useState("");
  const [language, setLanguage] = useState("");
  useEffect(() => {
    apiServices.getall_sher_category().then((data) => {
      if (data.data.success) {
        setAllCategory(data.data.data);
      }
    });
  }, []);

  const handlesherData = async (e) => {
    e.preventDefault();

    if (!title || !sher || !categoryId || !image || !tag || !language) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("sher", sher);
    formData.append("Category_id", categoryId);
    formData.append("Image", image);
    formData.append("tag", tag);
    formData.append("language", language);
    try {
      const response = await apiServices.addsher(formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          nav("/user-profile");
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <main className="">
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col">
              <h2>Publish Sher</h2>
              <form className="mt-5" onSubmit={handlesherData}>
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

                {/* Category input */}
                <div className="form-group fs-5 mb-4">
                <label for="exampleFormControlInput1" className="form-label text-dark">Category</label>
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

                {/* sher input */}
                <div className="form-outline mb-4">
                <label for="exampleFormControlInput1" className="form-label text-dark">Sher</label>
                  {/* <textarea
                    className="form-control"
                    id="form6Example7"
                    rows="4"
                    placeholder="sher"
                    value={sher}
                    onChange={(e) => setSher(e.target.value)}
                  ></textarea> */}
                   <JoditEditor
                    ref={editor}
                    value={sher}
                    onChange={newContent => setSher(newContent)}
                  />
                </div>
{/* Tag input */}
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
                <div className="form-outline mb-4">
                  <label for="exampleFormControlInput1" className="form-label text-dark">Language</label>
                  <select className="form-select" aria-label="Default select example" value={language}
                    onChange={(e) => setLanguage(e.target.value)}>
                    <option selected>Select Language</option>
                    <option value="hindi">Hindi</option>
                    <option value="English">English</option>
                  </select>
                </div>
                {/* sher image */}
                <div className="mb-4">
                <label for="exampleFormControlInput1" className="form-label text-dark">Upload Image</label>
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

export default UserAddSher;
