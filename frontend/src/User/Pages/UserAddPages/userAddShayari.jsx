import React, { useEffect, useRef, useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

function UserAddShayari() {
  const nav = useNavigate();
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [shayari, setShayari] = useState("");
  const [image, setImage] = useState(null);
  const [allCategory, setAllCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [tag, setTag] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    apiServices.getall_shayari_category().then((data) => {
      if (data.data.success) {
        setAllCategory(data.data.data);
      }
    });
  }, []);

  const handleShayariData = async (e) => {
    e.preventDefault();

    if (!title || !shayari || !categoryId || !image || !tag || !language) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("shayari", shayari);
    formData.append("Category_id", categoryId);
    formData.append("Image", image);
    formData.append("tag", tag);
    formData.append("language", language);

    try {
      const response = await apiServices.addshayari(formData);
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
                  <h3 className="mb-4 text-center text-primary">Publish Shayari</h3>
                  <form onSubmit={handleShayariData}>

                    {/* Title */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Title <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter title"
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

                    {/* Shayari */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Shayari <span className="text-danger">*</span></label>
                      <JoditEditor
                        ref={editor}
                        value={shayari}
                        onChange={(newContent) => setShayari(newContent)}
                      />
                    </div>

                    {/* Tag */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">Tags <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="#love #life"
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
                      <label className="form-label fw-semibold">Cover Image <span className="text-danger">*</span></label>
                      <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary px-4">
                        Publish Shayari
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

export default UserAddShayari;
