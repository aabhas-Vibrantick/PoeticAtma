import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Testimonial.css";
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices"; // Import your API service
import { toast } from "react-toastify";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiServices
      .getallTestimonial() // Make an API request to fetch testimonials
      .then((response) => {
        if (response.data.success) {
          setTestimonials(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        // console.error("Error fetching testimonials:", error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={3000}
      >

        {testimonials.map((testimonial) => (
          <div key={testimonial._id}>
            <img src={BASE_URL_IMG + testimonial?.Image} />
            <div className="myCarousel">
              <h3>{testimonial?.UserName}</h3>

              <p>
                {testimonial?.description}
              </p>
            </div>
          </div>
        ))}


      </Carousel>
    </div>
  );
}

export default Testimonials;
