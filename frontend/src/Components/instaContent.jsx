import React from 'react';

function InstaContent({ postLink }) {
    return (
        <div>
            <div className="ytimeline-content">
                <div className="ratio ratio-21x9 mb-3 you-card">
                    <iframe
                        src={postLink}
                        style={{ width: "100%", height: "100%", left: "0" }}
                        width="640"
                        height="360"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default InstaContent;
