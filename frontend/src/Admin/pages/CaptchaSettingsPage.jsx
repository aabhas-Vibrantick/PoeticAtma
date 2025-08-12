// src/pages/admin/CaptchaSettingsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CaptchaToggle.css';
import apiServices, { BASE_URL } from "../../ApiServices/ApiServices";

const CaptchaSettingsPage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the current setting when the component loads
  useEffect(() => {
    const fetchCaptchaStatus = async () => {
      try {
        setIsLoading(true);
        // Use BASE_URL so it always calls backend port 8000
        const response = await axios.get(`${BASE_URL}admin/captcha`);
        setIsEnabled(response.data.setting_value);
        setError('');
      } catch (err) {
        setError('Failed to load settings. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptchaStatus();
  }, []);

  // Handle toggle switch change
  const handleToggleChange = async () => {
    const newStatus = !isEnabled;
    setIsEnabled(newStatus);

    try {
      await axios.put(`${BASE_URL}admin/captcha`, { enabled: newStatus });
      alert('Settings updated successfully!');
    } catch (err) {
      setError('Failed to update settings.');
      setIsEnabled(!newStatus); // revert if update fails
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>Loading Settings...</div>;
  }

  return (
    <div className="settings-page">

        <h1>UnderDevelop</h1>
      {/* <h2>CAPTCHA Settings ⚙️</h2> */}
      <p>Control whether reCAPTCHA is active on public registration forms.</p>
      
      {error && <p className="error-message">{error}</p>}

      <div className="toggle-container">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={handleToggleChange}
          />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">
          {isEnabled ? 'CAPTCHA is ON' : 'CAPTCHA is OFF'}
        </span>
      </div>
    </div>
  );
};

export default CaptchaSettingsPage;
