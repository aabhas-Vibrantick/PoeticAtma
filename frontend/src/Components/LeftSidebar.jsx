import React from "react";

const LeftSidebar = () => {
  return (
    <>
      <style>{`
        .left-sidebar {
          transition: all 0.3s ease;
          font-family: "Segoe UI", sans-serif;
          padding: 16px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 0 12px rgba(0,0,0,0.05);
          border: 1px solid #eee;
          text-align: center;
        }

        .vertical-image {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
      `}</style>

      <div className="left-sidebar">
        {/* Replacing AdSense with a vertical image */}
        <img
          src="/sideStrip.jpg" // Replace with your actual image path or uploaded file path
          alt="Vertical Ad Placeholder"
          className="vertical-image"
        />
      </div>
    </>
  );
};

export default LeftSidebar;
