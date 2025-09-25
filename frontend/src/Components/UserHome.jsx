import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";
import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import WhatsAppWidget from "./WhatsAppWidget";
import Marquee from "react-fast-marquee";
import Example from "./example";
import Testimonials from "./Testimonials";
import { Swiper, SwiperSlide } from "swiper/react";
import Sidebar from "./Sidebar";
import LeftSidebar from "./LeftSidebar";
import ContentCard from "./ContentCard";
import "./ShayariDay.css";
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
  const [latestShayari, setLatestShayari] = useState(null);
  const [shayariList, setShayariList] = useState([]);

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

    const fetchLatestShayariOfTheDay = async () => {
      try {
        const res = await apiServices.getLatestShayariOfTheDay();
        if (res.data?.success) {
          setLatestShayari(res.data.data); // { _id, shayari, author, ... }
        }
      } catch (err) {
        console.error("Error fetching latest shayari:", err);
      }
    };

    const fetchShayariList = async () => {
      try {
        const res = await apiServices.getAllShayariOfTheDay(); // GET /admin/view-shayari-of-the-day
        if (res.data?.success) {
          // show only active ones (or remove .filter if you want full history)
          const list = res.data.data.filter((s) => s.active);
          setShayariList(list.length ? list : res.data.data.slice(0, 10));
        }
      } catch (e) {
        console.error("Failed to load shayari list", e);
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
    fetchLatestShayariOfTheDay();
    fetchShayariList();
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

  // const shayariData = [
  //   {
  //     text: "फ़ोन तो दूर वहाँ ख़त भी नहीं पहुँचेंगे अब के ये लोग तुम्हें ऐसी जगह भेजेंगे",
  //     author: "Anonymous",
  //   },
  //   {
  //     text: "Dil ke armānoñ kī manzil ek khwāb ban gayī <br /> har ek ummīd kī rāhein khāmosh ho gayī",
  //     author: "Mirza Ghalib",
  //   },
  //   {
  //     text: "Zindagī ek safar hai suhānā <br /> yahāñ har pal hai ek nayā fasānā",
  //     author: "Unknown",
  //   },
  // ];

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




.heading-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* optional for mobile */
}

/* Your custom button */
.custom-yellow-btn  {
  background-color: #FFD700; /* Yellow */
  color: #000;               /* Black text */
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
 
}

/* Hover effect */
.custom-yellow-btn:hover {
  background-color: #e6c200;
}



.custom-padding{
   padding: 0px 15px;
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
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper-crousel"
          >
            <SwiperSlide className="homeswiper-slide">
              <img src="/assets/images/authentication_img.jpeg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              <img src="/assets/images/bannerImage.jpg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/authentication_img.jpeg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/bannerImage.jpg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/authentication_img.jpeg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/bannerImage.jpg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/authentication_img.jpeg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/bannerImage.jpg" />
            </SwiperSlide>
            <SwiperSlide className="homeswiper-slide">
              {" "}
              <img src="/assets/images/authentication_img.jpeg" />
            </SwiperSlide>
          </Swiper>
        </div>
        {/* FULL-WIDTH HORIZONTAL SECTION WITH IMAGE */}
<div className="w-100 bg-white shadow-sm border ">
  <img
    src="/adds.jpg"
    alt="Advertisement"
    className="img-fluid w-100 "
    style={{  objectFit: "cover" }}
  />
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
                      <Link to={`/poets-profile/${data.slug}`}>
                        <img
                          src={BASE_URL_IMG + (data.Image || "avtar.png")}
                          className="img-fluid"
                          alt="img..."
                          style={{ height: "100%" }} 
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
                      to={`/poets-profile/${data.slug}`}
                    >
                      Read Poetry
                    </Link>
                  </div>
                ))}
            </Marquee>
          </div>
        </section>
        
        <div className="row align-items-center shayari-row custom-padding">
  {/* LEFT AD */}
  <div className="col-lg-2 col-xxl-2 d-none d-lg-flex justify-content-center">
    <img
      src="/Add.jpg"
      className="img-fluid rounded-3 border shadow-sm ad-side-img"
      alt="Advertisement"
    />
  </div>

  {/* CENTER SHAYARI */}
  <div className="col-12 col-lg-8">
    <section className="shayari-day-section py-4">
      <div className="shayari-swiper-container text-center">
        <h2 className="shayari-title mb-4">🌼 Shayari Of The Day 🌼</h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
        >
          {shayariList.map((item, index) => (
            <SwiperSlide key={item._id || index}>
              <div className="shayari-box shadow p-4 rounded">
                <blockquote className="shayari-text mx-auto">
                  <p
                    className="mb-4"
                    dangerouslySetInnerHTML={{ __html: item.shayari }}
                  />
                  <footer className="shayari-author mt-3 text-end fst-italic">
                    — {item.author || "Anonymous"}
                  </footer>
                </blockquote>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  </div>

  {/* RIGHT AD */}
  <div className="col-lg-2 col-xxl-2 d-none d-lg-flex justify-content-center">
    <img
      src="/Add.jpg"
      className="img-fluid rounded-3 border shadow-sm ad-side-img"
      alt="Advertisement"
    />
  </div>
</div>



        
        {/* ================== START MAIN CONTENT + SIDEBAR WRAP ================== */}
        <div className="container-fluid">
          <div className="row">
            {/* LEFT SIDEBAR (Google AdSense) */}
            <div className="col-lg-2 col-xxl-2 d-none d-lg-block">
              <div className="bg-white rounded-3 shadow-sm border">
                <LeftSidebar />
              </div>
            </div>

            {/* MAIN CONTENT SECTION */}
            <div className="col-lg-8 col-xxl-8 col-md-12  ">
              {/* SHER Section */}
              <section className="waviy-body">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  {/* Title */}
                  <div className="waviy">
                    <h1 className="m-0">
                      <span className="px-3">SHER</span>
                    </h1>
                  </div>
                </div>
                <hr className="headinghr mt-2" />
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
                    <div className="col-12 d-flex justify-content-center mt-3">
                      <Link to="/shers" className="btn custom-yellow-btn">
                        View More
                      </Link>
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
                    <div className="col-12 d-flex justify-content-center mt-3">
                      <Link to="/shayari" className="btn custom-yellow-btn">
                        View More
                      </Link>
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
                    <div className="col-12 d-flex justify-content-center mt-3">
                      <Link to="/prose" className="btn custom-yellow-btn">
                        View More
                      </Link>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-lg-2 col-xxl-2">
              <Sidebar
                topSher={topSher}
                topShayari={topShayari}
                topProse={topProse}
              />
            </div>
          </div>
        </div>
        {/* ================== END MAIN CONTENT + SIDEBAR WRAP ================== */}
        <section className="poetry-week-section py-5">
          <div className="container">
            <div
              className="poetry-box shadow-lg rounded-4 text-center p-5 mx-auto"
              style={{
                maxWidth: "800px",
                background: "linear-gradient(135deg, #faf8f5, #fefefe)",
                border: "1px solid #eaeaea",
              }}
            >
              {/* Title */}
              <h2
                className="poetry-title mb-3 fw-bold"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                }}
              >
                ✨ Top Poetry Of The Week ✨
              </h2>
              <p
                className="poetry-subtitle mb-5 text-muted fst-italic"
                style={{ fontFamily: "'Merriweather', serif" }}
              >
                कवि कह गया है
              </p>

              {/* Quote */}
              <blockquote className="poetry-content mx-auto">
                <p
                  className="mb-4 fs-3 fst-italic lh-lg text-dark"
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  {quoteData?.quote || "उद्धरण लोड हो रहा है..."}
                </p>
                <footer
                  className="poetry-author fw-semibold text-primary"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  — {quoteData?.author || "लेखक"}
                </footer>
              </blockquote>

              {/* Minimal Line Divider */}
              {/* <div className="my-4" style={{ width: "60px", height: "2px", background: "#555", margin: "0 auto" }}></div> */}

              {/* Like & Share */}
              <div className="poetry-icons mt-3 d-flex justify-content-center gap-4">
                <i
                  className="bi bi-heart-fill text-danger fs-4"
                  style={{ cursor: "pointer" }}
                ></i>
                <i
                  className="bi bi-share-fill text-secondary fs-4"
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
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
        <div className="d-flex justify-content-center align-items-center">
          <div className="CardRatingwrapNew">
            <section>
              <div className="row mx-auto">
                {Array.isArray(featuredBlogs) &&
                  featuredBlogs.map((blog) =>
                    blog.slug ? (
                      <ContentCard
                        key={blog._id}
                        type="blog"
                        item={blog}
                        baseUrl={BASE_URL_IMG}
                      />
                    ) : null
                  )}
              </div>

              <div className="col-12 d-flex justify-content-center mt-3">
                <Link to="/blogs" className="btn custom-yellow-btn">
                  View More
                </Link>
              </div>
            </section>
          </div>
        </div>

        <div className="testimonialApp  text-center">
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
        {/* <WhatsAppWidget /> */}
      </div>
      <ToastContainer />
    </>
  );
}
