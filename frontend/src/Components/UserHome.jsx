import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";
import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import Marquee from "react-fast-marquee";
import Example from "./example";
import Testimonials from "./Testimonials";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Insta from "./Instagramvideo";

export default function UserHome() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allbook, setAllBook] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [topSher, setTopSher] = useState([]);
  const [topShayari, setTopShayari] = useState([])
  const [topProse, setTopProse] = useState([])
  const authenticate = sessionStorage.getItem("authenticate");

  const handleReadMoreClick = () => {
    if (!authenticate) {
      window.location.href = "/login";
    }
  };

  const override = {
    display: "block",
    position: "absolute",
    top: "25%",
    left: "48%",
    zIndex: "1",
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);

    const fetchFeaturedBlogs = async () => {
      try {
        const blogResponse = await apiServices.getFeaturedBlogs();
        setFeaturedBlogs(blogResponse.data.featuredBlogs);
      } catch (error) {
        // console.error('Error fetching featured blogs:', error);
      }
    };

    const fetchTopSher = async () => {
      try {
        const sherResponse = await apiServices.getFeaturedSher();
        setTopSher(sherResponse.data.topSher);
      } catch (error) {
        setTopSher("Server Error")
      }
    };

    const fetchTopShayari = async () => {
      try {
        const shayariResponse = await apiServices.getTopShayari();
        setTopShayari(shayariResponse.data.topShayari);
      } catch (error) {
        setTopShayari("Server Error")
      }
    };

    const fetchTopProse = async () => {
      try {
        const proseResponse = await apiServices.getTopProse();
        setTopProse(proseResponse.data.topProse);
      } catch (error) {
        setTopProse("Server Error")
      }
    };

    apiServices
      .getallBook()
      .then((data) => {
        if (data.data.success) {
          // const filteredShayas = data.data.data.filter((book) => book.status === true);
          // setAllBook(filteredBooks);
          setAllBook(data.data.data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        // // console.log(err);
        toast.error("Something went wrong");
      });

    fetchFeaturedBlogs();
    fetchTopSher();
    fetchTopShayari();
    fetchTopProse();

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiServices.getTop10Customers({});

      if (response.data.success) {
        setUsers(response.data.data);
        // // console.log(response);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // console.error(error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <ScaleLoader loading={loading} cssOverride={override} size={70} />
      <div className={loading ? "disable-full-screen" : ""}>
        <div className="aws-crousel">
          <Swiper
            pagination={{
              type: "progressbar",
              color: "white",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper-crousel"
          >
            <SwiperSlide className="homeswiper-slide">
              <img src="/assets/images/authentication_img.jpeg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              <img src="/assets/images/Sad_shayari_image_download(1).jpg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/authentication_img.jpeg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/Sad_shayari_image_download(1).jpg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/authentication_img.jpeg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/Sad_shayari_image_download(1).jpg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/authentication_img.jpeg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/Sad_shayari_image_download(1).jpg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/authentication_img.jpeg" />
            </SwiperSlide>
          </Swiper>
        </div>

        <section className="waviy-body">
          <div className="waviy py-3 my-3">
            <h1>
              TRENDING<span className="px-3">POETS</span>
            </h1>
            <hr className="headinghr" />
          </div>
        </section>

        <section>
  <div className="CardRatingwrapNew">
    <Marquee pauseOnHover>
      {users
        .filter((data) => data.userId) // ✅ only include valid, verified users
        .map((data, index) => (
          <div className="homeprofile-card" key={index}>
            <div className="homeprofile-card-details">
              <Link to={`/poets-profile/${data.userId._id}`}>
                <img
                  src={BASE_URL_IMG + (data.Image || "avtar.png")}
                  className="img-fluid"
                  alt="img..."
                  onError={(e) => {
                    e.target.src = "/assets/images/avtar.png";
                  }}
                />
                <p className="homeprofile-text-body">
                  {data.userId.name}
                </p>
              </Link>
            </div>

            <Link
              className="homeprofile-card-button"
              to={`/poets-profile/${data.userId._id}`}
            >
              More info
            </Link>
          </div>
        ))}
    </Marquee>
  </div>
</section>


        <section className="waviy-body">
          <div className="waviy">
            <h1>
              <span className="px-3">SHER</span>
            </h1>
            <hr className="headinghr" />
          </div>
        </section>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="CardRatingwrapNew">
            <section>
              <div className="row" style={{ marginLeft: "auto", marginRight: "auto" }}>
                {Array.isArray(topSher) && topSher.map((blog) => (
                  <div className="col" key={blog._id}>
                    <div className="homeblog-card">
                      <div style={{ justifyContent: "center", alignContent: "center" }}>
                        <img src={BASE_URL_IMG + blog?.Image} alt="Blog Image" />
                      </div>
                      <div className="homeblog-info">
                        <div className="blogtitlecontent-container">
                          <h2 className="text-start blogtitlecontent">
                            {blog?.title}
                          </h2>
                        </div>
                        <div className="blogcontent-container">
                          <p className="blogcontent ">
                            {blog?.sher}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="waviy-body">
          <div className="waviy">
            <h1>
              <span className="px-3">SHAYARI</span>
            </h1>
            <hr className="headinghr" />
          </div>
        </section>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="CardRatingwrapNew">
            <section>
              <div className="row" style={{ marginLeft: "auto", marginRight: "auto" }}>
                {Array.isArray(topSher) && topShayari.map((blog) => (
                  <div className="col" key={blog._id}>
                    <div className="homeblog-card">
                      <div style={{ justifyContent: "center", alignContent: "center" }}>
                        <img src={BASE_URL_IMG + blog?.Image} alt="Blog Image" />
                      </div>
                      <div className="homeblog-info">
                        <div className="blogtitlecontent-container">
                          <h2 className="text-start blogtitlecontent">
                            {blog?.title}
                          </h2>
                        </div>
                        <div className="blogcontent-container">
                          <p className="blogcontent">
                            {blog?.shayari}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="waviy-body">
          <div className="waviy">
            <h1>
              <span className="px-3">PROSE</span>
            </h1>
            <hr className="headinghr" />
          </div>
        </section>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="CardRatingwrapNew">
            <section>
              <div className="row" style={{ marginLeft: "auto", marginRight: "auto" }}>
                {Array.isArray(topProse) &&topProse.map((blog) => (
                  <div className="col" key={blog._id}>
                    <div className="homeblog-card">
                      <div style={{ justifyContent: "center", alignContent: "center" }}>
                        <img src={BASE_URL_IMG + blog?.Image} alt="Blog Image" />
                      </div>
                      <div className="homeblog-info">
                        <div className="blogtitlecontent-container">
                          <h2 className="text-start blogtitlecontent">
                            {blog?.title}
                          </h2>
                        </div>
                        <div className="blogcontent-container">
                          <p className="blogcontent ">
                            {blog?.prose}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="waviy-body">
          <div className="waviy">
            <h1>
              NEW<span className="px-3">ARRIVALS</span>
            </h1>
            <hr className="headinghr" />
          </div>
        </section>

        <div className="CardRatingwrap">
          <div className="container">
            <div className="maincardRading">
              {allbook.map((book) => (
                <div className="CardBoxWrap" key={book._id}>
                  <img src={BASE_URL_IMG + book?.Image} className="img-fluid" />
                  <div className="contentWrapcard">
                    <h3 className="cardtext2">{book?.title}</h3>
                    <p className="nametext">Author:{book?.author}</p>
                    <p className="rstext">&#8377;{book?.Book_Price}</p>
                    <div className="radingStar"></div>
                    <Link to={"/single-book/" + `${book?._id}`}>
                      {" "}
                      <button>See the Book</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        <section className="waviy-body">
          <div className="waviy">
            <h1>
              <span className="px-3">BLOGS</span>
            </h1>
            <hr className="headinghr" />
          </div>
        </section>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="CardRatingwrapNew">
            <section>
              <div className="row">
                {featuredBlogs.map((blog) => (
                  <div className="col" key={blog._id}>
                    <div className="homeblog-card">
                      <div style={{ justifyContent: "center", alignContent: "center" }}>
                        <img src={BASE_URL_IMG + blog?.Image} alt="Blog Image" />
                      </div>
                      <div className="homeblog-info">
                        <div className="blogtitlecontent-container">
                          <h2 className="text-start blogtitlecontent">
                            {blog?.title}
                          </h2>
                        </div>
                        <div className="blogcontent-container">
                          <p className="blogcontent ">
                            {blog?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="testimonialApp shadow-lg text-center">
          <h1 className="fs-1 fw-bold text-testi">
            What People Talking About Poetic Atma?
          </h1>
          <Testimonials />
        </div>

        <div className="exampleApp ">
          <Example />
        </div>
        <div className="exampleApp ">
          <Insta />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
