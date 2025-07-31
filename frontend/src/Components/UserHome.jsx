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
import Sidebar from "./Sidebar";
import LeftSidebar from "./LeftSidebar";
import ContentCard from "./ContentCard";

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
  const [topShayari, setTopShayari] = useState([]);
  const [topProse, setTopProse] = useState([]);
  const authenticate = sessionStorage.getItem("authenticate");
  const [quoteData, setQuoteData] = useState(null);

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

    const fetchlatestquote = async () => {
      try {
        const response = await apiServices.getLatestQuote();
        console.log("Quote response:", response.data); // Add for debug
        setQuoteData(response.data.data); // ✅ Correct key
      } catch (error) {
        console.error("Error fetching latest quote:", error);
      }
    };

    const fetchTopSher = async () => {
      try {
        const sherResponse = await apiServices.getFeaturedSher();
        setTopSher(sherResponse.data.topSher);
      } catch (error) {
        setTopSher("Server Error");
      }
    };

    const fetchTopShayari = async () => {
      try {
        const shayariResponse = await apiServices.getTopShayari();
        setTopShayari(shayariResponse.data.topShayari);
      } catch (error) {
        setTopShayari("Server Error");
      }
    };

    const fetchTopProse = async () => {
      try {
        const proseResponse = await apiServices.getTopProse();
        setTopProse(proseResponse.data.topProse);
      } catch (error) {
        setTopProse("Server Error");
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
    fetchlatestquote();
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
    window.scrollTo(0, 0);
  }, []);

  //   useEffect(() => {
  //   fetch(`${BASE_URL_IMG}/latest-quote`)
  //     .then((res) => res.json())
  //     .then((data) => setQuoteData(data));
  // }, []);

  return (
    <>
      <style>
        {`.quote-highlight-section {
  background-color: #fef6f1;
  padding: 4rem 1rem;
}

.quote-box {
  max-width: 800px;
  margin: 0 auto;
  background-color: #fffdfb;
  border-left: 5px solid #e0e0e0;
  border-right: 5px solid #e0e0e0;
  position: relative;
}

.quote-title {
  color: #e65132;
  font-weight: 700;
  font-size: 2rem;
}

.quote-subtitle {
  color: #a28b79;
  font-size: 1rem;
  font-style: italic;
}

.quote-content {
  font-family: 'Noto Serif Devanagari', serif;
  font-size: 1.2rem;
  line-height: 2;
  position: relative;
  padding: 1rem 2rem;
}

.quote-content::before,
.quote-content::after {
  content: '“';
  font-size: 3rem;
  color: #d3d3d3;
  position: absolute;
}

.quote-content::before {
  top: -10px;
  left: -20px;
}

.quote-content::after {
  content: '”';
  bottom: -10px;
  right: -20px;
}

.quote-author {
  font-size: 1.1rem;
}

.quote-icons i {
  font-size: 1.25rem;
  cursor: pointer;
}

.sidebar-section {
  margin-bottom: 2rem;
}


// shayari of the day

.shayari-day-section {
  background: #fffdf5; /* warm off-white */
  font-family: 'Noto Serif', serif;
}

.shayari-box {
  background-color: #fff;
  border: 1px solid #ffeaa7; /* soft yellow border */
  max-width: 750px;
  margin: 0 auto;
  position: relative;
  font-family: 'Noto Serif', serif;
}

.shayari-title {
  font-size: 2.2rem;
  font-weight: bold;
  color: #f4b400; /* deep yellow */
  font-family: 'Playfair Display', serif;
  position: relative;
}

.shayari-title::after {
  content: "";
  width: 60px;
  height: 3px;
  background-color: #f4b400;
  display: block;
  margin: 10px auto 0;
  border-radius: 10px;
}

.shayari-text {
  font-size: 1.4rem;
  color: #444;
  line-height: 2.2;
  position: relative;
  padding: 1rem 1.5rem;
}

.shayari-text::before,
.shayari-text::after {
  font-size: 3rem;
  color: #ffeaa7; /* pale yellow quotes */
  position: absolute;
  font-family: Georgia, serif;
}

.shayari-text::before {
  content: "“";
  top: -25px;
  left: -20px;
}

.shayari-text::after {
  content: "”";
  bottom: -25px;
  right: -20px;
}

.shayari-author {
  color: #f4b400;
  font-size: 1rem;
  font-weight: 500;
}
  .left-sidebar-ads {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  background: #ffffffff;
  border-right: 1px solid #ddd;
  padding: 16px;
}




`}
      </style>
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
            <Marquee
              pauseOnHover
              speed={150}
              gradient={false}
              style={{ overflow: "hidden" }}
            >
              {users
                .filter((data) => data.userId)
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
                      Read Poetry
                    </Link>
                  </div>
                ))}
            </Marquee>
          </div>
        </section>
        <section className="shayari-day-section py-5">
          <div className="container text-center">
            <div className="shayari-box shadow p-5 rounded">
              <h2 className="shayari-title mb-3">🌼 Shayari Of The Day 🌼</h2>
              <blockquote className="shayari-text mx-auto">
                <p className="mb-4">
                  “
                  <strong>
                    DhūñDhne par bhī na miltā thā mujhe apnā vajūd
                  </strong>{" "}
                  <br />
                  maiñ talāsh-e-dost meñ yuuñ be-nishāñ thā dosto”
                </p>
                <footer className="shayari-author mt-3 text-end fst-italic">
                  — Anonymous
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
        {/* ================== START MAIN CONTENT + SIDEBAR WRAP ================== */}
        <div className="container-fluid">
          <div className="row">
            {/* LEFT SIDEBAR (Google AdSense) */}
            <div className="col-lg-3 col-xxl-3 d-none d-lg-block">
              <div className="sidebar-wrapper p-4 bg-white rounded-3 shadow-sm border">
                <LeftSidebar />
              </div>
            </div>

            {/* MAIN CONTENT SECTION */}
            <div className="col-lg-6 col-xxl-6 col-sm-6 col-md-6">
              {/* SHER Section */}
              <section className="waviy-body">
                <div className="waviy">
                  <h1>
                    <span className="px-3">SHER</span>
                  </h1>
                  <hr className="headinghr" />
                </div>
              </section>
              <div className="d-flex justify-content-center align-items-center">
                <div className="CardRatingwrapNew">
                  <section>
                    <div className="row mx-auto">
                      {Array.isArray(topSher) &&
                        topSher.map((item) => (
                          <ContentCard
                            key={item._id}
                            type="sher"
                            item={item}
                            baseUrl={BASE_URL_IMG}
                          />
                        ))}
                    </div>
                  </section>
                </div>
              </div>

              {/* Repeat for SHAYARI */}
              <section className="waviy-body">
                <div className="waviy">
                  <h1>
                    <span className="px-3">SHAYARI</span>
                  </h1>
                  <hr className="headinghr" />
                </div>
              </section>
              <div className="d-flex justify-content-center align-items-center">
                <div className="CardRatingwrapNew custom-width">
                  <section>
                    <div className="row mx-auto">
                      {Array.isArray(topShayari) &&
                        topShayari.map((item) => (
                          <ContentCard
                            key={item._id}
                            type="shayari"
                            item={item}
                            baseUrl={BASE_URL_IMG}
                          />
                        ))}
                    </div>
                  </section>
                </div>
              </div>

              {/* Repeat for PROSE */}
              <section className="waviy-body">
                <div className="waviy">
                  <h1>
                    <span className="px-3">PROSE</span>
                  </h1>
                  <hr className="headinghr" />
                </div>
              </section>
              <div className="d-flex justify-content-center align-items-center">
                <div className="CardRatingwrapNew">
                  <section>
                    <div className="row mx-auto">
                      {Array.isArray(topProse) &&
                        topProse.map((item) => (
                          <ContentCard
                            key={item._id}
                            type="prose"
                            item={item}
                            baseUrl={BASE_URL_IMG}
                          />
                        ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-lg-2 col-xxl-3">
              <Sidebar
                topSher={topSher}
                topShayari={topShayari}
                topProse={topProse}
              />
            </div>
          </div>
        </div>
        {/* ================== END MAIN CONTENT + SIDEBAR WRAP ================== */}
        <section className="quote-highlight-section">
          <div className="quote-box shadow-sm rounded text-center p-4">
            <h2 className="quote-title mb-1">आज का उद्धरण</h2>
            <p className="quote-subtitle mb-4">कवि कह गया है</p>

            <blockquote className="quote-content mx-auto">
              <p className="mb-4">
                {quoteData?.quote || "उद्धरण लोड हो रहा है..."}
              </p>
              <footer className="quote-author text-primary fw-semibold">
                {quoteData?.author || "लेखक"}
              </footer>
            </blockquote>

            <div className="quote-icons mt-3 d-flex justify-content-center gap-3">
              <i className="bi bi-heart-fill text-danger"></i>
              <i className="bi bi-share-fill text-secondary"></i>
            </div>
          </div>
        </section>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="CardRatingwrapNew">
            <section>
              <div className="d-flex flex-wrap">
                {featuredBlogs.map((blog) => (
                  <div className="col-lg-4" key={blog._id}>
                    <div className="homeblog-card">
                      <div
                        style={{
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <img
                          src={BASE_URL_IMG + blog?.Image}
                          alt="Blog Image"
                          onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop
                            e.target.src = "/default_image.jpg";
                          }}
                        />
                      </div>
                      <div className="homeblog-info">
                        <div className="blogtitlecontent-container">
                          <h2 className="text-start blogtitlecontent">
                            {blog?.title}
                          </h2>
                        </div>
                        <div className="blogcontent-container">
                          <p className="blogcontent ">{blog?.description}</p>
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
          {/* <h1 className="fs-1 fw-bold text-testi">
            What People Talking About Poetic Atma?
          </h1> */}
          <Testimonials />
        </div>
        <div className="exampleApp  custom-carousel">
          <Example />
        </div>
        <div className="exampleApp custom-carousel">
          <Insta />
        </div>
        
      </div>
      <ToastContainer />
    </>
  );
}
