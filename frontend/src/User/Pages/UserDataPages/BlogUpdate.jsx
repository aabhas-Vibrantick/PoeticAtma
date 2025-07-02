import React, { useEffect } from "react";
import { useState } from "react";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from 'jodit-react';
import { useRef } from "react";

function UpdateBlog() {
  const editor = useRef(null);
  const param = useParams()
  const nav = useNavigate()
  const id = param._id
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [blog, setBlog] = useState();
  const [Image, setImage] = useState();
  const [allCategory, setAllCategory] = useState();
  const [Category_id, setBCategoryId] = useState();
  const [tags, setTag] = useState();
  const [allBlogData, setallBlogData] = useState();
  
  const changeimage = (e) => {
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  // ---------------Add blog start----------

  useEffect(() => {
    let data = {
      _id: id
    }

    apiServices.getsingleblog(data).then(data => {
      // // console.log(data)
      if (data.data.success) {
        setTitle(data.data.data.title)
        setBlog(data.data.data.blog)
        setDescription(data.data.data.description)
        setTag(data.data.data.tags)
        setallBlogData(data.data.data)
        setBCategoryId(data.data.data.Category_id._id)
      }
      else {
        toast.error(data.data.message)
      }
    }).catch(err => {
      // // console.log(err)
      // toast.error("Something Went wrong")
    })

    apiServices.getallcategory().then((data) => {
      if (data.data.success) {
        setAllCategory(data.data.data);
        // // console.log("all categoryies =>", data.data.data);
      }
    });
  }, []);

  let data = {
    _id: id
  }
  const handleblogData = (x) => {
    // // console.log(x)
    x.preventDefault();
    let data = new FormData();
    data.append("title", title);
    data.append("blog", blog);
    data.append("description", description);
    data.append("Category_id", Category_id);
    data.append("Image", Image);
    data.append("_id", id)
    data.append("tags", tags);
    apiServices.updateblog(data)
      .then((data) => {
        // // console.log(data);
        if (data.data.success) {
          toast.success(data.data.message);
          setTimeout(() => {
            nav("/user-profile")
          }, 2000)
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        // // console.log(err);
        toast.error("Something went wrong");
      });
  };
  // ---------------Add blog start----------
  return (
    <>
      <main className="main-container adminbody">

        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col">
              <h2>Update Blog</h2>
              <form className="mt-5"   >
                {/* <!-- Title input --> */}
                <div className="form-outline mb-4">
                  <label for="exampleFormControlInput1" className="form-label text-dark">Title </label>
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>

                {/* <!--  Category --> */}
                <div className="form-group  fs-5 mb-4">
                  <label for="end-time text-dark" className="form-label text-dark ">Category</label>
                  <select
                    className="form-select  mb-2"
                    value={Category_id}
                    onChange={(e) => {
                      setBCategoryId(e.target.value);
                    }}
                    aria-label=".form-select-lg example"
                  >
                    <option selected>Select Category</option>
                    {allCategory?.map((data, index) => (
                      <option key={index} value={data?._id}>
                        {data?.Category_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <!-- blog input --> */}
                <div className="form-outline mb-4">
                  <label for="exampleFormControlInput1" className="form-label text-dark">Description </label>
                  <textarea
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-outline mb-4">
                  {/* <textarea
                    className="form-control"
                    id="form6Example7"
                    rows="4"
                    placeholder="Write your blog Here"
                    value={blog}
                    onChange={(e) => {
                        setBlog(e.target.value);
                    }}
                  ></textarea> */}
                  <label for="exampleFormControlInput1" className="form-label text-dark">Blog </label>
                  <JoditEditor
                    ref={editor}
                    value={blog}
                    className="text-dark"
                    onChange={newContent => setBlog(newContent)}
                  />
                </div>
                <div className="form-outline mb-4">
                  <label for="exampleFormControlInput1" className="form-label text-dark">Tag</label>
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="#tag"
                    value={tags}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>
                {/* <!-- blog image --> */}
                <div className="mb-4">
                  <img
                    src={BASE_URL_IMG + allBlogData?.Image}
                    alt="uprofile"
                    className="img-fluid"
                    style={{ height: "150px" }}
                  />
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={(e) => {
                      changeimage(e);
                    }}
                  />
                </div>

                {/* <!-- Submit button --> */}
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

export default UpdateBlog;
