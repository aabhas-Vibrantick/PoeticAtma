import React from "react";
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";

const Sidebar = ({ topSher, topShayari, topProse }) => {
  const renderSection = (title, items, textClass) => (
    <div className="sidebar-section mb-5">
      <h5 className={`fw-semibold ${textClass} border-bottom pb-2 mb-3`}>
        <i className="bi bi-star-fill me-2 text-muted"></i>
        {title}
      </h5>
      <ul className="list-group list-group-flush">
        {items.slice(0, 5).map((item) => (
          <li
            key={item._id}
            className="list-group-item d-flex align-items-center border-0 px-0 py-2 sidebar-item"
          >
            <img
              src={BASE_URL_IMG + item.Image}
              alt={item.title}
              onError={(e) => {
                e.target.src = "/default_image.jpg";
              }}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "8px",
                marginRight: "12px",
              }}
            />
            <span
              className="fw-medium sidebar-title text-truncate"
              style={{ maxWidth: "160px" }}
              title={item.title}
            >
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
    <style>{`.sidebar-wrapper {
  transition: all 0.3s ease;
  font-family: "Segoe UI", sans-serif;
}

.sidebar-title {
  font-size: 0.95rem;
  color: #333;
}

.sidebar-item:hover {
  background-color: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
}

.sidebar-section h5 {
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}

.list-group-item {
  transition: background-color 0.2s ease;
}
`}</style>
    <div className="sidebar-wrapper p-4 bg-white rounded-3 shadow-sm border">
      {/* Advertisement */}
      <div className="sidebar-section mb-5 text-center">
        <img
          src="Add.jpg"
          className="img-fluid rounded-3 border shadow-sm"
          alt="Advertisement"
        />
      </div>

      {/* Sidebar Sections */}
      {renderSection("Trending Sher", topSher, "text-primary")}
      {renderSection("Latest Shayari", topShayari, "text-success")}
      {renderSection("Featured Prose", topProse, "text-warning")}
    </div>
    </>
  );
};

export default Sidebar;
