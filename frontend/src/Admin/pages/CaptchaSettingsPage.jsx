import { useEffect, useState } from "react";
import swal from 'sweetalert2'; // Import SweetAlert
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
    // Correctly handle boolean conversion for status
    newSettings[index][field] = field === "status" ? (value === "true") : value;
    setSettings(newSettings);
  };

  const handleSave = async () => {
    try {
      for (const s of settings) {
        await apiServices.updateCaptchaSettings(s);
      }
      // Use swal for success message
      new swal({
        title: "Success!",
        text: "Captcha settings have been saved successfully.",
        icon: "success",
        button: "OK",
      });
    } catch (err) {
      console.error(err);
      // Use swal for error message
      swal({
        title: "Error!",
        text: "Failed to save settings. Please try again.",
        icon: "error",
        button: "OK",
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

          <label>Allowed Domain</label>
          <input
            type="text"
            value={s.allowedDomain || ""}
            onChange={(e) => handleChange(index, "allowedDomain", e.target.value)}
            placeholder="example.com or localhost"
          />
        </div>
      ))}

      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default CaptchaSettingsForm;