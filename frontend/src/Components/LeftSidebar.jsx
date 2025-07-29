import React, { useEffect } from "react";

const LeftSidebar = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <>
      <style>{`
        .sidebar-wrapper {
          transition: all 0.3s ease;
          font-family: "Segoe UI", sans-serif;
        }

        .adsense-box {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 0 12px rgba(0,0,0,0.05);
          padding: 10px;
          margin-bottom: 24px;
          border: 1px solid #eee;
        }
      `}</style>

      <div className="sidebar-wrapper p-4 bg-white rounded-3 shadow-sm border">
        {/* Google Ad Banner 1 */}
        <div className="adsense-box text-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
            data-ad-slot="xxxxxxxxxx"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>

        {/* Google Ad Banner 2 (optional) */}
        <div className="adsense-box text-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
            data-ad-slot="xxxxxxxxxx"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
