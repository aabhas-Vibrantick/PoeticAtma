import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import apiServices from "../ApiServices/ApiServices";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from "react-spinners";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

export default function Login() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const SITE_KEY = "6LfiQG0rAAAAALzEJdOlKxKA0EWi_GQMklrVpKzk";

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [recaptchaValue, setRecaptchaValue] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [message, setMessage] = useState()

  const captchaRef = useRef();

  useEffect(() => {
    setMessage(sessionStorage.getItem("message"))

    if (message) {
      toast.error(message)
      setTimeout(() => {
        sessionStorage.removeItem("message")
      }, 1000)
    }
  }, [message])

  const handleForm = (e) => {
    e.preventDefault()

    setLoading(true)

    captchaRef.current.reset();

    if (!recaptchaValue) {
      toast.error("Please complete the reCAPTCHA verification.");
      setLoading(false);
      return;
    }

    let data = {
      email: email,
      password: pass,
      recaptchaValue: recaptchaValue,
    }

    apiServices.login(data).then(
      (x) => {
        setTimeout(
          () => {
            setLoading(false)
          }, 1500
        )

        if (x.data.success) {
          sessionStorage.setItem("user_type", x.data.data.userType)
          sessionStorage.setItem("token", "Bearer " + x.data.token);
          sessionStorage.setItem("_id", x.data.data._id)
          sessionStorage.setItem("authenticate", true)
          sessionStorage.setItem("status", x.data.data.status)

          if (x.data.data.userType === 1 || x.data.data.userType === "1") {
            toast.success(x.data.message)

            setTimeout(
              () => {
                navigate("/admin")
              }, 1000
            )
          }
          else if (x.data.data.status === true) {
            toast.success(x.data.message)
            sessionStorage.setItem("user_data", JSON.stringify(x.data.data))

            setTimeout(
              () => {
                navigate("/")
                window.location.reload()
              }, 1000
            )
          }
          else {
            sessionStorage.clear()

            navigate("/login")

            toast.error("Your Email Is Not Verified, Please Verify It!")

            sessionStorage.setItem("message", "You have been blocked by Admin")
          }
        }
        else {
          toast.error(x.data.message)
        }
      }
    ).catch(
      (error) => {
        setTimeout(
          () => {
            setLoading(false)
          }, 1500
        )
        // // console.log(error)
        toast.error("Something went wrong!! try again later")
      }
    )
  }
  const changeEmail = (e) => {
    // // console.log(e.target.value)
    setEmail(e.target.value)
  }
  // -------ReCAPTCHA-------
  const onChange = (value) => {
    setRecaptchaValue(value);
    setIsButtonDisabled(!value);
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (e) => {
    setShowPassword(!showPassword);
    e.preventDefault();
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false") {
      navigate("/"); // Redirect to another route if logged out
    }
  }, []);

  return (
    <>

      <div className={loading ? "disabled-screen-full" : "disable"} >
        <div className="d-md-flex half">
          <div className="contents">

            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="form-block mx-auto">
                    <div className="text-center mb-5">
                      <h3 className="text-uppercase authtext">Sign In
                        {/* <strong>Poetic Atma</strong> */}
                      </h3>
                    </div>
                    <form onSubmit={handleForm} autoComplete="off">
                      <div className="form-group first">
                        <label for="username">Email Id</label>
                        <input type="text" className="form-control" placeholder="email@gmail.com" id="username" name="email" autoComplete="new-email" value={email} 
                        onChange={changeEmail}/>
                      </div>

                      <div className="form-group last">
                        <label for="password">Password</label>
                        <input type={showPassword ? "text" : "password"}  className="form-control"  placeholder="********"  id="password"  name="password"  autoComplete="new-password" 
                        onChange={(e) => setPass(e.target.value)}
                        />
                        <a
                          className="passswitch"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                        </a>
                      </div>

                      <div className="form-group last mb-4">
                        <ReCAPTCHA
                          className=" "
                          sitekey={SITE_KEY}
                          onChange={onChange}
                          ref={captchaRef}
                        />
                      </div>
                      <div className=" mb-4 text-start form-forget">
                        <span className="ml-auto"><Link to="/forget-password" className="forgot-pass text-success">Forgot Password</Link></span>
                      </div>

                      {loading ? <>
                        <div className="d-flex justify-content-center" style={{ width: 150, height: 48, marginLeft: 122, }}>
                          <div className="d-flex justify-content-center">
                            <PropagateLoader loading={loading} size={25} color="#fecc01" />
                          </div>
                        </div>
                      </> : <>
                        <button href="#" type="submit" className="btn btn-block py-2 btn-facebook btn-signin" disabled={isButtonDisabled}>
                          <span className="fa-solid fa-right-to-bracket fa-beat mr-2"></span>
                          Sign In
                        </button>
                      </>}

                      <span className="text-center my-3 d-block">or</span>


                      <div className="">
                        <a href="#" className="btn btn-block py-2 btn-facebook">
                          <span className="fa fa-facebook mr-2"></span> Sign In with facebook
                        </a>
                        <a href="#" className="btn btn-block py-2 btn-google"><span className=" fa fa-google mr-2"></span> Sign In with Google</a>
                      </div>
                      <div className="signup mt-3 text-center">Don't have account?
                        <Link to="/register">Sign Up Now</Link>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />

    </>
  );
}
