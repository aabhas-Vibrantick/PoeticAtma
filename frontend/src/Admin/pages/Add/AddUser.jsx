import React from 'react'
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiServices from "../../../ApiServices/ApiServices";
import { useNavigate } from 'react-router-dom';
function AddUser() {
  const nav = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [contact, setContact] = useState()

  const handleForm = (e) => {
    // setLoading(true)
    e.preventDefault();

    let data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("contact", contact)

    apiServices.adduser(data)
      .then((x) => {
        if (x.data.success) {
          toast.success(x.data.message);
          setTimeout(() => {
            nav("/admin/all-users");
          }, 3000);
        } else {
          toast.error(x.data.message);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong!! Try again later.");
      });
  };


  const handleKeyPress = (event) => {
    const charCode = event.which || event.keyCode;
    // Allow letters, numbers, and underscore
    if (
      (charCode >= 65 && charCode <= 90) || // A-Z
      (charCode >= 97 && charCode <= 122) || // a-z
      (charCode >= 48 && charCode <= 57) || // 0-9
      charCode === 95 || // Underscore
      charCode === 32
    ) {
      return true; // Allow the key press
    }
    event.preventDefault(); // Prevent the key press
  };
  
  return (
    <>
      <main className="main-container adminbody">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card bg-light">
                <div className="card-body mx-5 mp-5 " >
                  <h4 className="card-title mt-3 text-center">Add User</h4>
                  <form onSubmit={handleForm}>
                    <div className="form-group input-group addusermarg">
                      <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                      </div>
                      <input name="" className="form-control" placeholder="Full name" type="text" value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        required />
                    </div>
                    {/* <!-- form-group// --> */}
                    <div className="form-group input-group addusermarg">
                      <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                      </div>
                      <input name="" className="form-control" placeholder="Email address" type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    </div>
                    {/* <!-- form-group// --> */}
                    <div className="form-group input-group addusermarg">
                      <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                      </div>

                      <input name="" className="form-control" placeholder="Phone number" type="text" value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required />
                    </div>
                    {/* <!-- form-group end.// --> */}
                    <div className="form-group input-group addusermarg">
                      <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                      </div>
                      <input className="form-control" placeholder="Create password" type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    </div>


                    {/* <!-- form-group// -->                                       */}
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary-1 btn-block"> Create Account  </button>
                    </div>
                    {/* <!-- form-group// -->       */}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- card.// --> */}

        </div>
      </main>
      <ToastContainer />
    </>
  )
}

export default AddUser