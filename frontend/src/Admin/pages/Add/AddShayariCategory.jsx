
import { useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddShayariCAtegory() {
  const [sname, setSname] = useState();
  const nav = useNavigate();
 

   // ---------------Add Shayari category start----------
   const handleShayariForm = (e) => {
    e.preventDefault();
    let data = {
      Category_name:sname,

    }
    apiServices.add_shayari_category(data).then((x) => {
        if (x.data.success) {
          toast.success(x.data.message);
          setTimeout(() => {
            nav("/admin/view-shayaricategory");
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
  // ---------------Add Shayari category end----------
 

  return (
    <>
{/* -----------------Add Blog Category---------- */}
      <main className="main-container adminbody">
         
        
{/* -----------Add Shayari Category------- */}

          <div className="row justify-content-center  catcardwrap">
            <div className="col-lg-8   p-5 article">
              <h2 className="text-dark">Add Shayari Category</h2>
              <form className="" onSubmit={handleShayariForm}>
                <div className="mb-3">
                 
                  <input
              
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder="Enter category name"
                    value={sname}
                    onChange={(e) => {
                      setSname(e.target.value);
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary-1">
                  Add Category
                </button>
              </form>
            </div>
          </div>
       
       
      </main>
      <ToastContainer />
    </>
  );
}

export default AddShayariCAtegory;
