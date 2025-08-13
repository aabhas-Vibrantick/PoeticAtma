import React, { useEffect, useRef, useState } from "react";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import Select from "react-select";

function UpProse() {
  const editor = useRef(null);
  const param = useParams();
  const nav = useNavigate();
  const id = param._id;

  const [title, setTitle] = useState("");
  const [prose, setProse] = useState("");
  const [image, setImage] = useState(null);
  const [tag, setTag] = useState("");
  const [language, setLanguage] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [allProseData, setAllProseData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const changeImage = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    // Fetch single prose data
    let requestData = { _id: id };
    apiServices
      .getsingleprose(requestData)
      .then((response) => {
        if (response.data.success) {
          const proseData = response.data.data;
          setAllProseData(proseData);
          setTitle(proseData.title || "");
          setProse(proseData.prose || "");
          setTag(proseData.tags || "");
          setLanguage(proseData.language || "");
          setCategoryId(proseData.Category_id?._id || "");
          setSelectedUserId(proseData.userId?._id || "");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong while fetching prose data");
      });

    // Fetch all categories
    apiServices
      .getall_prose_category()
      .then((response) => {
        if (response.data.success) {
          setAllCategory(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong while fetching categories");
      });

    // Fetch all users
    apiServices
      .getalluser()
      .then((response) => {
        if (response.data.success) {
          setAllUsers(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong while fetching users");
      });
  }, [id]);

  const handleProseData = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("prose", prose);
    formData.append("Category_id", categoryId);
    formData.append("userId", selectedUserId);
    if (image) {
      formData.append("Image", image);
    }
    formData.append("tag", tag);
    formData.append("language", language);
    formData.append("_id", id);

    apiServices
      .updateprose(formData)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setTimeout(() => {
            nav("/admin/view-prose");
          }, 2000);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
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
      <main className="main-container adminbody">
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col article">
              <h2 className="text-dark">Update Prose</h2>
              <form className="mt-5" onSubmit={handleProseData}>
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

                {/* Author */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Select Author (User)</label>
                  <Select
                    options={allUsers.map((user) => ({
                      value: user._id,
                      label: user.name,
                    }))}
                    value={
                      allUsers
                        .filter((user) => user._id === selectedUserId)
                        .map((user) => ({
                          value: user._id,
                          label: user.name,
                        }))[0] || null
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

                {/* Category */}
                <div className="form-group fs-5 mb-4">
                  <label className="form-label text-dark">Category</label>
                  <select
                    className="form-select mb-2"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {allCategory?.map((data) => (
                      <option key={data._id} value={data._id}>
                        {data.Category_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Prose content */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Prose</label>
                  <JoditEditor
                    ref={editor}
                    value={prose}
                    className="text-dark"
                    onChange={(newContent) => setProse(newContent)}
                  />
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

                {/* Language */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Language</label>
                  <select
                    className="form-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="">Select Language</option>
                    <option value="hindi">Hindi</option>
                    <option value="English">English</option>
                  </select>
                </div>

                {/* Image */}
                <div className="mb-4">
                  {allProseData?.Image && (
                    <img
                      src={BASE_URL_IMG + allProseData.Image}
                      alt="Prose"
                      className="img-fluid"
                      style={{ height: "150px" }}
                    />
                  )}
                  <input
                    className="form-control"
                    type="file"
                    onChange={changeImage}
                  />
                </div>

                {/* Submit */}
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

export default UpProse;
