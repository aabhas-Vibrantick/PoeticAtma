import React from 'react'

function InstaContent({ postLink }) {
    return (
        <div>
            <div className="ytimeline-content">
                <div className="embed-responsive embed-responsive-21by9 mb20 you-card">
                    <iframe src={postLink} style={{ width: "100%", height: "100%", left: "0" }} width="640" height="360" frameborder="0" allowfullscreen=""></iframe>
                    {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/5m3WozJnOVs?si=XGTj4OX-zWzqc26A" style={{  width: "100%", height: "100%", left: "0" }} width="640" height="360" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                </div>
            </div>
        </div>

    )
}

export default InstaContent