import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import LifeBlog from "./LifeBlog";
import { format } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useLocation } from "react-router-dom";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';
import SpritualBlog from "./SpritualBlog";
import SorrowBlog from "./SorrowBlog";
import LoveBlog from "./LoveBlog";
const parse = require("html-react-parser");

export default function Blog() {
  const [allBlog, setAllBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const [alllatest, setAlllatest] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const override = {
    display: "block",
    // "margin":"0 auto",
    position: "absolute",
    top: "25%",
    left: "48%",
    zIndex: "1",
  };

  const location = useLocation();
  const categoryFromState = location.state?.category || null;


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    apiServices
      .getallblog()
      .then((data) => {
        if (data.data.success) {
          //console.log(data.data);
          const filteredBlogs = data.data.data.filter(
            (blog) => blog.status === true && !blog.isFeatured
          );
          console.log("All Blog API Response:", data.data);
          setAllBlog(filteredBlogs);

          if (categoryFromState) {
            switch (categoryFromState.toLowerCase()) {
              case "life":
                setActiveTab(2);
                break;
              case "spiritual":
                setActiveTab(3);
                break;
              case "love":
                setActiveTab(4);
                break;
              case "sorrow":
                setActiveTab(5);
                break;
              default:
                setActiveTab(1);
            }
          }
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });

    apiServices
      .latestBlog()
      .then((data) => {
        if (data.data.success) {
          const filteredBlogs = data.data.data.filter(
            (blog) => blog.status === true && !blog.isFeatured
          );
          setAlllatest(filteredBlogs);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  }, [loading]);

  //search handle
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const performSearch = (query) => {
    const filteredResults = allBlog.filter((blog) => {
      const fullName = blog.title + blog.tag + blog.description;
      return fullName.toLowerCase().includes(query.toLowerCase());
    });

    setSearchResults(filteredResults);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery === '') {
      setSearchResults(allBlog);
    } else {
      performSearch(searchQuery);
    }
  };

  return (
    <>
      <ScaleLoader loading={loading} cssOverride={override} size={70} />
      <div className={`bloggray-bg  ${loading ? "disable-full-screen" : ""}`}>
        {/* <!--blog banner start--> */}

        {/* <section className="waviy-body">
        <div className="waviy">
        <h1 >OUR<span className="px-3">BLOGS</span></h1><hr className="headinghr"/>
        </div>
      </section> */}

        <section id="blogcat" className="container">
          <div className="sher-1">
            <div className="first-s">
              <Swiper
                slidesPerView={2.3}
                centeredSlides={false}
                // spaceBetween={75}
                grabCursor={true}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                <SwiperSlide className='swiperSlide'>
                  <div onClick={() => handleTabChange(1)} className={`  ${activeTab === 1 && 'active'}`} id="image-container">
                    <button className="blogButton" role="button">All</button>
                    {/*
                  <img className='img-1' src='/assets/images/download (2).jpg' alt='Image Description' />
                  <div className='' id="image-text1">All</div>
                  */}
                  </div>
                </SwiperSlide>
                <SwiperSlide className='swiperSlide'>
                  <div onClick={() => handleTabChange(2)} className={`  ${activeTab === 2 && 'active'}`} id="image-container">
                    <button className="blogButton" role="button">Life</button>
                    {/*
                    <img className='img-1' src='/assets/images/download (2).jpg' alt='Image Description' />
                    <div className='' id="image-text2">Life</div>
                    */}
                  </div>
                </SwiperSlide>
                <SwiperSlide className='swiperSlide'>
                  <div onClick={() => handleTabChange(3)} className={`  ${activeTab === 3 && 'active'}`} id="image-container">
                    <button className="blogButton" role="button">Spiritual</button>
                    {/*
                  <img className='img-1' src='/assets/images/download (2).jpg' alt='Image Description' />
                  <div className='' id="image-text3">Spiritual</div>
                  */}
                  </div>
                </SwiperSlide>
                <SwiperSlide className='swiperSlide'>
                  <div onClick={() => handleTabChange(4)} className={`  ${activeTab === 4 && 'active'}`} id="image-container">
                    <button className="blogButton" role="button">Love</button>
                    {/*
                    <img className='img-1' src='/assets/images/download (2).jpg' alt='Image Description' />
                    <div className='' id="image-text4">Love</div>
                    */}
                  </div>
                </SwiperSlide>
                <SwiperSlide className='swiperSlide'>
                  <div onClick={() => handleTabChange(5)} className={`  ${activeTab === 5 && 'active'}`} id="image-container">
                    <button className="blogButton" role="button">Sorrow</button>
                    {/*
                    <img className='img-1' src='/assets/images/download (2).jpg' alt='Image Description' />
                    <div className='' id="image-text5">Sorrow</div>
                    */}
                  </div>
                </SwiperSlide>

              </Swiper>
            </div>
          </div>
        </section>


        <div className=" bloggray-bg">
          <div className="container">
            <div className="row ">
              <div className="col-lg-8  blogwraparticle">
                {activeTab === 1 && <div>
                  <div className="row mx-auto blogWraper">
  {searchResults.length > 0
    ? searchResults.map((item) => {
        const slug = item?.slug || item?._id;
        return (
          <div className="col-lg-6 main-blogcard" key={item?._id}>
            <div className="homeblog-card">
              <Link to={`/single-blog/${encodeURIComponent(slug)}`}>
                <img
                  src={BASE_URL_IMG + (item?.Image || "no-image.jpg")}
                  alt={item?.title || "Blog Image"}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/default_image.jpg";
                  }}
                />
              </Link>
              <div className="homeblog-info">
                <Link to={`/single-blog/${encodeURIComponent(slug)}`}>
                  <div className="blogtitlecontent-container">
                    <h2 className="text-start blogtitlecontent">{item?.title}</h2>
                  </div>
                  <div className="blogcontent-container">
                    <p className="blogcontent ">{item?.description}</p>
                  </div>
                  <div className="homedate-time">
                    {/* <span className="date">{format(new Date(item.created_at), 'MMMM d, yyyy')}</span> */}
                  </div>
                </Link>
                <div className="homesocial-icons">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <br />
                  <a href="#" className="text-muted">Connect on other social media</a>
                </div>
              </div>
            </div>
          </div>
        );
      })
    : allBlog.map((item) => {
        const slug = item?.slug || item?._id;
        return (
          <div className="col-lg-6 main-blogcard" key={item?._id}>
            <div className="homeblog-card">
              <Link to={`/single-blog/${encodeURIComponent(slug)}`}>
                <img
                  src={BASE_URL_IMG + (item?.Image || "no-image.jpg")}
                  alt={item?.title || "Blog Image"}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/default_image.jpg";
                  }}
                />
              </Link>
              <div className="homeblog-info">
                <Link to={`/single-blog/${encodeURIComponent(slug)}`}>
                  <div className="blogtitlecontent-container">
                    <h2 className="text-start blogtitlecontent">{item?.title}</h2>
                  </div>
                  <div className="blogcontent-container">
                    <p className="blogcontent ">{item?.description}</p>
                  </div>
                  <div className="homedate-time">
                    {/* <span className="date">{format(new Date(item.created_at), 'MMMM d, yyyy')}</span> */}
                  </div>
                </Link>
                <div className="homesocial-icons">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <br />
                  <a href="#" className="text-muted">Connect on other social media</a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
</div>

                </div>}
                {activeTab === 2 && <div>

                  <LifeBlog />
                </div>}

                {activeTab === 3 && <div>
                  <SpritualBlog />
                </div>}
                {activeTab === 4 && <div> <LoveBlog /></div>}
                {activeTab === 5 && <div> <SorrowBlog /></div>}
              </div>
              <div className="col-lg-4 m-15px-tb blog-aside">
                {/* <!-- Author --> */}
                <div className="widget widget-author">
                  <div className="search-1  ">
                    <form onSubmit={handleSearch}>
                      <input type="search" placeholder="Search" value={searchQuery}
                        onChange={handleSearchQueryChange} required="" />
                      <input type="submit" value="." />
                    </form>
                  </div>
                </div>
                {/* <!-- End Author --> */}
                {/* <!-- Trending Post --> */}
                {/* <div className="widget widget-post">
                        <div className="widget-title">
                            <h3>Trending Now</h3>
                        </div>
                        <div className="widget-body">

                        </div>
                    </div> */}
                {/* <!-- End Trending Post --> */}
                {/* <!-- Latest Post --> */}
                <div className="widget widget-latest-post">
                  <div className="widget-title">
                    <h3>Latest Post</h3>
                  </div>
                  <div className="widget-body">
                    {alllatest.map((item) => {
  const slug = item?.slug || item?._id; // fallback for older records
  return (
    <div className="latest-post-aside media" key={item?._id}>
      <div className="lpa-left media-body">
        <div className="lpa-title">
          <h5 className="shayaricontent-container2">
            <Link className="shayaricontent2" to={`/single-blog/${encodeURIComponent(slug)}`}>
              {item?.description}
            </Link>
          </h5>
        </div>
        <div className="lpa-meta">
          <Link className="name" to={`/poets-profile/${item?.userId?._id}`}>
            {item?.userId?.name || "Admin"}
          </Link>
        </div>
      </div>
      <div className="lpa-right">
        <Link to={`/single-blog/${encodeURIComponent(slug)}`}>
          <img
            src={BASE_URL_IMG + (item?.Image || "no-image.jpg")}
            alt={item?.title || "blog"}
            className=""
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/default_image.jpg";
            }}
          />
        </Link>
      </div>
    </div>
  );
})}

                  </div>
                </div>
                {/* <!-- End Latest Post --> */}
                {/* <!-- widget Tags --> */}
                {/* <div className="widget widget-tags">
                        <div className="widget-title">
                            <h3>Latest Tags</h3>
                        </div>
                        <div className="widget-body">
                            <div className="nav tag-cloud">
                                <a href="#">Design</a>
                                <a href="#">Development</a>
                                <a href="#">Travel</a>
                                <a href="#">Web Design</a>
                                <a href="#">Marketing</a>
                                <a href="#">Research</a>
                                <a href="#">Managment</a>
                            </div>
                        </div>
                    </div> */}
                {/* <!-- End widget Tags --> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
