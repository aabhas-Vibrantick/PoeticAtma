
import { useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddBlogCAtegory() {
  const [name, setName] = useState();
  const nav = useNavigate();
 
  // ---------------Add blog category start----------
  const handleForm = (e) => {
    e.preventDefault();
    let data = {
      Category_name:name,

    }
    apiServices.addcategory(data).then((x) => {
        if (x.data.success) {
          toast.success(x.data.message);
          setTimeout(() => {
            nav("/admin/view-blogcategory");
          }, 3000);
        } else {
          toast.error(x.data.message);
        }
      })
      .catch((error) => {
        // // console.log(error);
        toast.error("Something went wrong!! Try again later.");
      });
  };
  // ---------------Add blog category end----------



 
  return (
    <>
{/* -----------------Add Blog Category---------- */}
      <main className="main-container adminbody ">
          <div className="row justify-content-center catcardwrap">
            <div className="col-lg-8 article  p-5"><h2 className="text-dark">Add Blog Category</h2>
              <form className="" onSubmit={handleForm}>
                <div className="mb-3">
                  <input
                  
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder="Enter category name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary-1">
                  Add Category
                </button>
              </form></div>
            
          </div>
   
        
        
{/* -----------Add Shayari Category------- */}

         
       
       
      </main>
      <ToastContainer />
    </>
  );
}

export default AddBlogCAtegory;
