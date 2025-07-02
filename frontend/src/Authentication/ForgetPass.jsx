import React, { useState, useEffect } from 'react';
import apiServices from "../ApiServices/ApiServices";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from 'react';
import { PropagateLoader } from 'react-spinners';

export default function ForgetPass() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const SITE_KEY = "6LfiQG0rAAAAALzEJdOlKxKA0EWi_GQMklrVpKzk";
  
  
  const nav = useNavigate();
  const captchaRef = useRef();
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleFormSubmit = async (e) => {
    setLoading(true)

    e.preventDefault();
    captchaRef.current.reset();

    if (!email) {
      setLoading(false)
      toast.error("Please Enter your Email Address");
      return;
    }
    if (!recaptchaValue) {
      setLoading(false)
      toast.error("Please Complete The reCAPTCHA Verification.");
      return;
    }

    try {
      const response = await apiServices.forgotPassword({ email, recaptchaValue });

      if (response.data.passwordResetTimeReached) {
        nav("/login");
        toast.info(response.data.message);
      }
      else if (response.data.otpSent) {
        nav("/reset-password");
        toast.success(response.data.message);
        sessionStorage.setItem("emailAddressForResetPassword", email)
      } else {
        toast.success(response.data.message);
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      setMessage('Internal Server Error');
    }
  };

  const onChange = (value) => {
    setRecaptchaValue(value);
    setIsButtonDisabled(!value);
  };

  return (
    <>
      <div className='forgetbody'>
        <div className="forgetcontainer">
          <div className="forform-container">
            <h1>Forgot Password</h1>
            <p>Enter your email address to reset your password.</p>
            <form onSubmit={handleFormSubmit}>
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <ReCAPTCHA
                className=" mt-3 mb-3"
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
            <p className="back-to-login">
              <Link to="/login">Back to Login</Link>
            </p>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
