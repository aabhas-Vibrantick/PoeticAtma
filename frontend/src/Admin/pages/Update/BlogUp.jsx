import React, { useEffect, useRef, useState } from "react";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import Select from "react-select";

function UpBlog() {
  const editor = useRef(null);
  const param = useParams();
  const nav = useNavigate();
  const id = param._id;

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [Image, setImage] = useState();
  const [allCategory, setAllCategory] = useState([]);
  const [Category_id, setBCategoryId] = useState("");
  const [tags, setTag] = useState("");
  const [allBlogData, setallBlogData] = useState(null);
  const [isFeatured, setIsFeatured] = useState("false");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const changeimage = (e) => {
    setImage(e.target.files[0]);
  };

  // Dropdown styles (non-transparent background)
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

  useEffect(() => {
    let data = { _id: id };

    // Fetch blog data
    apiServices
      .getsingleblog(data)
      .then((res) => {
        if (res.data.success) {
          const blogData = res.data.data;
          setTitle(blogData.title);
          setBlog(blogData.blog);
          setDescription(blogData.description);
          setBCategoryId(blogData.Category_id._id);
          setallBlogData(blogData);
          setTag(blogData.tags);
          setIsFeatured(blogData.isFeatured);
          setSelectedUserId(blogData.userId?._id || "");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });

    // Fetch categories
    apiServices.getallcategory().then((res) => {
      if (res.data.success) {
        setAllCategory(res.data.data);
      }
    });

    // Fetch all users
    apiServices.getalluser().then((res) => {
      if (res.data.success) {
        setAllUsers(res.data.data);
      }
    });
  }, [id]);

  const handleblogData = (x) => {
    x.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("blog", blog);
    formData.append("description", description);
    formData.append("Category_id", Category_id);
    formData.append("Image", Image);
    formData.append("_id", id);
    formData.append("tag", tags);
    formData.append("isFeatured", isFeatured);
    formData.append("userId", selectedUserId);

    apiServices
      .updateblog(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setTimeout(() => {
            nav("/admin/view-blog");
          }, 2000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      <main className="main-container adminbody">
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col article">
              <h2 className="text-dark">Update Blog</h2>
              <form className="mt-5">
                {/* Title */}
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

                {/* Category */}
                <div className="form-group fs-5 mb-4">
                  <label className="form-label text-dark">Category</label>
                  <select
                    className="form-select mb-2"
                    value={Category_id}
                    onChange={(e) => setBCategoryId(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {allCategory?.map((cat, index) => (
                      <option key={index} value={cat?._id}>
                        {cat?.Category_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Author (User) */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Select Author (User)</label>
                  <Select
                    options={allUsers.map((user) => ({
                      value: user._id,
                      label: user.name,
                    }))}
                    value={
                      allUsers.find((user) => user._id === selectedUserId)
                        ? {
                            value: selectedUserId,
                            label: allUsers.find(
                              (user) => user._id === selectedUserId
                            )?.name,
                          }
                        : null
                    }
                    onChange={(selected) =>
                      setSelectedUserId(selected?.value || "")
                    }
                    placeholder="Search or select user..."
                    isClearable
                    isSearchable
                    styles={customStyles}
                  />
                </div>

                {/* Description */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Description</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Blog Content */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Blog</label>
                  <JoditEditor
                    ref={editor}
                    className="text-dark"
                    value={blog}
                    onChange={(newContent) => setBlog(newContent)}
                  />
                </div>

                {/* Featured Checkbox */}
                <div className="form-group fs-5 mb-4 text-start">
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

                {/* Tags */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="#tag"
                    value={tags}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>

                {/* Image */}
                <div className="mb-4">
                  {allBlogData?.Image && (
                    <img
                      src={BASE_URL_IMG + allBlogData?.Image}
                      alt="uprofile"
                      className="img-fluid"
                      style={{ height: "150px" }}
                    />
                  )}
                  <input
                    className="form-control"
                    type="file"
                    onChange={changeimage}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary-1 btn-block mb-4"
                  onClick={handleblogData}
                >
                  Save Changes
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

export default UpBlog;
