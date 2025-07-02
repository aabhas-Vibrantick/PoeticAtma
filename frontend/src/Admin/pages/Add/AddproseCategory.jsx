
import { useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddProseCAtegory() {
  const [pname, setPname] = useState();
  const nav = useNavigate();
  // ---------------Add prose category start----------
   const handleProseForm = (e) => {
    e.preventDefault();
    let data = {
      Category_name:pname,

    }
    apiServices.add_prose_category(data).then((x) => {
        if (x.data.success) {
          toast.success(x.data.message);
          setTimeout(() => {
            nav("/admin/view-prosecategory");
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
  // ---------------Add prose category end----------

  
  return (
    <>
{/* -----------------Add Blog Category---------- */}
      <main className="main-container adminbody">
          
        
{/* -----------Add Shayari Category------- */}

          <div className="row justify-content-center catcardwrap">
            <div className="col-lg-8 article p-5">
            <h2 className="text-dark">Add Prose Category</h2>
              <form className="" onSubmit={handleProseForm}>
                <div className="mb-3">
                
                  <input
           
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder="Enter category name"
                    value={pname}
                    onChange={(e) => {
                      setPname(e.target.value);
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

export default AddProseCAtegory;
