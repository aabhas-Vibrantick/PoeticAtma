import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiServices from "../ApiServices/ApiServices";
import ReCAPTCHA from "react-google-recaptcha";
import { PropagateLoader } from "react-spinners";

export default function Register() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const SITE_KEY = "6LfiQG0rAAAAALzEJdOlKxKA0EWi_GQMklrVpKzk";

  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [penname, setPenName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [password, setPassword] = useState();
  const [Image, setImage] = useState();
  const [recaptchaValue, setRecaptchaValue] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const captchaRef = useRef();

  const changeimage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleForm = (e) => {
    e.preventDefault();

    setLoading(true);

    captchaRef.current.reset();

    if (!name) {
      toast.error("Full Name is required.");
      setLoading(false);
      return;
    }
    if (!penname) {
      toast.error("Pen Name is required.");
      setLoading(false);
      return;
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      toast.error('Password must contain both uppercase and lowercase letters');
      setLoading(false);
      return;
    }

    if (!/\d/.test(password)) {
      toast.error('Password must contain at least one numerical digit');
      setLoading(false);
      return;
    }

    if (!/[@#$%^&+=]/.test(password)) {
      toast.error('Password must contain at least one special character (@, #, $, %, ^, &, +, =)');
      setLoading(false);
      return;
    }
    if (contact.length !== 10) {
      toast.error("Phone Number must contain 10 digits.");
      setLoading(false);
      return;
    }

    if (!recaptchaValue) {
      toast.error("Please complete the reCAPTCHA.");
      setLoading(false);
      return;
    }
    if (!Image) {
      toast.error("Please Upload Image.");
      setLoading(false);
      return;
    }

    let data = new FormData();

    data.append("name", name);
    data.append("penname", penname);
    data.append("email", email);
    data.append("contact", contact);
    data.append("password", password);
    data.append("Image", Image);
    data.append("recaptchaValue", recaptchaValue);

// console.log(data);
//     return ;

    apiServices
      .register(data)
      .then((x) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        if (x.data.success) {
          toast.success(x.data.message);
          setTimeout(() => {
            nav("/login");
          }, 1000);
        } else {
          toast.info(x.data.message);
          setTimeout(() => {
            nav("/login");
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong!! Try again later.");
        setLoading(false);
      });
  };


  const onChange = (value) => {
    setRecaptchaValue(value);
    setIsButtonDisabled(!value);
  };

  const handleKeyPress = (event) => {
    const charCode = event.which || event.keyCode;
    if (
      (charCode >= 65 && charCode <= 90) || // A-Z
      (charCode >= 97 && charCode <= 122) || // a-z
      (charCode >= 48 && charCode <= 57) || // 0-9
      charCode === 95 // Underscore 
      || charCode === 32
    ) {
      return true; // Allow the key press
    }

    event.preventDefault(); // Prevent the key press
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e) => {
    setShowPassword(!showPassword);
    e.preventDefault();
  };

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
                      <h3 className="text-uppercase authtext">
                        Sign Up
                      </h3>
                    </div>
                    <form onSubmit={handleForm} autoComplete="off">
                      <div className="form-group first">
                        <label for="username">Full Name</label>
                        <input type="text" className="form-control" placeholder="e.g. John Doe" id="username" autoComplete="off" value={name}
                          onChange={(e) => setName(e.target.value)}
                          onKeyPress={handleKeyPress}
                          required />
                      </div>
                      <div className="form-group first">
                        <label for="username">Pen Name</label>
                        <input  type="text"  name="penname"  className="form-control"  placeholder="e.g. johndoe" id="penname"  autoComplete="off"  value={penname}  onChange={(e) => setPenName(e.target.value)} 
                         onKeyPress={handleKeyPress}  required/>
                      </div>
                      <div className="form-group first">
                        <label for="username">Email Address</label>
                        <input type="text" className="form-control" placeholder="e.g. john.doe@gmail.com" id="email" value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required />
                      </div>
                      <div className="form-group first">
                        <label for="username">Phone Number</label>
                        <input type="Number" className="form-control" placeholder="e.g. 9999999999" id="number" value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          required min="0" />
                      </div>
                      <div className="form-group first ">
                        <label for="password">Password</label>
                        <input  type={showPassword ? "text" : "password"} name="signup-password" className="form-control" placeholder="********" id="signup-password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <a
                          className="passswitch"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                        </a>
                      </div>
                      <div className="form-group first ">
                        <label for="image" >Upload Image</label>

                        <input
                          type="file"
                          className="form-control"
                          id="file"
                          onChange={(e) => {
                            changeimage(e);
                          }}
                        />
                      </div>
                      <div className="form-group last">
                        <ReCAPTCHA
                          className=""
                          sitekey={SITE_KEY}
                          onChange={onChange}
                          ref={captchaRef}
                        />
                      </div>

                      {loading ? <>
                        <div className="d-flex justify-content-center" style={{ width: 150, height: 32, marginLeft: 120, }}>
                          <PropagateLoader color="#fecc01" size={24} />
                        </div>
                      </> : <>
                        <button href="#" type="submit" className="btn btn-block py-2 btn-facebook btn-signin" disabled={isButtonDisabled}>
                          <span className="fa-solid fa-right-to-bracket fa-beat mr-2"></span>
                          Sign Up
                        </button>
                      </>}

                      <span className="text-center my-3 d-block">or</span>


                      <div className="">
                        <a href="#" className="btn btn-block py-2 btn-facebook">
                          <span className="fa fa-facebook mr-2"></span> Sign Up with facebook
                        </a>
                        <a href="#" className="btn btn-block py-2 btn-google"><span className=" fa fa-google mr-2"></span> Sign Up with Google</a>
                      </div>
                      <div className="signup mt-3 text-center">Have an Account?
                        <Link to="/login">Sign In Now</Link>
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
