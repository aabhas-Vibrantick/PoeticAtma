

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';
// import authenticationImage from '/assets/images/authentication_img.jpeg';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices'
import { toast, ToastContainer } from 'react-toastify'
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect } from 'react';
export default function Shayari(){
  const [allShayariImg, setAllShayariImg] = useState([]);
  const [allPopular, setAllPopular] = useState([]);
  const [allBest, setAllBest] = useState([]);
  const [allHindi, setAllHindi] = useState([]);
  const [allEnglish, setAllEnglish] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const override = {
    display: "block",
    // "margin":"0 auto",
    position: "absolute",
    top: "25%",
    left: "48%",
    zIndex: "1",
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    apiServices.getallShayariImage()
      .then((data) => {
        if (data.data.success) {
          setAllShayariImg(data.data.data);
          // console.log(data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Something went wrong");
      });

    apiServices.getByLanguage()
    .then(response => {
      if (response.data.success) {
        const filteredShayaris = response.data.allhindi.filter((shayari) => shayari.status === true);
        setAllHindi(filteredShayaris);
        // setAllHindi(response.data.allhindi);
      } else {
        // Handle error
        console.error(response.data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

    apiServices.getByEnglish()
    .then(response => {
      if (response.data.success) {
        const filteredShayaris = response.data.allenglish.filter((shayari) => shayari.status === true);
        setAllEnglish(filteredShayaris);
        // setAllEnglish(response.data.allenglish);
        // console.log("english",response)
      } else {
        // Handle error
        console.error(response.data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

    apiServices.getPopularShayari()
      .then((data) => {
        if (data.data.success) {
          const filteredShayaris = data.data.data.filter((shayari) => shayari.status === true);
          setAllPopular(filteredShayaris);
          // setAllPopular(data.data.data);
          // console.log(data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Something went wrong");
      });

    
    apiServices.getBestShayari()
      .then((data) => {
        if (data.data.success) {
          const filteredShayaris = data.data.data.filter((shayari) => shayari.status === true);
          setAllBest(filteredShayaris);
          // setAllBest(data.data.data);
          // console.log(data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Something went wrong");
      });

      const categoryId = '64eb5bb6093a7c8d8a60d174'; 
    apiServices.getShayariByCategory({ Category_id: categoryId })
    .then(response => {
      if (response.data.success) {
        const filteredShayaris = response.data.data.filter((shayari) => shayari.status === true);
        setByCategory(filteredShayaris);
        // setByCategory(response.data.data);
      } else {
        console.error(response.data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [loading]);


    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span className="' + className + '">' + (index + 1) + '</span>';
        },
      };

  
  const [selectedShayari, setSelectedShayari] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (data) => {
    setSelectedShayari(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

    return (
      <>
        <ScaleLoader loading={loading} cssOverride={override} size={70} />
        <div className={loading ? "disable-full-screen" : ""}>
          <div className="container sher">
            <div className=" sher-2 ">
              <h1>SHAYARI COLLECTIONS</h1>
              <p>
                This page brings together countless splendid shayari by noted
                poets handpicked from the long poetic tradition of Urdu. Readers
                can sort these Urdu shayari by poets, topics, emotions etc. and
                see their poetic tastes cultivate like never before.
              </p>
              <hr />
            </div>

            {/* ----------hindi shayari------- */}
            <div className="container sher-1">
              <div className="row sherwraper">
                <div className="col-lg-10">
                  <h4>HINDI SHAYARI COLLECTION </h4>
                </div>
                <div className="col-lg-2 responsiveMode">
                  <Link to="/hindi-shayari"> View More</Link>
                </div>
              </div>

              <div className="first-s">
                <Swiper
                  slidesPerView={2.3}
                  centeredSlides={false}
                  // spaceBetween={75}
                  grabCursor={true}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
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
                  {allHindi.map((data, index) => (
                    <SwiperSlide className="swiperSlide">
                      <Link to={"/single-shayari/" + `${data?._id}`}>
                        <div className="Sher-box">
                          <img
                            className="img-2"
                            src={BASE_URL_IMG + data?.Image}
                          />
                          <p>{data?.title}</p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="sher-1">
              <div className="row sherwraper">
                <div className="col-lg-10">
                  <h4>ENGLISH SHAYARI COLLECTION</h4>
                </div>
                <div className="col-lg-2 responsiveMode">
                  <Link to="/english-shayari"> View More</Link>
                </div>
              </div>
              <hr />

              <div className="first-s">
                <Swiper
                  slidesPerView={2.3}
                  centeredSlides={false}
                  // spaceBetween={75}
                  grabCursor={true}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
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
                  {allEnglish.map((data, index) => (
                    <SwiperSlide className="swiperSlide">
                      <Link to={"/single-shayari/" + `${data?._id}`}>
                        <div className="Sher-box">
                          <img
                            className="img-2"
                            src={BASE_URL_IMG + data?.Image}
                          />
                          <p>{data?.title}</p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="sher-1">
              <div className="row sherwraper">
                <div className="col-lg-10">
                  {" "}
                  <h4>TOP-20 SHAYARI COLLECTION</h4>
                </div>
                <div className="col-lg-2 responsiveMode">
                  <Link to="/top20-shayari"> View More</Link>
                </div>
              </div>

              <hr />
              <div className="first-s">
                <Swiper
                  slidesPerView={2.3}
                  centeredSlides={false}
                  // spaceBetween={75}
                  grabCursor={true}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
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
                  {allPopular.map((data, index) => (
                    <SwiperSlide className="swiperSlide">
                      <Link to={"/single-shayari/" + `${data?._id}`}>
                        <div className="Sher-box">
                          <img
                            className="img-2"
                            src={BASE_URL_IMG + data?.Image}
                          />
                          <p>{data?.title}</p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="sher-1">
              <div className="row sherwraper">
                <div className="col-lg-10">
                  <h4>SHAYARI FOR OCCASION</h4>
                </div>
                <div className="col-lg-2">
                  {" "}
                  <Link to="/occasion-shayari">View More</Link>
                </div>
              </div>

              <hr />
              <div className="first-s">
                <Swiper
                  slidesPerView={2.3}
                  centeredSlides={false}
                  // spaceBetween={75}
                  grabCursor={true}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
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
                  {byCategory.map((data, index) => (
                    <SwiperSlide className="swiperSlide">
                      <Link to={"/single-shayari/" + `${data?._id}`}>
                        <div className="Sher-box">
                          <img
                            className="img-2"
                            src={BASE_URL_IMG + data?.Image}
                          />
                          <p>{data?.title}</p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="sher-1">
              <div className="row sherwraper">
                <div className="col-lg-10">
                  <h4>SHAYARI IMAGE</h4>
                </div>
                <div className="col-lg-2 responsiveMode">
                  <Link to="/shayari-Image"> View More</Link>
                </div>
              </div>

              <div className="first-s">
                <Swiper
                  slidesPerView={2.3}
                  centeredSlides={false}
                  // spaceBetween={75}
                  grabCursor={true}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
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
                  {allShayariImg.map((data, index) => (
                    <SwiperSlide className="swiperSlide">
                      <div
                        className="Sher-box"
                        onClick={() => handleOpenModal(data)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          className="img-2"
                          src={BASE_URL_IMG + data?.Image}
                        />
                        <p>{data?.title}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="sher-1">
              <div className="row sherwraper">
                <div className="col-lg-10">
                  <h4>BEST SHAYARI COLLECTION</h4>
                </div>
                <div className="col-lg-2 responsiveMode">
                  <Link to="/best-shayari"> View More</Link>
                </div>
              </div>

              <hr />
              <div className="first-s">
                <Swiper
                  slidesPerView={2.3}
                  centeredSlides={false}
                  // spaceBetween={75}
                  grabCursor={true}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
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
                  {allBest.map((data, index) => (
                    <SwiperSlide className="swiperSlide">
                      <Link to={"/single-shayari/" + `${data?._id}`}>
                        <div className="Sher-box">
                          <img
                            className="img-2"
                            src={BASE_URL_IMG + data?.Image}
                          />

                          <p>{data?.title}</p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {showModal && selectedShayari && (
                <div className="modal-backdrop" onClick={handleCloseModal}>
                  <img
                    src={BASE_URL_IMG + selectedShayari.Image}
                    alt="Shayari"
                    className="modal-image"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    );
}