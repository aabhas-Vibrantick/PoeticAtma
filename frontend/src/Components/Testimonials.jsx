import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonial.css"; // Your updated CSS file
import { Link } from "react-router-dom";

const Testimonials = () => {
  const sliderRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    apiServices
      .getallTestimonial()
      .then((response) => {
        if (response.data.success) {
          setTestimonials(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
    
  }, []);

  const settings = {
    dots: true, // Dots can look elegant on a dark theme
    infinite: true,
    speed: 800, // Slower, more graceful transition
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  return (
    <div className="testimonial-section-poetry" id="testimonials">
      <div className="container">
        <h2 className="testimonial-heading-poetry">When Words Meet Hearts</h2>
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((t) => (
            <div key={t._id} className="testimonial-slide-poetry">
              <div className="testimonial-card-poetry">
                <div className="profile-pic-container-poetry">
                  <img
                    src={BASE_URL_IMG + t.Image}
                    alt={t.UserName}
                    onError={(e) => (e.target.src = "/default_image.jpg")}
                  />
                </div>
                <div className="testimonial-content-poetry">
                  <p className="testimonial-text-poetry">"{t.description}"</p>
                  <div className="user-name-poetry">— {t.UserName}</div>
                  {/* <div className="testimonial-btn-poetry mt-2">
                    <Link to="/poets" className="btn">
                      More Voices
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;