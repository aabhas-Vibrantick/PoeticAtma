import React from 'react'

function ExampleContent({ videoLink }) {
    return (
        <div>
            <div className="ytimeline-content">
                <div className="embed-responsive embed-responsive-16by9 mb20 you-card">
                    <iframe
                        src={videoLink}
                        style={{ width: "100%", height: "100%", left: "0" }}
                        width="640"
                        height="360"
                        frameBorder="0"
                        allowFullScreen
                        title="YouTube video"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default ExampleContent
