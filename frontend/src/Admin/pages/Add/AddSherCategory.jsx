
import { useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddSherCAtegory() {
  const [shername, setShername] = useState();
  const nav = useNavigate();
   // ---------------Add Sher category start----------
   const handleSherForm = (e) => {
    e.preventDefault();
    let data = {
      Category_name:shername,

    }
    apiServices.add_sher_category(data).then((x) => {
        if (x.data.success) {
          toast.success(x.data.message);
          setTimeout(() => {
            nav("/admin/view-shercategory");
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
  // ---------------Add Sher category end----------
  return (
    <>
{/* -----------------Add Blog Category---------- */}
      <main className="main-container adminbody">
          <div className="row justify-content-center  catcardwrap">
           
            <div className="col-lg-8 article p-5">
            <h2 className="text-dark">Add Sher Category</h2>
              <form className="" onSubmit={handleSherForm}>
                <div className="mb-3">
                  
                  <input
                  
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder="Enter category name"
                    value={shername}
                    onChange={(e) => {
                      setShername(e.target.value);
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary-1">
                  Add Category
                </button>
              </form>
            </div>
          </div>
   
     
        
{/* -----------Add Shayari Category------- */}

       
       
       
      </main>
      <ToastContainer />
    </>
  );
}

export default AddSherCAtegory;
