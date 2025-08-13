import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import apiServices from "../ApiServices/ApiServices";
import "react-toastify/dist/ReactToastify.css";
import { PropagateLoader } from "react-spinners";
import ReCAPTCHA from "react-google-recaptcha";
import "./Login.css";

export default function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [captchaSettings, setCaptchaSettings] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const captchaRef = useRef();

  /**
   * Fetches CAPTCHA settings from the API on component mount.
   */
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await apiServices.fetchCaptchaSettings();
        const googleCaptcha = settings.find((s) => s.type === "google");

        if (googleCaptcha) {
          setCaptchaSettings(googleCaptcha);
          // Disable the button only if CAPTCHA is active and required
          if (googleCaptcha.status === true) {
            setIsButtonDisabled(true);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("Could not load CAPTCHA settings.");
      }
    };
    fetchSettings();
  }, []);

  /**
   * Checks for and displays any session messages (e.g., from a redirect).
   */
  useEffect(() => {
    const msg = sessionStorage.getItem("message");
    if (msg) {
      toast.error(msg);
      setTimeout(() => {
        sessionStorage.removeItem("message");
      }, 1000);
    }
  }, []);

  /**
   * Handles the form submission for user login.
   */
  const handleForm = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Only validate captcha if required by settings
  if (captchaSettings && captchaSettings.status === true && !recaptchaValue) {
    toast.error("Please complete the reCAPTCHA verification.");
    setLoading(false);
    return;
  }

  let data = {
    email,
    password: pass,
    recaptchaValue,
  };

  try {
    const response = await apiServices.login(data);
    setLoading(false);

    // Handle backend messages
    if (response.data.success) {
      const userData = response.data.data;
      sessionStorage.setItem("user_type", userData.userType);
      sessionStorage.setItem("token", "Bearer " + response.data.token);
      sessionStorage.setItem("_id", userData._id);
      sessionStorage.setItem("authenticate", true);
      sessionStorage.setItem("status", userData.status);

      // Redirect admin
      if (userData.userType === 1 || userData.userType === "1") {
        toast.success(response.data.message);
        setTimeout(() => navigate("/admin"), 1000);
      } 
      // Redirect normal users
      else if (userData.status === true) {
        toast.success(response.data.message);
        sessionStorage.setItem("user_data", JSON.stringify(userData));
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } 
      else {
        sessionStorage.clear();
        navigate("/login");
        toast.error("Your Email Is Not Verified, Please Verify It!");
      }
    } else {
      // Show domain error or captcha error
      if (
        response.data.message === "Captcha domain not registered!" ||
        response.data.message === "reCAPTCHA Verification Failed!"
      ) {
        toast.error(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong! Try again later.");
  }

  // Reset captcha if active
  if (captchaSettings && captchaSettings.status === true && captchaRef.current) {
    captchaRef.current.reset();
    setRecaptchaValue(null);
    setIsButtonDisabled(true);
  }
};


  const changeEmail = (e) => setEmail(e.target.value);

  const onChange = (value) => {
    setRecaptchaValue(value);
    if (captchaSettings && captchaSettings.status === true) {
      setIsButtonDisabled(!value);
    }
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false") navigate("/");
  }, []);

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
                          onChange={changeEmail}
                          required
                        />
                      </div>

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
                          required
                        />
                        <a className="passswitch" onClick={togglePasswordVisibility}>
                          {showPassword ? (
                            <i className="fas fa-eye-slash"></i>
                          ) : (
                            <i className="fas fa-eye"></i>
                          )}
                        </a>
                      </div>

                      <div className="form-group last mb-4" style={{ height: '78px' }}>
                        {captchaSettings ? (
                          captchaSettings.status === true ? (
                            <ReCAPTCHA
                              className="g-recaptcha"
                              sitekey={captchaSettings.sitekey}
                              onChange={onChange}
                              ref={captchaRef}
                            />
                          ) : (
                            <p style={{ color: "red", fontWeight: "bold" }}>
                              Google Captcha is disabled for this domain.
                            </p>
                          )
                        ) : null}
                      </div>

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

                      {loading ? (
                        <div
                          className="d-flex justify-content-center"
                          style={{ width: 150, height: 48, marginLeft: 122 }}
                        >
                          <PropagateLoader loading={loading} size={25} color="#fecc01" />
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-block py-2 btn-facebook btn-signin"
                          disabled={
                            captchaSettings && captchaSettings.status === true
                              ? isButtonDisabled
                              : false
                          }
                        >
                          <span className="fa-solid fa-right-to-bracket fa-beat mr-2"></span>
                          Sign In
                        </button>
                      )}

                      <span className="text-center my-3 d-block">or</span>

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