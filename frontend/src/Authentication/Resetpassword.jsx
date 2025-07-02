import React, { useRef, useState, useEffect } from 'react';
import apiServices from "../ApiServices/ApiServices";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { PropagateLoader } from 'react-spinners';

function PasswordReset() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const SITE_KEY = "6LfiQG0rAAAAALzEJdOlKxKA0EWi_GQMklrVpKzk";

  const nav = useNavigate();
  const captchaRef = useRef();

  const emailAddressForResetPassword = sessionStorage.getItem("emailAddressForResetPassword");

  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false)
  const [newPassword, setNewPassword] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (!emailAddressForResetPassword) {
      setEmail('Your Email Address is not Valid')
    }
    else {
      setEmail(emailAddressForResetPassword);
    }

    // eslint-disable-next-line
  }, [])

  const handleFormSubmit = async (e) => {
    setLoading(true)

    e.preventDefault();
    captchaRef.current.reset();

    if (email === 'Your Email Address is not Valid') {
      setLoading(false)
      toast.error("Please Enter your correct Email Address on Forgot Password Page!");
      return;
    }

    if (!otp) {
      setLoading(false)
      toast.error("Please Enter 8 Digit Otp");
      return;
    }

    if (!recaptchaValue) {
      setLoading(false)
      toast.error("Please Complete The reCAPTCHA Verification.");
      return;
    }

    if (newPassword.length < 8) {
      setLoading(false)
      toast.error('Password must be at least 8 characters long');
      return;
    }

    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword)) {
      setLoading(false)
      toast.error('Password must contain both uppercase and lowercase letters');
      return;
    }

    if (!/\d/.test(newPassword)) {
      setLoading(false)
      toast.error('Password must contain at least one numerical digit');
      return;
    }

    if (!/[@#$%^&+=]/.test(newPassword)) {
      setLoading(false)
      toast.error('Password must contain at least one special character (@, #, $, %, ^, &, +, =)');
      return;
    }

    const resetData = {
      email,
      otp,
      newPassword,
      recaptchaValue,
    };

    try {
      const response = await apiServices.resetPassword(resetData);

      if (response.data.hasPasswordChanged) {
        nav("/login");
        toast.success(response.data.message);
        sessionStorage.removeItem("emailAddressForResetPassword")
      } else {
        toast.success(response.data.message);
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      setMessage('Internal Server Error');
      toast.error('Internal Server Error' + error);
    }
  };

  const onChange = (value) => {
    setRecaptchaValue(value);
    setIsButtonDisabled(!value);
  };

  const togglePasswordVisibility = (e) => {
    setShowPassword(!showPassword);
    e.preventDefault();
  };

  const toggleOtpVisibility = (e) => {
    setShowOtp(!showOtp);
    e.preventDefault();
  };

  return (
    <>
      <div className='forgetbody'>
        <div className="forgetcontainer">
          <div className="forform-container">

            <h1>Password Reset</h1>

            <form onSubmit={handleFormSubmit}>

              <input
                className="form-control mb-3"
                type="email"
                placeholder="Fetching Email Address..."
                value={email}
                required={true}
                disabled={true}
              />
              <div className="mb-n4">
                <input type={showOtp ? "text" : "password"} value={otp} className="form-control" placeholder="One Time Password(OTP)" id="otp" onChange={(e) => {
                  setOtp(e.target.value);
                }} />
                <a
                  className="passswitch-forgot"
                  onClick={toggleOtpVisibility}
                >
                  {showOtp ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                </a>
              </div>
              <div className="form-group last">
                <input type={showPassword ? "text" : "password"} value={newPassword} className="form-control" placeholder="New Password" id="password" onChange={(e) => {
                  setNewPassword(e.target.value);
                }} />
                <a
                  className="passswitch-forgot"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                </a>
              </div>

              <ReCAPTCHA
                className="mb-4 mt-n4"
                sitekey={SITE_KEY}
                onChange={onChange}
                ref={captchaRef}
              />

              {loading ? <>
                <div className="d-flex justify-content-center" style={{ width: 150, height: 48, marginLeft: 120, }}>
                  <div className="d-flex justify-content-center">
                    <PropagateLoader loading={loading} size={25} color="#fecc01" />
                  </div>
                </div>
              </> : <>
                <button type="submit" disabled={isButtonDisabled}>Reset Password</button>
              </>}

            </form>

            {message && <p>{message}</p>}

          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default PasswordReset;
