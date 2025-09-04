import React, { useEffect, useRef, useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import Select from "react-select";

function AddBlog() {
  const nav = useNavigate();
  const editor = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blog, setBlog] = useState("");
  const [image, setImage] = useState(null);
  const [allCategory, setAllCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [isFeatured, setIsFeatured] = useState("false");
  const [tag, setTag] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    apiServices.getallcategory().then((data) => {
      if (data.data.success) {
        setAllCategory(data.data.data);
      }
    });

    apiServices.getalluser().then((res) => {
      if (res.data.success) {
        setAllUsers(res.data.data);
      }
    });
  }, []);

  const handleblogData = async (e) => {
    e.preventDefault();

    if (!title || !blog || !categoryId) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("blog", blog);
    formData.append("Category_id", categoryId);
    formData.append("isFeatured", isFeatured);
    formData.append("userId", selectedUserId);

    if (image) {
      formData.append("Image", image);
    }
    if (tag) {
      formData.append("tag", tag);
    }

    try {
      const response = await apiServices.addblog(formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          nav("/admin/view-blog");
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // ✅ Same editor config as AddShayari
  const config = {
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    defaultActionOnPaste: "insert_clear_html",
    preserveWhiteSpace: true,
    cleanHTML: {
      removeTags: ["script", "style", "img", "video", "audio"],
      removeAttrs: ["style", "class", "width", "height"],
    },
    style: {
      color: "#000000",
      backgroundColor: "#ffffff",
    },
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "14px",
      color: "#212529",
      minHeight: "38px",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "14px",
      color: "#212529",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#007bff"
        : state.isFocused
        ? "#e9ecef"
        : "#ffffff",
      color: state.isSelected ? "#fff" : "#212529",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#212529",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6c757d",
    }),
  };

  return (
    <>
      <style>{`.jodit-wysiwyg {
        white-space: pre-wrap !important;
      }`}</style>

      <main className="main-container adminbody">
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col article">
              <h2 className="text-dark">Add Blog</h2>
              <form className="mt-5" onSubmit={handleblogData}>
                {/* Category input */}
                <div className="form-group fs-5 mb-4">
                  <label className="form-label text-dark">Category</label>
                  <select
                    className="form-select mb-2"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {allCategory.map((data, index) => (
                      <option key={index} value={data._id}>
                        {data.Category_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">
                    Select Author (User)
                  </label>
                  <Select
                    options={allUsers.map((user) => ({
                      value: user._id,
                      label: user.name,
                    }))}
                    onChange={(selected) =>
                      setSelectedUserId(selected?.value || "")
                    }
                    placeholder="Search or select user..."
                    isClearable
                    isSearchable
                    styles={customStyles}
                  />
                </div>

                {/* Title input */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Description</label>
                  <textarea
                    className="form-control"
                    placeholder=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Blog editor */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Blog Content</label>
                  <JoditEditor
                    ref={editor}
                    value={blog}
                    config={config}
                    onChange={(newContent) => setBlog(newContent)}
                    onPaste={(event) => {
                      event.preventDefault();
                      const text = (
                        event.clipboardData || window.clipboardData
                      ).getData("text/plain");
                      document.execCommand("insertText", false, text);
                    }}
                  />
                </div>

                {/* Featured */}
                <div className="form-group fs-5 mb-4 text-start ">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={isFeatured === "true"}
                    onChange={(e) =>
                      setIsFeatured(e.target.checked ? "true" : "false")
                    }
                  />
                  <label className="form-label text-dark mx-2">
                    Is Featured Blog?
                  </label>
                </div>

                {/* Tag */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="#tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>

                {/* Image upload */}
                <div className="mb-4">
                  <label className="form-label text-dark">Upload Image</label>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  {image && (
                    <div className="mt-3">
                      <p className="mb-1 fw-bold">Image Preview:</p>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>

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

export default AddBlog;
