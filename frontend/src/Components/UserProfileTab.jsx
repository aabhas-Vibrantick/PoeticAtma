import React, { useState } from "react";
import { BASE_URL_IMG } from "../ApiServices/ApiServices";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function UserProfileTab({ customerData }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...customerData });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.contact) newErrors.contact = "Contact is required";
    else if (!/^\d{10}$/.test(formData.contact)) newErrors.contact = "Invalid contact (10 digits)";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      console.log("Submitted Data:", formData); // Replace with API call
      setEditMode(false);
    } else {
      setErrors(validationErrors);
    }
  };

  const fields = [
    { label: "Full Name", key: "name" },
    { label: "Pen Name", key: "penname" },
    { label: "Email", key: "email" },
    { label: "Contact", key: "contact" },
    { label: "Address", key: "address" },
    { label: "Facebook", key: "facebook" },
    { label: "Instagram", key: "instagram" },
    { label: "LinkedIn", key: "linkdin" },
    { label: "Twitter", key: "twiter" },
  ];

  return (
    <div className="container mt-4">
      <div className="card shadow rounded-3">
        <div className="card-body p-4">
          <div className="row">
            {/* Left - Profile Photo */}
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <img
                src={BASE_URL_IMG + customerData.Image}
                alt="Profile"
                className="rounded-circle img-thumbnail"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/avtar.png";
                }}
              />
              <h4 className="mt-3">{formData.name}</h4>
              <p className="text-muted fst-italic">{formData.bio || "No bio added."}</p>

              <button
                className={`btn btn-${editMode ? "secondary" : "primary"} btn-sm`}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? (
                  <>
                    <FaTimes className="me-1" /> Cancel
                  </>
                ) : (
                  <>
                    <FaEdit className="me-1" /> Edit Profile
                  </>
                )}
              </button>
            </div>

            {/* Right - Info */}
            <div className="col-md-8">
              <h5 className="mb-3 fw-semibold border-bottom pb-2">
                {editMode ? "Edit Profile Details" : "Profile Information"}
              </h5>

              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {fields.map((item, i) => (
                      <div className="col-md-6 mb-3" key={i}>
                        <label className="form-label">{item.label}</label>
                        <input
                          type="text"
                          name={item.key}
                          value={formData[item.key] || ""}
                          onChange={handleChange}
                          className={`form-control ${errors[item.key] ? "is-invalid" : ""}`}
                          placeholder={`Enter ${item.label.toLowerCase()}`}
                        />
                        {errors[item.key] && (
                          <div className="invalid-feedback">{errors[item.key]}</div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success">
                      <FaSave className="me-2" /> Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <ul className="list-group">
                  {fields.map((item, i) => (
                    <li
                      key={i}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <strong>{item.label}</strong>
                      <span className="text-muted">{formData[item.key] || "-"}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
