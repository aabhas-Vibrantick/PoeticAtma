import React, { useEffect } from "react";
import { useState } from "react";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from 'jodit-react';
import { useRef } from "react";
function UpSher() {
  const editor = useRef(null);
  const param = useParams()
  const nav = useNavigate()
  const id = param._id
 
  const [title, setTitle] = useState();
  const [sher, setSher] = useState();
  const [Image, setImage] = useState();
  const [allCategory, setAllCategory] = useState();
  const [categoryId, setCategoryId] = useState();
  const [tag, setTag] = useState();
  const [language, setLanguage] = useState();
  const [allSherData, setallSherData] = useState();
  const changeimage = (e) => {
    // // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  
  // ---------------Add sher start----------

  useEffect(() => {
    let data={
      _id: id
    }
    apiServices.getsinglesher(data).then(data=>{
      if(data.data.success){
        setallSherData(data.data.data)
        setTitle(data.data.data.title)
        setSher(data.data.data.sher)
        setTag(data.data.data.tags)
        setLanguage(data.data.data.language)
        setCategoryId(data.data.data.Category_id._id)
      }
      else{
        toast.error(data.data.message)
      }
    }).catch(err=>{
      // // console.log(err)
      // toast.error("Something Went wrong")
    })

    apiServices.getall_sher_category().then((data) => {
      if (data.data.success) {
        setAllCategory(data.data.data);
        // // console.log("all categoryies =>", data.data.data);
      }
    });
  }, []);

  let data={
    _id: id
}
  const handlesherData = (x) => {  
    x.preventDefault();
    let data = new FormData();
    data.append("title", title);
    data.append("sher", sher);
    data.append("Category_id", categoryId);
    data.append("Image", Image);
    data.append("tag", tag);
    data.append("language", language);
    data.append("_id",id)
    apiServices
      .updatesher(data)
      .then((data) => {
        // // console.log(data);
        if (data.data.success) {
          toast.success(data.data.message);
          setTimeout(()=>{
            nav("/admin/view-sher")
          },2000)
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        // // console.log(err);
        toast.error("Something went wrong");
      });
  };
  // ---------------Add sher start----------
  return (
    <>
      <main className="main-container adminbody">
        
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col article">
              <h2 className="text-dark">Update Sher</h2>
              <form className="mt-5" >
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
                <label for="exampleFormControlInput1" className="form-label text-dark">Category </label>
                  <select
                    className="form-select  mb-2"
                    value={categoryId}
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                    }}
                    
                  >
                    <option selected aria-required>Select Category</option>
                    {allCategory?.map((data, index) => (
                      <option key={index} value={data?._id} >
                        {data?.Category_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <!-- sher input --> */}
                <div className="form-outline mb-4">
                
                    <label for="exampleFormControlInput1" className="form-label text-dark">Sher </label>
                  <JoditEditor
                    ref={editor}
                    value={sher}
                    className="text-dark"
                    onChange={newContent => setSher(newContent)}
                  />
                </div>
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
                {/* <!-- sher image --> */}
                <div className="mb-4">
                <img
                              src={BASE_URL_IMG + allSherData?.Image}
                              alt="uprofile"
                              className="img-fluid"
                              style={{height:"150px"}}
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
                  onClick={handlesherData}
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

export default UpSher;
