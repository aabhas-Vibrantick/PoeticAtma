import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonial.css"; // make sure this contains styles shown below

const Testimonials = () => {
  const sliderRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [currentDot, setCurrentDot] = useState(0);
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
    className: "center",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "24px",
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    beforeChange: (current, next) => setCurrentDot(next / 3),
    afterChange: (current) => setCurrentDot(current / 3),
    appendDots: (dots) => <Box sx={styles.dotsContainer}>{dots}</Box>,
    customPaging: (i) => (
      <Box
        sx={styles.dot(currentDot === i)}
        onClick={() => sliderRef.current.slickGoTo(i * 3)}
      />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <div className="testimonial-section" id="testimonials">
      <h2 className="testimonial-heading">What People Say About Us</h2>
      {/* <p className="testimonial-description">
        Explore how Poetic Atma has touched lives, inspired hearts, and brought words to emotions.
      </p> */}
      <div className="slider-container">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={testimonial._id} className="testimonial-card">
              <p className="testimonial-text">"{testimonial.description}"</p>
              <div className="testimonial-author">
                <img
                  src={BASE_URL_IMG + testimonial.Image}
                  onError={(e) => (e.target.src = "/default_image.jpg")}
                  alt={testimonial.UserName}
                  className="testimonial-image"
                />
                <div className="author-info">
                  <h3 className="author-name">{testimonial.UserName}</h3>
                  <p className="author-role">Poetic Atma Lover</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const styles = {
  dotsContainer: {
    textAlign: "center",
  },
  dot: (isActive) => ({
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: isActive ? "#ffc107" : "transparent",
    border: isActive ? "none" : "2px solid #fff",
    margin: "0 5px",
    display: "inline-block",
    transition: "background-color 0.3s ease, border 0.3s ease",
    cursor: "pointer",
  }),
};

export default Testimonials;
