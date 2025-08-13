import { useEffect, useState } from "react";
import Swal from 'sweetalert2'; // Correct import for SweetAlert2
import apiServices from '../../ApiServices/ApiServices';
import "./CaptchaSettingsForm.css";

const CaptchaSettingsForm = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await apiServices.fetchCaptchaSettings();
        setSettings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleChange = (index, field, value) => {
    const newSettings = [...settings];
    newSettings[index][field] = field === "status" ? (value === "true") : value;
    setSettings(newSettings);
  };

  const handleSave = async () => {
    try {
      for (const s of settings) {
        await apiServices.updateCaptchaSettings(s);
      }
      
      Swal.fire({
        title: "Success!",
        text: "Captcha settings have been saved successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Failed to save settings. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="captcha-form">
      {settings.map((s, index) => (
        <div key={s.type} className="captcha-section">
          <h5>{s.type.charAt(0).toUpperCase() + s.type.slice(1)} Captcha</h5>

          <label>Site Key</label>
          <input
            type="text"
            value={s.sitekey || ""}
            onChange={(e) => handleChange(index, "sitekey", e.target.value)}
          />

          <label>Secret Key</label>
          <input
            type="text"
            value={s.secretkey || ""}
            onChange={(e) => handleChange(index, "secretkey", e.target.value)}
          />

          <label>Status</label>
          <select
            value={s.status}
            onChange={(e) => handleChange(index, "status", e.target.value)}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>

          
          
        </div>
      ))}

      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default CaptchaSettingsForm;