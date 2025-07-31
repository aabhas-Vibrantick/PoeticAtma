import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonial.css";
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
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="testimonial-section" id="testimonials">
      <h2 className="testimonial-heading">Voices of PoeticAtma</h2>
      <Slider ref={sliderRef} {...settings}>
        {testimonials.map((t) => (
          <div key={t._id} className="testimonial-slide-modern">
            <div className="testimonial-card-modern">
              <div className="profile-pic-container">
                <img
                  src={BASE_URL_IMG + t.Image}
                  alt={t.UserName}
                  onError={(e) => (e.target.src = "/default_image.jpg")}
                />
              </div>
              <div className="testimonial-content d-flex flex-column gap-2 justify-content-center align-items-center text-center">
                <div className="user-name">{t.UserName}</div>
                <p className="testimonial-text-modern">{t.description}</p>
                <div className="rating">
                  <ul
                    className="d-flex gap-1 p-0 m-0"
                    style={{ listStyle: "none" }}
                  >
                    <li>
                      <i className="fa-solid fa-star"></i>
                    </li>
                    <li>
                      <i className="fa-solid fa-star"></i>
                    </li>
                    <li>
                      <i className="fa-solid fa-star"></i>
                    </li>
                    <li>
                      <i className="fa-solid fa-star"></i>
                    </li>
                    <li>
                      <i className="fa-solid fa-star"></i>
                    </li>
                  </ul>
                </div>
                <div className="testimonial-btn mt-2">
                  <Link to="/poets" className="btn btn-primary">
                    View More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
