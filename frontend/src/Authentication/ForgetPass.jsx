import React, { useState, useEffect, useRef } from 'react';
import apiServices from "../ApiServices/ApiServices";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { PropagateLoader } from 'react-spinners';

export default function ForgetPass() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const SITE_KEY = "6LfiQG0rAAAAALzEJdOlKxKA0EWi_GQMklrVpKzk";
  
  const nav = useNavigate();
  const captchaRef = useRef();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    captchaRef.current.reset();

    if (!email) {
      setLoading(false);
      toast.error("Please enter your email address");
      return;
    }
    if (!recaptchaValue) {
      setLoading(false);
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }

    try {
      const response = await apiServices.forgotPassword({ email, recaptchaValue });

      if (response.data.passwordResetTimeReached) {
        toast.info(response.data.message);
        nav("/login");
      } else if (response.data.otpSent) {
        toast.success(response.data.message);
        sessionStorage.setItem("emailAddressForResetPassword", email);
        nav("/reset-password");
      } else {
        // Handles messages like "User not found" or any other backend message
        if (response.data.message) {
          toast.error(response.data.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      // Handle HTTP errors
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
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
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <ReCAPTCHA
                className="mt-3 mb-3"
                sitekey={SITE_KEY}
                onChange={onChange}
                ref={captchaRef}
              />

              {loading ? (
                <div className="d-flex justify-content-center" style={{ width: 150, height: 48, marginLeft: 120 }}>
                  <PropagateLoader loading={loading} size={25} color="#fecc01" />
                </div>
              ) : (
                <button type="submit" disabled={isButtonDisabled}>Reset Password</button>
              )}
            </form>

            <p className="back-to-login">
              <Link to="/login">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
