import React from "react";
import { Link } from "react-router-dom";

const ContentCard = ({ type, item, baseUrl }) => {
  const routeMap = {
    sher: "sher",
    shayari: "shayari",
    prose: "prose",
  };

  const textMap = {
    sher: item?.sher,
    shayari: item?.shayari,
    prose: item?.prose,
  };

  return (
    <div className="col-lg-6 col-xl-4 col-xxl-4 mb-4">
      <Link to={`/${routeMap[type]}/${item._id}`} className="text-decoration-none text-dark">
        <div className="homeblog-card">
          <div className="text-center">
            <img
              src={baseUrl + item?.Image}
              alt={`${type} Image`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default_image.jpg";
              }}
            />
          </div>
          <div className="homeblog-info">
            <div className="blogtitlecontent-container">
              <h2 className="text-start blogtitlecontent">{item?.title}</h2>
            </div>
            <div className="blogcontent-container">
              <p className="blogcontent">{textMap[type]}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContentCard;
