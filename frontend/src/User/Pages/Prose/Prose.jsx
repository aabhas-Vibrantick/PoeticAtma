

import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices'
import { toast, ToastContainer } from 'react-toastify'
import ScaleLoader from "react-spinners/ScaleLoader";
export default function Prose() {

  const [allProseImg, setAllProseImg] = useState([]);
  const [allPopular, setAllPopular] = useState([]);
  const [allBest, setAllBest] = useState([]);
  const [allHindi, setAllHindi] = useState([]);
  const [allEnglish, setAllEnglish] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [loading, setLoading] = useState();

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
    apiServices.getallProseImage()
      .then((data) => {
        if (data.data.success) {
          setAllProseImg(data.data.data);
          // // console.log(data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        // // console.log(err);
        toast.error("Something went wrong");
      });

    const categoryId = '65115f1e2a54efb15c3cbb41';
    apiServices.getProseByCategory({ Category_id: categoryId })
      .then(response => {
        if (response.data.success) {
          const filteredProses = response.data.data.filter((prose) => prose.status === true);
          setByCategory(filteredProses);
          // setByCategory(response.data.data);
        } else {
          // console.error(response.data.message);
        }
      })
      .catch(error => {
        // console.error('Error:', error);
      });

    apiServices.getproseByHindi()
      .then(response => {
        if (response.data.success) {
          // const filteredProses = response.data.allhindi.filter((prose) => prose.status === true);
          // setAllHindi(filteredProses);
          setAllHindi(response.data.allhindi);
        } else {
          // Handle error
          // console.error(response.data.message);
        }
      })
      .catch(error => {
        // console.error('Error:', error);
      });

    apiServices.getproseByEnglish()
      .then(response => {
        if (response.data.success) {
          const filteredProses = response.data.allenglish.filter((prose) => prose.status === true);
          setAllEnglish(filteredProses);
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

    apiServices.getPopularProse()
      .then((data) => {
        if (data.data.success) {
          const filteredProses = data.data.data.filter((prose) => prose.status === true);
          setAllPopular(filteredProses);
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

    apiServices.getBestProse()
      .then((data) => {
        if (data.data.success) {
          const filteredProses = data.data.data.filter((prose) => prose.status === true);
          setAllBest(filteredProses);
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


  }, [loading]);




  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span className="' + className + '">' + (index + 1) + '</span>';
    },
  };

  const [selectedProse, setSelectedProse] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    const handleOpenModal = (data) => {
      setSelectedProse(data);
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
            <h1>PROSE COLLECTIONS</h1>
            <p>
              This page brings together countless splendid prose by noted poets
              handpicked from the long poetic tradition of Urdu. Readers can
              sort these Urdu prose by poets, topics, emotions etc. and see
              their poetic tastes cultivate like never before.
            </p>
            <hr />
          </div>

          <div className="sher-1">
            <div className="row sherwraper">
              <div className="col-lg-10">
                <h4>HINDI PROSE COLLECTION</h4>
              </div>
              <div className="col-lg-2 responsiveMode">
                <Link to="/hindi-prose"> View More</Link>
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
                    <Link to={"/single-prose/" + `${data?._id}`}>
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
                <h4>ENGLISH PROSE COLLECTION</h4>
              </div>
              <div className="col-lg-2 responsiveMode">
                <Link to="/english-prose"> View More</Link>
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
                    <Link to={"/single-prose/" + `${data?._id}`}>
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
                <h4>TOP-10 PROSE COLLECTION</h4>
              </div>
              <div className="col-lg-2 responsiveMode">
                <Link to="/top20-prose"> View More</Link>
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
                    <Link to={"/single-prose/" + `${data?._id}`}>
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
                <h4>PROSE FOR FICTION</h4>
              </div>
              <div className="col-lg-2 responsiveMode">
                <Link to="/occasion-prose"> View More</Link>
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
                    <Link to={"/single-prose/" + `${data?._id}`}>
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
                <h4>PROSE IMAGE</h4>
              </div>
              <div className="col-lg-2 responsiveMode">
                <Link to="/prose-Image"> View More</Link>
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
                {allProseImg.map((data, index) => (
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
                <h4>BEST Prose COLLECTION</h4>
              </div>
              <div className="col-lg-2 responsiveMode">
                <Link to="/best-prose"> View More</Link>
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
                    <Link to={"/single-prose/" + `${data?._id}`}>
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
            {showModal && selectedProse && (
              <div className="modal-backdrop" onClick={handleCloseModal}>
                <img
                  src={BASE_URL_IMG + selectedProse.Image}
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
