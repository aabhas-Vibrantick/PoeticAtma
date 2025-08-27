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
  const captchaRef = useRef(null);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [captchaStatus, setCaptchaStatus] = useState(false); // fetched from backend

  // Fetch captcha status from backend (same as Login)
  useEffect(() => {
    apiServices.fetchCaptchaSettings()
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          const captchaData = res[0];
          setCaptchaStatus(!!captchaData.status);
        } else {
          setCaptchaStatus(false);
        }
      })
      .catch(() => {
        toast.error("Failed to fetch captcha settings");
        setCaptchaStatus(false);
      });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Reset captcha widget only if it’s enabled (keeps UX clean)
    if (captchaStatus && captchaRef.current) {
      captchaRef.current.reset();
    }

    if (!email) {
      setLoading(false);
      toast.error("Please enter your email address");
      return;
    }

    // Require captcha only when enabled
    if (captchaStatus && !recaptchaValue) {
      setLoading(false);
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }

    try {
      const payload = { email, recaptchaValue: captchaStatus ? recaptchaValue : null };
      const response = await apiServices.forgotPassword(payload);

      if (response.data.passwordResetTimeReached) {
        toast.info(response.data.message);
        nav("/login");
      } else if (response.data.otpSent) {
        toast.success(response.data.message);
        sessionStorage.setItem("emailAddressForResetPassword", email);
        nav("/reset-password");
      } else {
        toast.error(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      if (error.response?.data?.message) {
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

              {/* Show captcha only if enabled */}
              {captchaStatus && (
                <ReCAPTCHA
                  className="mt-3 mb-3"
                  sitekey={SITE_KEY}
                  onChange={onChange}
                  ref={captchaRef}
                />
              )}

              {loading ? (
                <div
                  className="d-flex justify-content-center"
                  style={{ width: 150, height: 48, marginLeft: 120 }}
                >
                  <PropagateLoader loading={loading} size={25} color="#fecc01" />
                </div>
              ) : (
                <button
                  type="submit"
                  className="btn btn-block py-2 btn-facebook btn-signin"
                  disabled={(captchaStatus && !recaptchaValue) || loading}
                >
                  <span className="fa-solid fa-right-to-bracket fa-beat mr-2"></span>
                  Reset Password
                </button>
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
