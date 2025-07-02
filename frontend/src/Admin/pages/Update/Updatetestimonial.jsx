
import React, { useEffect, useState } from "react";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function Updatetestimonial() {
  const nav = useNavigate();
  const param = useParams()
  const id = param._id
  const [testData, settestData] = useState()
  const [UserName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [Image, setImage] = useState(null); // Changed "Image" to "image"

  const changeimage = (e) => {
    // // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    let data = {
      _id: id
    }
    apiServices.getsingleTestimonial(data).then(data => {
      if (data.data.success) {
        settestData(data.data.data)
        setUserName(data.data.data.UserName)
        setDescription(data.data.data.description)
       
   
      }
      else {
        toast.error(data.data.message)
      }
    }).catch(err => {
      // // console.log(err)
      // toast.error("Something Went wrong")
    })


  }, []);

  const handletestimonialupdate = async (e) => {
    e.preventDefault();

    // if (!title || !author || !description || !testimonialcategory || !Image || !Testimonial_Price || !Testimonial_Quantity || !Payment_option) {
    //   toast.error("Please fill in all fields.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("UserName", UserName);
    formData.append("description", description);
    formData.append("Image", Image);
    formData.append("_id",id)
  

    try {
      const response = await apiServices.updateTestimonial(formData);
      if (response.data.success) {
        toast.success(response.data.message);
        // // console.log(response)
        setTimeout(() => {
          nav("/admin/testimonial-list");
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <main className="main-container adminbody">
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col">
              <h2>Add Testimonial</h2>
              <form className="mt-5" onSubmit={handletestimonialupdate}>
                {/* Title input */}
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="Title"
                    value={UserName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
       
                {/* prose input */}
                <div className="form-outline mb-4">
                  <textarea
                    className="form-control"
                    id="form6Example7"
                    rows="4"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* prose image */}
                <div className="mb-4">
                  <img
                    src={BASE_URL_IMG + testData?.Image}
                    alt="uprofile"
                    className="img-fluid updateimages"
                  />
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    accept="Image/*"
                    onChange={(e) => {
                      changeimage(e);
                    }}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary-1 btn-block mb-4"
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

export default Updatetestimonial;
