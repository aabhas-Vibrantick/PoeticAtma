import React from "react";
import { Link } from "react-router-dom";
import "./ContentCard.css";
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

  function trimToWords(text, limit = 20) {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return text;
}
  return (
  <div className="col-lg-4 col-xl-3 col-xxl-3 mb-4 col-md-6 custom-card">
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
            <p className="blogcontent">{trimToWords(textMap[type], 20)}</p>
          </div>
        </div>
      </div>
    </Link>
  </div>
);
};

export default ContentCard;
