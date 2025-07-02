// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices'
import { toast, ToastContainer } from 'react-toastify'
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Sher() {
  const [allSherImg, setAllSherImg] = useState([]);
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
    }, 3000);
    apiServices.getPopularSher()
      .then((data) => {
        if (data.data.success) {
          const filteredShers = data.data.data.filter((sher) => sher.status === true);
          setAllPopular(filteredShers);
          // setAllPopular(data.data.data);
          // // console.log(data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        // // console.log(err);
        toast.error("Something went wrong");
      });

    apiServices.getBestSher()
      .then((data) => {
        if (data.data.success) {
          const filteredShers = data.data.data.filter((sher) => sher.status === true);
          setAllBest(filteredShers);
          // setAllBest(data.data.data);
          // // console.log(data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        // // console.log(err);
        toast.error("Something went wrong");
      });
    apiServices.getallSherImage()
      .then((data) => {
        if (data.data.success) {

          setAllSherImg(data.data.data);
          // // console.log(data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        // // console.log(err);
        toast.error("Something went wrong");
      });

    const categoryId = '64ed9cfc6ce8afe231722993';
    apiServices.getSherByCategory({ Category_id: categoryId })
      .then(response => {
        if (response.data.success) {
          const filteredShers = response.data.data.filter((sher) => sher.status === true);
          setByCategory(filteredShers);
          // setByCategory(response.data.data);
        } else {
          // console.error(response.data.message);
        }
      })
      .catch(error => {
        // console.error('Error:', error);
      });

    apiServices.getsherByHindi()
      .then(response => {
        if (response.data.success) {
          const filteredShers = response.data.allhindi.filter((sher) => sher.status === true);
          setAllHindi(filteredShers);
          // setAllHindi(response.data.allhindi);
        } else {
          // Handle error
          // console.error(response.data.message);
        }
      })
      .catch(error => {
        // console.error('Error:', error);
      });

    apiServices.getsherByEnglish()
      .then(response => {
        if (response.data.success) {
          const filteredShers = response.data.allenglish.filter((sher) => sher.status === true);
          setAllEnglish(filteredShers);
          // setAllEnglish(response.data.allenglish);
          // // console.log("english",response)
        } else {
          // Handle error
          // console.error(response.data.message);
        }
      })
      .catch(error => {
        // console.error('Error:', error);
      });
  }, [loading]);


  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span className="' + className + '">' + (index + 1) + '</span>';
    },
  };

  const [selectedSher, setSelectedSher] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    const handleOpenModal = (data) => {
      setSelectedSher(data);
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
            <h1>SHER COLLECTIONS</h1>
            <p>
              This page brings together countless splendid sher by noted poets
              handpicked from the long poetic tradition of Urdu. Readers can
              sort these Urdu sher by poets, topics, emotions etc. and see their
              poetic tastes cultivate like never before.
            </p>
            <hr />
          </div>

          {/* <div className="sher-1">
            <h4>TRENDING TAGS</h4>
            <p>Looking for a sher centering around a particular emotion, feeling, subject or topic? Look no further!
            </p>
            <a>View More</a>
            <hr/>
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
        
        pagination={
           
            pagination
          }
          navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className='swiperSlide'><img className='img-1 card' src='/assets/images/download (2).jpg' /></SwiperSlide>
        <SwiperSlide className='swiperSlide'><img className='img-1 card' src='/assets/images/download (2).jpg' /></SwiperSlide>
        <SwiperSlide className='swiperSlide'><img className='img-1 card' src='/assets/images/download (2).jpg' /></SwiperSlide>
        <SwiperSlide className='swiperSlide'><img className='img-1 card' src='/assets/images/download (2).jpg' /></SwiperSlide>
        <SwiperSlide className='swiperSlide'><img className='img-1 card' src='/assets/images/download (2).jpg' /></SwiperSlide>
        <SwiperSlide className='swiperSlide'><img className='img-1 card' src='/assets/images/download (2).jpg' /></SwiperSlide>
        <SwiperSlide className='swiperSlide'><img className='img-1 card' src='/assets/images/download (2).jpg' /></SwiperSlide>
        <SwiperSlide className='swiperSlide'><img className='img-1 card' src='/assets/images/download (2).jpg' /></SwiperSlide>
        <SwiperSlide className='swiperSlide'><img className='img-1 card' src='/assets/images/download (2).jpg' /></SwiperSlide>
        <SwiperSlide className='swiperSlide'><img className='img-1 card' src='/assets/images/download (2).jpg' /></SwiperSlide>
        <SwiperSlide className='swiperSlide'><img className='img-1' src='/assets/images/download (2).jpg' /></SwiperSlide>
        
      </Swiper>  
            </div>
          </div> */}

          <div className="sher-1">
            <div className="row sherwraper">
              <div className="col-lg-10">
                <h4>Hindi SHER COLLECTION</h4>
              </div>
              <div className="col-lg-2 responsiveMode">
                <Link to="/hindi-sher"> View More</Link>
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
                {allHindi.map((data, index) => (
                  <SwiperSlide className="swiperSlide">
                    <Link to={"/single-sher/" + `${data?._id}`}>
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
                <h4>ENGLISH SHER COLLECTION</h4>
              </div>
              <div className="col-lg-2 responsiveMode">
                <Link to="/english-sher"> View More</Link>
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
                    <Link to={"/single-sher/" + `${data?._id}`}>
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
                <h4>TOP-20 SHER COLLECTION</h4>
              </div>
              <div className="col-lg-2 responsiveMode">
                <Link to="/top20-sher"> View More</Link>
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
                    <Link to={"/single-sher/" + `${data?._id}`}>
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
                <h4>SHER FOR OCCASION</h4>
              </div>
              <div className="col-lg-2 responsiveMode">
                <Link to="/occasion-sher"> View More</Link>
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
                    <Link to={"/single-sher/" + `${data?._id}`}>
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
                <h4>SHER IMAGE</h4>
              </div>
              <div className="col-lg-2 responsiveMode">
                <Link to="/sher-Image"> View More</Link>
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
                {allSherImg.map((data, index) => (
                  <SwiperSlide className="swiperSlide">
                    <div
                      className="Sher-box"
                      onClick={() => handleOpenModal(data)}
                      style={{ cursor: "pointer" }}
                    >
                      <img className="img-2" src={BASE_URL_IMG + data?.Image} />
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
                <h4>BEST SHER COLLECTION</h4>
              </div>
              <div className="col-lg-2">
                <Link to="/best-sher"> View More</Link>
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
                    <Link to={"/single-sher/" + `${data?._id}`}>
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
            {showModal && selectedSher && (
              <div className="modal-backdrop" onClick={handleCloseModal}>
                <img
                  src={BASE_URL_IMG + selectedSher.Image}
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