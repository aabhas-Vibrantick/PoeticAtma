import React, { useEffect, useRef } from "react";
import { useState } from "react";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from 'jodit-react';
import Select from "react-select";

function UpShayari() {
  const editor = useRef(null);
  const param = useParams();
  const nav = useNavigate();
  const id = param._id;

  const [title, setTitle] = useState("");
  const [shayari, setShayari] = useState("");
  const [image, setImage] = useState(null);
  const [tag, setTag] = useState("");
  const [language, setLanguage] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [allShayariData, setAllShayariData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const changeImage = (e) => {
    setImage(e.target.files[0]);
  };

  // Fetch shayari data, users, and categories
  useEffect(() => {
    // Fetch single shayari data
    let data = {
      _id: id
    };
    apiServices.getsingleshayari(data).then(response => {
      if (response.data.success) {
        const shayariData = response.data.data;
        setAllShayariData(shayariData);
        setTitle(shayariData.title || "");
        setShayari(shayariData.shayari || "");
        setLanguage(shayariData.language || "");
        setTag(shayariData.tags || "");
        setCategoryId(shayariData.Category_id?._id || "");
        setSelectedUserId(shayariData.userId?._id || "");
      } else {
        toast.error(response.data.message);
      }
    }).catch(err => {
      toast.error("Something went wrong while fetching shayari data");
    });

    // Fetch all users
    apiServices.getalluser().then(response => {
      if (response.data.success) {
        setAllUsers(response.data.data); 
      } else {
        toast.error(response.data.message);
      }
    }).catch(err => {
      toast.error("Something went wrong while fetching users");
    });

    // Fetch all categories
    apiServices.getall_shayari_category().then(response => {
      if (response.data.success) {
        setAllCategory(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    }).catch(err => {
      toast.error("Something went wrong while fetching categories");
    });
  }, [id]);

  const handleShayariData = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("shayari", shayari);
    formData.append("Category_id", categoryId);
    formData.append("userId", selectedUserId);
    if (image) {
      formData.append("Image", image);
    }
    formData.append("tag", tag);
    formData.append("language", language);
    formData.append("_id", id);

    apiServices
      .updateshayari(formData)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setTimeout(() => {
            nav("/admin/view-shayari");
          }, 2000);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
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
              <h2 className="text-dark">Update Shayari</h2>
              <form className="mt-5" onSubmit={handleShayariData}>
                {/* Title input */}
                <div className="form-outline mb-4">
                  <label htmlFor="form6Example3" className="form-label text-dark">Title</label>
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Author selection */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">
                    Select Author (User)
                  </label>
                  <Select
                    options={allUsers.map((user) => ({
                      value: user._id,
                      label: user.name,
                    }))}
                    value={allUsers
                      .filter(user => user._id === selectedUserId)
                      .map(user => ({
                        value: user._id,
                        label: user.name
                      }))[0] || null}
                    onChange={(selected) => setSelectedUserId(selected?.value || "")}
                    placeholder="Search or select user..."
                    isClearable
                    isSearchable
                    styles={customStyles}
                  />
                </div>

                {/* Category */}
                <div className="form-group fs-5 mb-4">
                  <label htmlFor="categorySelect" className="form-label text-dark">Category</label>
                  <select
                    id="categorySelect"
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

                {/* Shayari input */}
                <div className="form-outline mb-4">
                  <label htmlFor="shayariEditor" className="form-label text-dark">Shayari</label>
                  <JoditEditor
                    ref={editor}
                    value={shayari}
                    className="text-dark"
                    onChange={(newContent) => setShayari(newContent)}
                  />
                </div>

                {/* Tag input */}
                <div className="form-outline mb-4">
                  <label htmlFor="form6Example3" className="form-label text-dark">Tag</label>
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="#tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>

                {/* Language selection */}
                <div className="form-outline mb-4">
                  <label htmlFor="languageSelect" className="form-label text-dark">Language</label>
                  <select
                    id="languageSelect"
                    className="form-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="">Select Language</option>
                    <option value="hindi">Hindi</option>
                    <option value="English">English</option>
                  </select>
                </div>

                {/* Shayari image */}
                <div className="mb-4">
                  {allShayariData?.Image && (
                    <img
                      src={BASE_URL_IMG + allShayariData.Image}
                      alt="Shayari image"
                      className="img-fluid"
                      style={{ height: "150px" }}
                    />
                  )}
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={changeImage}
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

export default UpShayari;