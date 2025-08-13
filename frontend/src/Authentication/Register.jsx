import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiServices from "../ApiServices/ApiServices";
import ReCAPTCHA from "react-google-recaptcha";
import { PropagateLoader } from "react-spinners";

export default function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [penname, setPenName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [Image, setImage] = useState();
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const captchaRef = useRef();

  // ----- State for CAPTCHA settings -----
  const [captchaSettings, setCaptchaSettings] = useState(null);

  // ----- Fetch CAPTCHA Settings -----
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await apiServices.fetchCaptchaSettings();
        const googleCaptcha = settings.find((s) => s.type === "google");

        if (googleCaptcha) {
          setCaptchaSettings(googleCaptcha);
          // Disable the button if CAPTCHA is active and required
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


  const changeimage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    // --- Start of Validations ---
    if (!name) {
      toast.error("Full Name is required.");
      setLoading(false);
      return;
    }

    if (!email || !email.match(/^\S+@\S+\.\S+$/)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!password || password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }
    // You can add the other password checks here as well...
    
    if (!contact || contact.length !== 10) {
      toast.error("Phone Number must contain 10 digits.");
      setLoading(false);
      return;
    }

    // --- Dynamic CAPTCHA Validation ---
    if (captchaSettings && captchaSettings.status === true && !recaptchaValue) {
      toast.error("Please complete the reCAPTCHA.");
      setLoading(false);
      return;
    }

    if (!Image) {
      toast.error("Please Upload Image.");
      setLoading(false);
      return;
    }
    // --- End of Validations ---

    let data = new FormData();
    data.append("name", name);
    data.append("penname", penname?.trim() || "");
    data.append("email", email);
    data.append("contact", contact);
    data.append("password", password);
    data.append("Image", Image);
    data.append("recaptchaValue", recaptchaValue);

    apiServices.register(data).then((x) => {
      setLoading(false);
      if (x.data.success) {
        toast.success(x.data.message);
        setTimeout(() => nav("/login"), 1500);
      } else {
        toast.error(x.data.message);
      }
    }).catch((error) => {
      setLoading(false);
      toast.error("Something went wrong!! Try again later.");
    });

    // Reset CAPTCHA after submission if it's active
    if (captchaSettings && captchaSettings.status === true && captchaRef.current) {
        captchaRef.current.reset();
        setRecaptchaValue(null);
        setIsButtonDisabled(true);
    }
  };

  const onChange = (value) => {
    setRecaptchaValue(value);
    // Enable the button once the CAPTCHA is solved
    if (captchaSettings && captchaSettings.status === true) {
        setIsButtonDisabled(!value);
    }
  };

  const handleKeyPress = (event) => {
    const charCode = event.which || event.keyCode;
    if (
      (charCode >= 65 && charCode <= 90) || // A-Z
      (charCode >= 97 && charCode <= 122) || // a-z
      (charCode >= 48 && charCode <= 57) || // 0-9
      charCode === 95 || // Underscore
      charCode === 32
    ) {
      return true;
    }
    event.preventDefault();
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
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
                      <h3 className="text-uppercase authtext">Sign Up</h3>
                    </div>
                    <form onSubmit={handleForm} autoComplete="off">
                      {/* Form inputs for name, email, etc. remain the same */}
                      <div className="form-group first">
                        <label htmlFor="username">Full Name<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" placeholder="e.g. John Doe" id="username" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} onKeyPress={handleKeyPress} required />
                      </div>
                      <div className="form-group first">
                        <label htmlFor="penname">Pen Name</label>
                        <input type="text" name="penname" className="form-control" placeholder="e.g. johndoe" id="penname" autoComplete="off" value={penname} onChange={(e) => setPenName(e.target.value)} onKeyPress={handleKeyPress} />
                      </div>
                      <div className="form-group first">
                        <label htmlFor="email">Email Address<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" placeholder="e.g. john.doe@gmail.com" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div className="form-group first">
                        <label htmlFor="number">Phone Number<span className="text-danger">*</span></label>
                        <input type="number" className="form-control" placeholder="e.g. 9999999999" id="number" value={contact} onChange={(e) => setContact(e.target.value)} required min="0" />
                      </div>
                      <div className="form-group first">
                        <label htmlFor="signup-password">Password<span className="text-danger">*</span></label>
                        <input type={showPassword ? "text" : "password"} name="signup-password" className="form-control" placeholder="********" id="signup-password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <a className="passswitch" onClick={togglePasswordVisibility}>
                          {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                        </a>
                      </div>
                      <div className="form-group first">
                        <label htmlFor="file">Upload Image<span className="text-danger">*</span></label>
                        <input type="file" className="form-control" id="file" onChange={changeimage} required />
                      </div>

                      {/* --- Dynamic CAPTCHA Rendering Block --- */}
                      <div className="form-group last">
                        {captchaSettings ? (
                            captchaSettings.status === true ? (
                            <ReCAPTCHA
                                sitekey={captchaSettings.sitekey}
                                onChange={onChange}
                                ref={captchaRef}
                            />
                            ) : (
                            <p style={{ color: "red", fontWeight: "bold" }}>
                                Google Captcha is disabled for this domain.
                            </p>
                            )
                        ) : (
                            <div style={{height: '78px'}}></div> // Placeholder for loading
                        )}
                      </div>

                      {loading ? (
                        <div className="d-flex justify-content-center" style={{ width: 150, height: 32, marginLeft: 120, }}>
                          <PropagateLoader color="#fecc01" size={24} />
                        </div>
                      ) : (
                        <button href="#" type="submit" className="btn btn-block py-2 btn-facebook btn-signin" 
                          disabled={
                            captchaSettings && captchaSettings.status === true
                              ? isButtonDisabled
                              : false
                          }>
                          <span className="fa-solid fa-right-to-bracket fa-beat mr-2"></span>
                          Sign Up
                        </button>
                      )}

                      <span className="text-center my-3 d-block">or</span>

                      <div className="signup mt-3 text-center">
                        Have an Account? <Link to="/login">Sign In Now</Link>
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