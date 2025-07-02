import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";

export default function Header() {
  const user_type = sessionStorage.getItem('user_type')
  const authenticate = sessionStorage.getItem('authenticate')

  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(sessionStorage.getItem("_id"));
  const [userDetail, setUserDetail] = useState();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };

  //  ------------------- user------------
  useEffect(() => {
    setId(sessionStorage.getItem("_id"));

    let data = {
      userId: id,
    };

    apiServices
      .getsinglecustomer(data)
      .then((data) => {
        if (data.data.success) {
          // console.log("getsingle>>>>", data)
          setUserDetail(data.data.data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  }, []);

  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.clear()

    setTimeout(() => {
      navigate("/login")
      sessionStorage.clear()
    }, 500)

    toast.success("Logged Out Successfully")
  }

  return (
    <>
      <header id="header" className="container-fluid fixed-top  header-transparent ">
        <div className="row top-header">
          <div className="col-lg-8  top-header-content text-center">
            <span className="top-company-name fw-bold">
              Have any Question? Email Us<i className="fa-solid fa-envelope px-3"></i>
              info@poeticatma.com
              <span className="mx-2">|</span>
              Chandigarh, India
            </span>
          </div>

          <div className="col-lg-4 top-header-content">
            <div className="top-social-media text-center">
              <p>Find Us On</p>
              <a href="https://www.facebook.com/poeticatma" className="top-social-icon" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://www.youtube.com/@poeticatma" className="top-social-icon" target="_blank">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="https://www.instagram.com/poeticatma/" className="top-social-icon" target="_blank">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://wa.me/919888323607" target="_blank" className="top-social-icon">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>

          </div>
        </div>

        {authenticate && user_type == 2 ?
          <>
            <nav className="navbar navbar-expand-lg navbar-light .nav-header" id="navbarid">
              <div className="container-fluid">
                <Link to="/">
                  <img src="/assets/images/Poeticatma_logo.png" className="poetic-logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse  menu" id="navbarSupportedContent">

                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3 ">

                    <li className="nav-item">
                      <Link to="/">
                        <a className="active nav-link text-dark" aria-current="page" >
                          HOME
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/about">
                        <a className="nav-link text-dark" aria-current="page">
                          ABOUT US
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/poets">
                        <a className="nav-link text-dark">
                          POETS
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/shers">
                        <a className="nav-link text-dark">
                          SHER
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/shayari">
                        <a className="nav-link text-dark">
                          SHAYARI
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/prose">
                        <a className="nav-link text-dark">
                          PROSE
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/blogs">
                        <a className="nav-link text-dark">
                          BLOG
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/contact">
                        <a className="nav-link text-dark">
                          CONTACT US
                        </a>
                      </Link>
                    </li>

                  </ul>

                  <form className="">

                    <div className="user-profile" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <img className="profile-image" src={BASE_URL_IMG + userDetail?.Image} alt="User Profile Image" />
                      <i className="fa-solid fa-caret-down dropdown-icon"></i>
                    </div>

                    <li className="nav-item dropdown pe-3">
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                        <Link to="/user-profile">
                          <li>
                            <a
                              className="dropdown-item d-flex align-items-center"
                              href="">
                              <i className="fa-solid fa-person px-2"></i>
                              <span>My Dashboard</span>
                            </a>
                          </li>
                        </Link>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <Link to="/contact">
                          <li>
                            <a
                              className="dropdown-item d-flex align-items-center"
                              href=""
                            >
                              <i className="fa-solid fa-circle-question px-2"></i>
                              <span>Need Help</span>
                            </a>
                          </li>
                        </Link>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <Link to="">
                          <li>
                            <a
                              className="dropdown-item d-flex align-items-center"
                              href=""
                            >
                              <i className="fa-solid fa-right-from-bracket px-2"></i>
                              <span onClick={logout}>Sign Out</span>
                            </a>
                          </li>
                        </Link>
                      </ul>
                    </li>
                  </form>
                </div>
              </div>
            </nav>
          </>
          :
          <>
            <nav className="navbar  navbar-expand-lg navbar-light bg-transparent nav-header">
              <div className="container-fluid">
                <Link to="/">
                  <img src="/assets/images/Poeticatma_logo.png" className="poetic-logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse  menu" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3 ">

                    <li className="nav-item">
                      <Link to="/">
                        <a className="active nav-link text-dark" aria-current="page" >
                          HOME
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/about">
                        <a className="nav-link text-dark" aria-current="page">
                          ABOUT US
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/poets">
                        <a className="nav-link text-dark">
                          POETS
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/shers">
                        <a className="nav-link text-dark">
                          SHER
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/shayari">
                        <a className="nav-link text-dark">
                          SHAYARI
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/prose">
                        <a className="nav-link text-dark">
                          PROSE
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/blogs">
                        <a className="nav-link text-dark">
                          BLOG
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/contact">
                        <a className="nav-link text-dark">
                          CONTACT US
                        </a>
                      </Link>
                    </li>

                  </ul>

                  <form className="loginbutton-box">
                    <Link to="/login">
                      <button className="login-button">
                        <i className="fa-solid fa-right-to-bracket px-2 "></i>
                        <span >Sign In</span>
                      </button>
                    </Link>
                  </form>

                </div>
              </div>
            </nav>
          </>
        }

      </header>

      <ToastContainer />
    </>
  )
}
