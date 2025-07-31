import React, { useEffect, useRef, useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

function UserAddProse() {
  const nav = useNavigate();
  const editor = useRef(null);

  const [title, setTitle] = useState("");
  const [prose, setProse] = useState("");
  const [image, setImage] = useState(null);
  const [allCategory, setAllCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [tag, setTag] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    apiServices.getall_prose_category().then((data) => {
      if (data.data.success) {
        setAllCategory(data.data.data);
      }
    });
  }, []);

  const handleproseData = async (e) => {
    e.preventDefault();
    if (!title || !prose || !categoryId || !image || !tag || !language) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("prose", prose);
    formData.append("Category_id", categoryId);
    formData.append("Image", image);
    formData.append("tag", tag);
    formData.append("language", language);

    try {
      const response = await apiServices.addprose(formData);
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
                  <h3 className="mb-4 text-center text-primary">Publish Your Prose</h3>
                  <form onSubmit={handleproseData}>
                    {/* Title */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Title <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your prose title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Category <span className="text-danger">*</span></label>
                      <select
                        className="form-select"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                      >
                        <option value="">-- Select Category --</option>
                        {allCategory.map((cat, index) => (
                          <option key={index} value={cat._id}>
                            {cat.Category_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Prose Editor */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Prose <span className="text-danger">*</span></label>
                      <JoditEditor
                        ref={editor}
                        value={prose}
                        onChange={(newContent) => setProse(newContent)}
                      />
                    </div>

                    {/* Tag */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Tag <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="#Tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                      />
                    </div>

                    {/* Language */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Language <span className="text-danger">*</span></label>
                      <select
                        className="form-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="">-- Select Language --</option>
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>
                      </select>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Upload Image <span className="text-danger">*</span></label>
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
                        Publish Prose
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserAddProse;
