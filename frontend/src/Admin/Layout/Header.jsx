import React, { useState } from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Header({ OpenSidebar }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  //  -------------------log out------------

  const navigate = useNavigate();
  const logout = () => {
    toast.success("Logout Successfully");
    sessionStorage.clear();

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <>
      <header className="header">
      
        <div className="header-left">
          {/* <BsSearch  className='icon'/> */}
         
        </div>
        <div className="header-right">
        <div className="user-profile" data-bs-toggle="dropdown"
aria-expanded="false">
    <img className="profile-image" src="/assets/images/avtar.png" alt="User Profile Image" />
   <i className="fa-solid fa-caret-down dropdown-icon"></i>
  </div>
                <li className="nav-item dropdown pe-3">
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    {/* <Link to="">
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center"
                          href="users-profile.html"
                        >
                          <i className="bi bi-person"></i>
                          <span>My Profile</span>
                        </a>
                      </li>
                    </Link>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="users-profile.html"
                      >
                        <i className="bi bi-gear"></i>
                        <span>Account Settings</span>
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li> */}
                    {/* AttendeeList Dropdown button */}

                    {/* AttendeeList Dropdown button */}

                    {/* EventList Dropdown button */}
                    <hr className="dropdown-divider" />

                    {/* <li>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        href="pages-faq.html"
                      >
                        <i className="bi bi-question-circle"></i>
                        <span>Need Help?</span>
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li> */}

                    
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <i className="bi bi-box-arrow-right"></i>
                          <span btn
                            onClick={() => {
                              logout();
                            }}
                          >
                            Sign Out
                          </span>
                        </a>
                      </li>
                  </ul>
                  {/* <!-- End Profile Dropdown Items --> */}
                </li>
        </div>
      </header>
      <ToastContainer />
    </>
  );
}

export default Header;
