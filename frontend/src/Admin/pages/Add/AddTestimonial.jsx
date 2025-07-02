
import React, {  useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Addtestimonial() {
  const nav = useNavigate();

  const [UserName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [Image, setImage] = useState(null); // Changed "Image" to "image"



 

  const handletestData = async (e) => {
    e.preventDefault();

    if ( !UserName || !description  || !Image ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("UserName", UserName);
    formData.append("description", description);
    formData.append("Image",Image);

    try {
      const response = await apiServices.addTestimonial(formData);
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
              <form className="mt-5" onSubmit={handletestData}>
                {/* Title input */}
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                    placeholder="UserName"
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
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    accept="Image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary-1 btn-block mb-4"
                >
                  Add Testimonial
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

export default Addtestimonial;
