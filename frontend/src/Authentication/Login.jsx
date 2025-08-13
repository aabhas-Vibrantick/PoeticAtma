import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import apiServices from "../ApiServices/ApiServices";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from "react-spinners";
import ReCAPTCHA from "react-google-recaptcha";
import "./Login.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [captchaStatus, setCaptchaStatus] = useState(false); // fetched from backend
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const captchaRef = useRef();
  const SITE_KEY = "6LfiQG0rAAAAALzEJdOlKxKA0EWi_GQMklrVpKzk";

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Show message if exists in sessionStorage
  useEffect(() => {
    const storedMessage = sessionStorage.getItem("message");
    if (storedMessage) {
      setMessage(storedMessage);
      toast.error(storedMessage);
      setTimeout(() => {
        sessionStorage.removeItem("message");
      }, 1000);
    }
  }, []);

  // Fetch captcha status from backend
  useEffect(() => {
    apiServices.fetchCaptchaSettings()
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          const captchaData = res[0];
          setCaptchaStatus(captchaData.status);
          if (!captchaData.status) {
            setIsButtonDisabled(false); // enable sign-in if captcha off
          }
        } else {
          setCaptchaStatus(false);
          setIsButtonDisabled(false);
        }
      })
      .catch(() => {
        toast.error("Failed to fetch captcha settings");
        setCaptchaStatus(false);
        setIsButtonDisabled(false);
      });
  }, []);

  // Handle captcha change
  const onChange = (value) => {
    setRecaptchaValue(value);
    setIsButtonDisabled(!value);
  };

  // Handle form submit
  const handleForm = (e) => {
    e.preventDefault();
    setLoading(true);

    // If captcha enabled but not completed
    if (captchaStatus && !recaptchaValue) {
      toast.error("Please complete the reCAPTCHA verification.");
      setLoading(false);
      return;
    }

    if (captchaStatus && captchaRef.current) {
      captchaRef.current.reset();
    }

    let data = {
      email: email,
      password: pass,
      recaptchaValue: captchaStatus ? recaptchaValue : null,
    };

    apiServices.login(data)
      .then((x) => {
        setTimeout(() => setLoading(false), 1500);

        if (x.data.success) {
          sessionStorage.setItem("user_type", x.data.data.userType);
          sessionStorage.setItem("token", "Bearer " + x.data.token);
          sessionStorage.setItem("_id", x.data.data._id);
          sessionStorage.setItem("authenticate", true);
          sessionStorage.setItem("status", x.data.data.status);

          if (x.data.data.userType === 1 || x.data.data.userType === "1") {
            toast.success(x.data.message);
            setTimeout(() => navigate("/admin"), 1000);
          } else if (x.data.data.status === true) {
            toast.success(x.data.message);
            sessionStorage.setItem("user_data", JSON.stringify(x.data.data));
            setTimeout(() => {
              navigate("/");
              window.location.reload();
            }, 1000);
          } else {
            sessionStorage.clear();
            navigate("/login");
            toast.error("Your Email Is Not Verified, Please Verify It!");
            sessionStorage.setItem("message", "You have been blocked by Admin");
          }
        } else {
          toast.error(x.data.message);
        }
      })
      .catch(() => {
        setTimeout(() => setLoading(false), 1500);
        toast.error("Something went wrong!! try again later");
      });
  };

  return (
    <>
      <div className={loading ? "disabled-screen-full" : "disable"}>
        <div className="d-md-flex half">
          <div className="contents">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="form-block mx-auto">
                    <div className="text-center mb-5">
                      <h3 className="text-uppercase authtext">Sign In</h3>
                    </div>
                    <form onSubmit={handleForm} autoComplete="off">
                      {/* Email */}
                      <div className="form-group first">
                        <label htmlFor="username">Email Id</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="email@gmail.com"
                          id="username"
                          name="email"
                          autoComplete="new-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      {/* Password */}
                      <div className="form-group last">
                        <label htmlFor="password">Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="********"
                          id="password"
                          name="password"
                          autoComplete="new-password"
                          onChange={(e) => setPass(e.target.value)}
                        />
                        <a
                          className="passswitch"
                          onClick={(e) => {
                            setShowPassword(!showPassword);
                            e.preventDefault();
                          }}
                        >
                          {showPassword ? (
                            <i className="fas fa-eye-slash"></i>
                          ) : (
                            <i className="fas fa-eye"></i>
                          )}
                        </a>
                      </div>

                      {/* Show captcha only if enabled */}
                      {captchaStatus && (
                        <div className="form-group last mb-4">
                          <ReCAPTCHA
                            className="g-recaptcha"
                            sitekey={SITE_KEY}
                            onChange={onChange}
                            ref={captchaRef}
                          />
                        </div>
                      )}

                      {/* Forgot Password */}
                      <div className="mb-4 text-start form-forget">
                        <span className="ml-auto">
                          <Link
                            to="/forget-password"
                            className="forgot-pass text-success"
                          >
                            Forgot Password
                          </Link>
                        </span>
                      </div>

                      {/* Loader / Submit button */}
                      {loading ? (
                        <div
                          className="d-flex justify-content-center"
                          style={{ width: 150, height: 48, marginLeft: 122 }}
                        >
                          <PropagateLoader
                            loading={loading}
                            size={25}
                            color="#fecc01"
                          />
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-block py-2 btn-facebook btn-signin"
                          disabled={captchaStatus ? isButtonDisabled : false}
                        >
                          <span className="fa-solid fa-right-to-bracket fa-beat mr-2"></span>
                          Sign In
                        </button>
                      )}

                      {/* Sign Up */}
                      <div className="signup mt-3 text-center">
                        Don't have account? <Link to="/register">Sign Up Now</Link>
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
