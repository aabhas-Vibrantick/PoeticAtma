import React, { useEffect, useRef, useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

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
        setTimeout(() => nav("/user-profile"), 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <main className="bg-light py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <h3 className="mb-4 text-center text-primary">
                    Publish Blog
                  </h3>
                  <form onSubmit={handleblogData}>
                    {/* Category */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Category <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                      >
                        <option value="">-- Select Category --</option>
                        {allCategory.map((cat, index) => (
                          <option key={index} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter blog title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Short Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Enter a brief description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Tag */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Tags <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter comma-separated tags (e.g., poetry,life,freedom)"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                      />
                    </div>

                    {/* Blog Content */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Blog Content <span className="text-danger">*</span>
                      </label>
                      <JoditEditor
                        ref={editor}
                        value={blog}
                        onChange={(newContent) => setBlog(newContent)}
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Cover Image <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary px-4">
                        Publish Blog
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" />
      </main>
    </>
  );
}

export default UserAddBlog;
