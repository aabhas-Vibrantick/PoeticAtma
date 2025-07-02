import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import { Link } from "react-router-dom";
import { useEffect } from "react";
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { useReducedMotionConfig } from "framer-motion";
import { format } from 'date-fns';
import { Button } from "react-bootstrap";

export default function Porfile() {
  const parse = require("html-react-parser");

  const [allshayari, setAllShayari] = useState([]);
  const [allsher, setAllSher] = useState([]);
  const [allprose, setAllProse] = useState([]);
  const [allBlog, setAllBlog] = useState([]);
  const [allEnglishShayari, setAllEnglishShayari] = useState([]);
  const [allEnglishSher, setAllEnglishSher] = useState([]);
  const [allEnglishProse, setAllEnglishProse] = useState([]);
  const [allHindiShayari, setAllHindiShayari] = useState([]);
  const [allHindiSher, setAllHindiSher] = useState([]);
  const [allHindiProse, setAllHindiProse] = useState([]);
  const [userDetail, setUserDetail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [userId, setUserId] = useState(" ");
  const [loading, setLoading] = useState(true);
  const [followerCount, setFollowerCount] = useState(null);
  const [followingCount, setFollowingCount] = useState(null);
  const authenticate = sessionStorage.getItem('authenticate')

  const handleReadMoreClick = () => {
    if (!authenticate) {
      window.location.href = '/login';
      toast.error("Please Sign In to Continue!")
    }
  };

  const override = {
    display: "block",
    margin: "0 auto",
    position: "absolute",
    top: "30%",
    left: "48%",
    zIndex: "1",
  };

  const param = useParams();

  useEffect(() => {
    let data = {
      userId: param.userId,
    };

    setTimeout(() => {
      setLoading(false);
    }, 1500);

    apiServices
      .getsinglecustomer(data)
      .then((data) => {
        if (data.data.success) {
          setUserId(data.data.data.userId._id);
          setUserDetail(data.data.data);
          setUserEmail(data.data.data.email);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });

    const unique = { userId: param.userId };

    apiServices
      .getallshayaribyUserId(unique)
      .then((data) => {
        if (data.data.success) {
          const filteredShayaris = data.data.data.filter((shayari) => shayari.status === true);
          setAllShayari(filteredShayaris);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });

    apiServices
      .getallsherbyUserId(unique)
      .then((data) => {
        if (data.data.success) {
          const filteredShers = data.data.data.filter((sher) => sher.status === true);
          setAllSher(filteredShers);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });

    apiServices
      .getallprosebyUserId(unique)
      .then((data) => {
        if (data.data.success) {
          const filteredProses = data.data.data.filter((prose) => prose.status === true);
          setAllProse(filteredProses);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });

    apiServices
      .getallblogbyUserId(unique)
      .then((data) => {
        if (data.data.success) {
          const filteredBlogs = data.data.data.filter((blog) => blog.status === true);
          setAllBlog(filteredBlogs);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });

    apiServices
      .getenglishShayariByUserId(unique)
      .then((response) => {
        if (response.data.success) {
          const filteredShayaris = response.data.allenglish.filter((shayari) => shayari.status === true);
          setAllEnglishShayari(filteredShayaris);
        } else {
        }
      })
      .catch((error) => {
      });

    apiServices
      .getenglishSherByUserId(unique)
      .then((response) => {
        if (response.data.success) {
          const filteredShers = response.data.allenglish.filter((sher) => sher.status === true);
          setAllEnglishSher(filteredShers);
        } else {
        }
      })
      .catch((error) => {
      });

    apiServices
      .getenglishProseByUserId(unique)
      .then((response) => {
        if (response.data.success) {
          const filteredProses = response.data.allenglish.filter((prose) => prose.status === true);
          setAllEnglishProse(filteredProses);
        } else {
        }
      })
      .catch((error) => {
      });

    apiServices
      .gethindiShayariByUserId(unique)
      .then((response) => {
        if (response.data.success) {
          const filteredShayaris = response.data.allhindi.filter((shayari) => shayari.status === true);
          setAllHindiShayari(filteredShayaris);
        } else {
        }
      })
      .catch((error) => {
      });

    apiServices
      .gethindiSherByUserId(unique)
      .then((response) => {
        if (response.data.success) {
          const filteredShers = response.data.allhindi.filter((sher) => sher.status === true);
          setAllHindiSher(filteredShers);
        } else {
        }
      })
      .catch((error) => {
      });

    apiServices
      .gethindiProseByUserId(unique)
      .then((response) => {
        if (response.data.success) {
          const filteredProses = response.data.allhindi.filter((prose) => prose.status === true);
          setAllHindiProse(filteredProses);
        } else {
        }
      })
      .catch((error) => {
      });


    apiServices
      .getFollowCountsForUser(unique)
      .then(response => {
        const data = response.data.data;
        setFollowerCount(data.followerCount);
        setFollowingCount(data.followingCount);
      })
      .catch(error => {
      });
  }, [userId]);

  const uniquefollow = { followerId: userId };

  const handleFollow = (e) => {
    e.preventDefault();

    if (!isFollowing) {
      apiServices
        .followUser(uniquefollow)
        .then((response) => {
          setIsFollowing(true);
        })
        .catch((error) => {
          toast.error("Error following user");
        });
    } else {
      apiServices
        .unfollowUser(uniquefollow)
        .then((response) => {
          setIsFollowing(false);
        })
        .catch((error) => {
          toast.error("Error unfollowing user");
        });
    }
  };

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleToggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const handleSearch = () => {
    console.log("Searching with Filters : ", {
      title,
      category,
      tag,
      sortOption,
    });
  };

  const handleClearFilters = () => {
    setTitle("");
    setCategory("");
    setTag("");
    setSortOption("");
  };

  return (
    <>
      <div>
        <ScaleLoader loading={loading} cssOverride={override} size={70} />
      </div>

      <div className={loading ? "disable-full-screen" : ""}>
        <div className="row">
          <div className=" text-center">
            <div className="poet-container">

              <img
                src={BASE_URL_IMG + userDetail?.Image || "/assets/images/avtar.png"}
                className="img-circle img-thumbnail img-user img-fluid"
                alt="img..."
                onError={(e) => {
                  e.target.src = '/assets/images/avtar.png';
                }}
              />

              <div className="content">
                <ul className="brands brands-inline hidden-xs">
                  <li>
                    <a href={userDetail?.facebook || "#"} target="_blank">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={userDetail?.twiter || "#"} target="_blank">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                </ul>
                <h2 className="" id="namename">
                  @{userDetail?.name}
                  <span>{userDetail?.penname}</span>
                  {userDetail?.bedgeverify ? (
                    <img
                      src="/quality.png"
                      alt="Verified Badge"
                      className="badge-image"
                    />
                  ) : null}
                </h2>


                <ul className="brands brands-inline hidden-xs">
                  <li>
                    <a href={userDetail?.instagram || "#"} target="_blank">

                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href={userDetail?.linkdin || "#"} target="_blank">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
                <p className="">{userDetail?.bio}</p>
              </div>

              <div className="row follow-button-1">
                <a href="" className="btn-1  text-light">
                  <span>{followingCount !== null ? followingCount : 'Loading...'}</span> Followers
                </a>
                <a href="" className="btn-1  text-light">
                  <span>{followerCount !== null ? followerCount : 'Loading...'}</span> Following
                </a>

              </div>
              {authenticate ? (
                <>
                  <div className="row follow-button-2">
                    {isFollowing ? (
                      <a
                        href=""
                        className="btn-3 btn-warning btn-lg text-dark "
                        onClick={handleFollow}
                      >
                        <i className="fa-solid fa-user-check"></i>
                        Following
                      </a>
                    ) : (
                      <a
                        href=""
                        className="btn-3 btn-light btn-lg text-dark "
                        onClick={handleFollow}
                      >
                        <i className="fa-solid fa-user-plus"></i>
                        <span style={{ paddingLeft: 8, }}>
                          Follow
                        </span>
                      </a>
                    )}

                    <a href="" className="btn-2 btn-light btn-lg text-dark">
                      <i className="fa-solid fa-share-nodes" style={{ marginRight: 6, }}></i>
                      <span style={{ paddingLeft: 8, }}>
                        Share
                      </span>
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="row follow-button-2">
                    {isFollowing ? (
                      <>
                        <button
                          href=""
                          className="btn-3 btn-warning btn-lg text-dark "
                          onClick={handleReadMoreClick}
                        >
                          <i className="fa-solid fa-user-check"></i>
                          Following
                        </button>
                      </>

                    ) : (
                      <>
                        <button
                          href=""
                          className="btn-3 btn-light btn-lg text-dark "
                          onClick={handleReadMoreClick}
                        >
                          <i className="fa-solid fa-user-plus"></i>
                          <span style={{ paddingLeft: 8, }}>
                            Follow
                          </span>
                        </button>
                      </>

                    )}

                    <a href="" className="btn-2 btn-light btn-lg text-dark">
                      <i className="fa-solid fa-share-nodes"></i>
                      <span style={{ paddingLeft: 8, }}>
                        Share
                      </span>
                    </a>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>

        {/* ---------profile end-------- */}

        {(allBlog.length > 0 || allEnglishProse.length > 0 || allEnglishShayari.length > 0 || allEnglishSher.length > 0 || allHindiProse.length > 0 || allHindiShayari.length > 0 || allHindiSher.length > 0 || allprose.length > 0 || allshayari.length > 0 || allsher.length > 0) ? <>
          <div className="container">
            <div className="row all-sher gap-5">

              {/* ------------left side------------ */}
              <div className="col-lg-8   all-sher-left  article">

                <div>
                  <div className="TabWraper my-3">

                    {/* Tab buttons */}
                    {allshayari.length > 0 ? <>
                      <div className="TabWraperBox">
                        <button
                          onClick={() => handleTabChange(1)}
                          className={`profileTabbtn ${activeTab === 1 && 'active'}`}>
                          SHAYARI
                        </button>
                      </div>
                    </> : <></>}

                    {allsher.length > 0 ? <>
                      <div className="TabWraperBox">
                        <button
                          onClick={() => handleTabChange(2)}
                          className={`profileTabbtn ${activeTab === 2 && 'active'}`}>
                          SHER
                        </button>
                      </div>
                    </> : <></>}

                    {allprose.length > 0 ? <>
                      <div className="TabWraperBox">
                        <button
                          onClick={() => handleTabChange(3)}
                          className={`profileTabbtn ${activeTab === 3 && 'active'}`}>
                          NAZM
                        </button>
                      </div>
                    </> : <></>}

                    {(allshayari.length > 0 || allprose.length > 0 || allsher.length > 0) ? <>
                      <div className="TabWraperBox">
                        <button
                          onClick={() => handleTabChange(4)}
                          className={`profileTabbtn ${activeTab === 4 && 'active'}`}>
                          ENGLISH
                        </button>
                      </div>
                    </> : <></>}

                    {(allshayari.length > 0 || allprose.length > 0 || allsher.length > 0) ? <>
                      <div className="TabWraperBox">
                        <button
                          onClick={() => handleTabChange(5)}
                          className={`profileTabbtn ${activeTab === 5 && 'active'}`}>
                          HINDI
                        </button>
                      </div>
                    </> : <></>}

                    {allBlog.length > 0 ? <>
                      <div className="TabWraperBox">
                        <button
                          onClick={() => handleTabChange(6)}
                          className={`profileTabbtn ${activeTab === 6 && 'active'}`}>
                          BLOG
                        </button>
                      </div>
                    </> : <></>}

                  </div>

                  <div>

                    {activeTab === 1 && (
                      <div>

                        {allshayari.length > 0 ? <>
                          <div className=" all-content-1">
                            <h1 className="mx-3">SHAYARI</h1>
                            <hr />
                          </div>
                        </> : <></>}

                        <div className="page-timeline ">
                          {allshayari.map((data, index) => (
                            <div className="vtimeline-point">
                              <div className="vtimeline-icon">
                                <i className="fa fa-image"></i>
                              </div>
                              <div className="vtimeline-block">
                                <div className="vtimeline-content">
                                  <div className="vtimeline-imgcontent">
                                    <Link to={"/single-shayari/" + `${data?._id}`}><img src={BASE_URL_IMG + data?.Image} alt="" className="img-fluid mb20" /></Link>
                                  </div>

                                  <a href="#"><h3>{data?.title}</h3></a>
                                  <ul className="post-meta list-inline">
                                    <li className="list-inline-item">
                                      <i className="fa fa-user-circle-o"></i> <Link to={"/poets-profile/" + `${data?._id}`} className="text-capitalize">{data?.userId?.name}</Link>
                                    </li>
                                    {/* <li className="list-inline-item">
                            <i className="fa fa-calendar-o"></i> <a href="#">{format(new Date(data.created_at), 'MMMM d, yyyy')}</a>
                        </li> */}
                                    <li className="list-inline-item">
                                      <i className="fa fa-tags"></i> <a href="#" className="fw-bold">{data?.tags}  </a>
                                    </li>
                                    <li className="list-inline-item">

                                      <i className="fa-solid fa-share-nodes"></i> <Link >Share Now</Link>
                                    </li>
                                  </ul>

                                  {authenticate ? (
                                    <>
                                      <p className="shayaritext">
                                        <Link to={"/single-shayari/" + `${data?._id}`}>
                                          {/* <i className="fa fa-quote-left fa-fw pull-left"></i> */}
                                          <p>{parse(data.shayari)}</p>
                                          {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                        </Link>
                                      </p>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i>  */}
                                    </>
                                  ) : (
                                    <>      <div className="shayaricontent-container">
                                      <p className="shayaricontent  shayaritext">
                                        {parse(data.shayari)}
                                      </p>
                                    </div>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                      <br />
                                      <button className="readbutton" onClick={handleReadMoreClick}>
                                        View More
                                      </button>
                                    </>
                                  )}
                                </div>
                                <div className="vtimeline-content-btn">
                                    <a
                                      className="sendbutton"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      href={`https://wa.me/?text=${encodeURIComponent(`${data?.title}\n\n${data?.shayari.replace(/<[^>]+>/g, '')}\n\nRead more: https://yourwebsite.com/single-shayari/${data?._id}`)}`}
                                    >
                                    Share on WhatsApp
                                    </a>
                                </div>
                              </div>
                            </div>
                          ))}


                        </div>
                      </div>
                    )}

                    {activeTab === 2 && (
                      <div>

                        {allsher.length > 0 ? <>
                          <h1 className="mx-3">All SHER</h1>
                          <hr />
                        </> : <></>}

                        <div className="page-timeline">
                          {allsher.map((data, index) => (
                            <div className="vtimeline-point">
                              <div className="vtimeline-icon">
                                <i className="fa fa-image"></i>
                              </div>
                              <div className="vtimeline-block">
                                <div className="vtimeline-content">
                                  <div className="vtimeline-imgcontent">
                                    <Link to={"/single-sher/" + `${data?._id}`}><img src={BASE_URL_IMG + data?.Image} alt="" className="img-fluid mb20" /></Link>
                                  </div>

                                  <a href="#"><h3>{data?.title}</h3></a>
                                  <ul className="post-meta list-inline">
                                    <li className="list-inline-item">
                                      <i className="fa fa-user-circle-o"></i> <Link to={"/poets-profile/" + `${data?._id}`} className="text-capitalize">{data?.userId?.name}</Link>
                                    </li>

                                    <li className="list-inline-item">
                                      <i className="fa fa-tags"></i> <a href="#" className="fw-bold">{data?.tags}  </a>
                                    </li>
                                    <li className="list-inline-item">

                                      <i className="fa-solid fa-share-nodes"></i> <Link >Share Now</Link>
                                    </li>
                                  </ul>

                                  {authenticate ? (
                                    <>
                                      <p className="shayaritext">
                                        <Link to={"/single-sher/" + `${data?._id}`}>
                                          {/* <i className="fa fa-quote-left fa-fw pull-left"></i> */}
                                          <p>{parse(data.sher)}</p>
                                          {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                        </Link>
                                      </p>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i>  */}
                                    </>
                                  ) : (
                                    <>      <div className="shayaricontent-container">
                                      <p className="shayaricontent  shayaritext">
                                        {parse(data.sher)}
                                      </p>
                                    </div>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                      <br />
                                      <button className="readbutton" onClick={handleReadMoreClick}>
                                        View More
                                      </button>
                                    </>
                                  )}
                                </div>
                                <div className="vtimeline-content-btn"> <a href="https://wa.me/?text=Get%20Shayari%20on%20your%20Whatsapp" className="sendbutton">Get Sher on your Whatsapp</a> </div>
                              </div>
                            </div>
                          ))}


                        </div>
                      </div>
                    )}

                    {activeTab === 3 && (
                      <div>

                        {allprose.length > 0 ? <>
                          <div className=" all-content-1">
                            <h1 className="mx-3">All Prose</h1>
                            <hr />
                          </div>
                        </> : <></>}

                        <div className="page-timeline">
                          {allprose.map((data, index) => (
                            <div className="vtimeline-point">
                              <div className="vtimeline-icon">
                                <i className="fa fa-image"></i>
                              </div>
                              <div className="vtimeline-block">
                                <div className="vtimeline-content">
                                  <div className="vtimeline-imgcontent">
                                    <Link to={"/single-prose/" + `${data?._id}`}><img src={BASE_URL_IMG + data?.Image} alt="" className="img-fluid mb20" /></Link>
                                  </div>

                                  <a href="#"><h3>{data?.title}</h3></a>
                                  <ul className="post-meta list-inline">
                                    <li className="list-inline-item">
                                      <i className="fa fa-user-circle-o"></i> <Link to={"/poets-profile/" + `${data?._id}`} className="text-capitalize">{data?.userId?.name}</Link>
                                    </li>

                                    <li className="list-inline-item">
                                      <i className="fa fa-tags"></i> <a href="#" className="fw-bold">{data?.tags}  </a>
                                    </li>
                                    <li className="list-inline-item">

                                      <i className="fa-solid fa-share-nodes"></i> <Link >Share Now</Link>
                                    </li>
                                  </ul>

                                  {authenticate ? (
                                    <>
                                      <p className="shayaritext">
                                        <Link to={"/single-prose/" + `${data?._id}`}>
                                          {/* <i className="fa fa-quote-left fa-fw pull-left"></i> */}
                                          <p>{parse(data.prose)} </p>
                                          {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                        </Link>
                                      </p>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i>  */}
                                    </>
                                  ) : (
                                    <>      <div className="shayaricontent-container">
                                      <p className="shayaricontent  shayaritext">
                                        {parse(data.prose)}
                                      </p>
                                    </div>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                      <br />
                                      <button className="readbutton" onClick={handleReadMoreClick}>
                                        View More
                                      </button>
                                    </>
                                  )}
                                </div>
                                <div className="vtimeline-content-btn"> <a href="https://wa.me/?text=Get%20Shayari%20on%20your%20Whatsapp" className="sendbutton">Get Nazm on your Whatsapp</a> </div>
                              </div>
                            </div>

                          ))}

                        </div>
                      </div>
                    )}

                    {activeTab === 4 && (
                      <div>

                        {allEnglishShayari.length > 0 ? <>
                          <div className=" all-content-1">
                            <h1 className="mx-3">ENGLISH SHAYARI</h1>
                            <hr />
                          </div>
                        </> : <></>}

                        <div className="page-timeline">
                          {allEnglishShayari.map((data, index) => (
                            <div className="vtimeline-point">
                              <div className="vtimeline-icon">
                                <i className="fa fa-image"></i>
                              </div>
                              <div className="vtimeline-block">
                                <div className="vtimeline-content">
                                  <div className="vtimeline-imgcontent">
                                    <Link to={"/single-shayari/" + `${data?._id}`}><img src={BASE_URL_IMG + data?.Image} alt="" className="img-fluid mb20" /></Link>
                                  </div>

                                  <a href="#"><h3>{data?.title}</h3></a>
                                  <ul className="post-meta list-inline">
                                    <li className="list-inline-item">
                                      <i className="fa fa-user-circle-o"></i> <Link to={"/poets-profile/" + `${data?._id}`} className="text-capitalize">{data?.userId?.name}</Link>
                                    </li>

                                    <li className="list-inline-item">
                                      <i className="fa fa-tags"></i> <a href="#" className="fw-bold">{data?.tags}  </a>
                                    </li>
                                    <li className="list-inline-item">

                                      <i className="fa-solid fa-share-nodes"></i> <Link >Share Now</Link>
                                    </li>
                                  </ul>

                                  {authenticate ? (
                                    <>
                                      <p className="shayaritext">
                                        <Link to={"/single-shayari/" + `${data?._id}`}>
                                          {/* <i className="fa fa-quote-left fa-fw pull-left"></i> */}
                                          <p>{parse(data.shayari)}</p>
                                          {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                        </Link>
                                      </p>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i>  */}
                                    </>
                                  ) : (
                                    <>      <div className="shayaricontent-container">
                                      <p className="shayaricontent  shayaritext">
                                        {parse(data.shayari)}
                                      </p>
                                    </div>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                      <br />
                                      <button className="readbutton" onClick={handleReadMoreClick}>
                                        View More
                                      </button>
                                    </>
                                  )}
                                </div>
                                <div className="vtimeline-content-btn"> <a href="https://wa.me/?text=Get%20Shayari%20on%20your%20Whatsapp" className="sendbutton">Get SHAYARI on your Whatsapp</a> </div>
                              </div>
                            </div>
                          ))}


                        </div>

                        <div className=" all-content-1">

                          {allEnglishSher.length > 0 ? <>
                            <h1>ENGLISH SHER</h1>
                            <hr />
                          </> : <></>}

                        </div>
                        <div className="page-timeline">
                          {allEnglishSher.map((data, index) => (
                            <div className="vtimeline-point">
                              <div className="vtimeline-icon">
                                <i className="fa fa-image"></i>
                              </div>
                              <div className="vtimeline-block">
                                <div className="vtimeline-content">
                                  <div className="vtimeline-imgcontent">
                                    <Link to={"/single-sher/" + `${data?._id}`}><img src={BASE_URL_IMG + data?.Image} alt="" className="img-fluid mb20" /></Link>
                                  </div>

                                  <a href="#"><h3>{data?.title}</h3></a>
                                  <ul className="post-meta list-inline">
                                    <li className="list-inline-item">
                                      <i className="fa fa-user-circle-o"></i> <Link to={"/poets-profile/" + `${data?._id}`} className="text-capitalize">{data?.userId?.name}</Link>
                                    </li>

                                    <li className="list-inline-item">
                                      <i className="fa fa-tags"></i> <a href="#" className="fw-bold">{data?.tags}  </a>
                                    </li>
                                    <li className="list-inline-item">

                                      <i className="fa-solid fa-share-nodes"></i> <Link >Share Now</Link>
                                    </li>
                                  </ul>

                                  {authenticate ? (
                                    <>
                                      <p className="shayaritext">
                                        <Link to={"/single-sher/" + `${data?._id}`}>
                                          {/* <i className="fa fa-quote-left fa-fw pull-left"></i> */}
                                          <p>{parse(data.sher)}</p>
                                          {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                        </Link>
                                      </p>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i>  */}
                                    </>
                                  ) : (
                                    <>      <div className="shayaricontent-container">
                                      <p className="shayaricontent  shayaritext">
                                        {parse(data.sher)}
                                      </p>
                                    </div>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                      <br />
                                      <button className="readbutton" onClick={handleReadMoreClick}>
                                        View More
                                      </button>
                                    </>
                                  )}
                                </div>
                                <div className="vtimeline-content-btn"> <a href="https://wa.me/?text=Get%20Shayari%20on%20your%20Whatsapp" className="sendbutton">Get Sher on your Whatsapp</a> </div>
                              </div>
                            </div>
                          ))}


                        </div>

                        <div className=" all-content-1">

                          {allEnglishProse.length > 0 ? <>
                            <h1>ENGLISH NAZM</h1>
                            <hr />
                          </> : <></>}

                        </div>

                        <div className="page-timeline">
                          {allEnglishProse.map((data, index) => (
                            <div className="vtimeline-point">
                              <div className="vtimeline-icon">
                                <i className="fa fa-image"></i>
                              </div>
                              <div className="vtimeline-block">
                                <div className="vtimeline-content">
                                  <div className="vtimeline-imgcontent">
                                    <Link to={"/single-prose/" + `${data?._id}`}><img src={BASE_URL_IMG + data?.Image} alt="" className="img-fluid mb20" /></Link>
                                  </div>

                                  <a href="#"><h3>{data?.title}</h3></a>
                                  <ul className="post-meta list-inline">
                                    <li className="list-inline-item">
                                      <i className="fa fa-user-circle-o"></i> <Link to={"/poets-profile/" + `${data?._id}`} className="text-capitalize">{data?.userId?.name}</Link>
                                    </li>

                                    <li className="list-inline-item">
                                      <i className="fa fa-tags"></i> <a href="#" className="fw-bold" >{data?.tags}  </a>
                                    </li>
                                    <li className="list-inline-item">

                                      <i className="fa-solid fa-share-nodes"></i> <Link >Share Now</Link>
                                    </li>
                                  </ul>

                                  {authenticate ? (
                                    <>
                                      <p className="shayaritext">
                                        <Link to={"/single-prose/" + `${data?._id}`}>
                                          {/* <i className="fa fa-quote-left fa-fw pull-left"></i> */}
                                          <p> {parse(data.prose)}</p>
                                          {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                        </Link>
                                      </p>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i>  */}
                                    </>
                                  ) : (
                                    <>      <div className="shayaricontent-container">
                                      <p className="shayaricontent  shayaritext">
                                        {parse(data.prose)}
                                      </p>
                                    </div>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                      <br />
                                      <button className="readbutton" onClick={handleReadMoreClick}>
                                        View More
                                      </button>
                                    </>
                                  )}
                                </div>
                                <div className="vtimeline-content-btn"> <a href="https://wa.me/?text=Get%20Shayari%20on%20your%20Whatsapp" className="sendbutton">Get Nazm on your Whatsapp</a> </div>
                              </div>
                            </div>

                          ))}

                        </div>

                      </div>
                    )}

                    {activeTab === 5 && (
                      <div>

                        {allHindiShayari.length > 0 ? <>
                          <div className=" all-content-1">
                            <h1 className="mx-3">HINDI SHAYARI</h1>
                            <hr />
                          </div>
                        </> : <></>}

                        <div className="page-timeline">
                          {allHindiShayari.map((data, index) => (
                            <div className="vtimeline-point">
                              <div className="vtimeline-icon">
                                <i className="fa fa-image"></i>
                              </div>
                              <div className="vtimeline-block">
                                <div className="vtimeline-content">
                                  <div className="vtimeline-imgcontent">
                                    <Link to={"/single-shayari/" + `${data?._id}`}><img src={BASE_URL_IMG + data?.Image} alt="" className="img-fluid mb20" /></Link>
                                  </div>

                                  <a href="#"><h3>{data?.title}</h3></a>
                                  <ul className="post-meta list-inline">
                                    <li className="list-inline-item">
                                      <i className="fa fa-user-circle-o"></i> <Link to={"/poets-profile/" + `${data?._id}`} className="text-capitalize">{data?.userId?.name}</Link>
                                    </li>

                                    <li className="list-inline-item">
                                      <i className="fa fa-tags"></i> <a href="#" className="fw-bold">{data?.tags}  </a>
                                    </li>
                                    <li className="list-inline-item">

                                      <i className="fa-solid fa-share-nodes"></i> <Link >Share Now</Link>
                                    </li>
                                  </ul>

                                  {authenticate ? (
                                    <>
                                      <p className="shayaritext">
                                        <Link to={"/single-shayari/" + `${data?._id}`}>
                                          {/* <i className="fa fa-quote-left fa-fw pull-left"></i> */}
                                          <p> {parse(data.shayari)}</p>
                                          {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                        </Link>
                                      </p>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i>  */}
                                    </>
                                  ) : (
                                    <>      <div className="shayaricontent-container">
                                      <p className="shayaricontent  shayaritext">
                                        {parse(data.shayari)}
                                      </p>
                                    </div>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                      <br />
                                      <button className="readbutton" onClick={handleReadMoreClick}>
                                        View More
                                      </button>
                                    </>
                                  )}
                                </div>
                                <div className="vtimeline-content-btn"> <a href="https://wa.me/?text=Get%20Shayari%20on%20your%20Whatsapp" className="sendbutton">Get SHAYARI on your Whatsapp</a> </div>
                              </div>
                            </div>
                          ))}


                        </div>

                        {allHindiSher.length > 0 ? <>
                          <div className=" all-content-1">
                            <h1>HINDI SHER</h1>
                            <hr />
                          </div>
                        </> : <></>}

                        <div className="page-timeline">
                          {allHindiSher.map((data, index) => (
                            <div className="vtimeline-point">
                              <div className="vtimeline-icon">
                                <i className="fa fa-image"></i>
                              </div>
                              <div className="vtimeline-block">
                                <div className="vtimeline-content">
                                  <div className="vtimeline-imgcontent">
                                    <Link to={"/single-sher/" + `${data?._id}`}><img src={BASE_URL_IMG + data?.Image} alt="" className="img-fluid mb20" /></Link>
                                  </div>

                                  <a href="#"><h3>{data?.title}</h3></a>
                                  <ul className="post-meta list-inline">
                                    <li className="list-inline-item">
                                      <i className="fa fa-user-circle-o"></i> <Link to={"/poets-profile/" + `${data?._id}`} className="text-capitalize">{data?.userId?.name}</Link>
                                    </li>

                                    <li className="list-inline-item">
                                      <i className="fa fa-tags"></i> <a href="#" className="fw-bold">{data?.tags}  </a>
                                    </li>
                                    <li className="list-inline-item">

                                      <i className="fa-solid fa-share-nodes"></i> <Link >Share Now</Link>
                                    </li>
                                  </ul>

                                  {authenticate ? (
                                    <>
                                      <p className="shayaritext">
                                        <Link to={"/single-sher/" + `${data?._id}`}>
                                          {/* <i className="fa fa-quote-left fa-fw pull-left"></i> */}
                                          <p> {parse(data.sher)}</p>
                                          {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                        </Link>
                                      </p>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i>  */}
                                    </>
                                  ) : (
                                    <>      <div className="shayaricontent-container">
                                      <p className="shayaricontent  shayaritext">
                                        {parse(data.sher)}
                                      </p>
                                    </div>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                      <br />
                                      <button className="readbutton" onClick={handleReadMoreClick}>
                                        View More
                                      </button>
                                    </>
                                  )}
                                </div>
                                <div className="vtimeline-content-btn"> <a href="https://wa.me/?text=Get%20Shayari%20on%20your%20Whatsapp" className="sendbutton">Get Sher on your Whatsapp</a> </div>
                              </div>
                            </div>
                          ))}


                        </div>

                        {allHindiProse.length > 0 ? <>
                          <div className=" all-content-1">
                            <h1>HINDI NAZM</h1>
                            <hr />
                          </div>
                        </> : <></>}

                        <div className="page-timeline">
                          {allHindiProse.map((data, index) => (
                            <div className="vtimeline-point">
                              <div className="vtimeline-icon">
                                <i className="fa fa-image"></i>
                              </div>
                              <div className="vtimeline-block">
                                <div className="vtimeline-content">
                                  <div className="vtimeline-imgcontent">
                                    <Link to={"/single-prose/" + `${data?._id}`}><img src={BASE_URL_IMG + data?.Image} alt="" className="img-fluid mb20" /></Link>
                                  </div>

                                  <a href="#"><h3>{data?.title}</h3></a>
                                  <ul className="post-meta list-inline">
                                    <li className="list-inline-item">
                                      <i className="fa fa-user-circle-o"></i> <Link to={"/poets-profile/" + `${data?._id}`} className="text-capitalize">{data?.userId?.name}</Link>
                                    </li>

                                    <li className="list-inline-item">
                                      <i className="fa fa-tags"></i> <a href="#" className="fw-bold">{data?.tags}  </a>
                                    </li>
                                    <li className="list-inline-item">

                                      <i className="fa-solid fa-share-nodes"></i> <Link >Share Now</Link>
                                    </li>
                                  </ul>

                                  {authenticate ? (
                                    <>
                                      <p className="shayaritext">
                                        <Link to={"/single-prose/" + `${data?._id}`}>
                                          {/* <i className="fa fa-quote-left fa-fw pull-left"></i> */}
                                          <p> {parse(data.prose)}</p>
                                          {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                        </Link>
                                      </p>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i>  */}
                                    </>
                                  ) : (
                                    <>      <div className="shayaricontent-container">
                                      <p className="shayaricontent  shayaritext">
                                        {parse(data.prose)}
                                      </p>
                                    </div>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                      <br />
                                      <button className="readbutton" onClick={handleReadMoreClick}>
                                        View More
                                      </button>
                                    </>
                                  )}
                                </div>
                                <div className="vtimeline-content-btn"> <a href="https://wa.me/?text=Get%20Shayari%20on%20your%20Whatsapp" className="sendbutton">Get Nazm on your Whatsapp</a> </div>
                              </div>
                            </div>

                          ))}

                        </div>

                      </div>
                    )}

                    {activeTab === 6 && (
                      <div>

                        {allBlog.length > 0 ? <>
                          <div className=" all-content-1">
                            <h1 className="mx-3"> All Blog</h1>
                            <hr />
                          </div>
                        </> : <></>}

                        <div className="page-timeline">
                          {allBlog.map((data, index) => (
                            <div className="vtimeline-point">
                              <div className="vtimeline-icon">
                                <i className="fa fa-image"></i>
                              </div>
                              <div className="vtimeline-block">
                                <div className="vtimeline-content">
                                  <div className="vtimeline-imgcontent">
                                    <Link to={"/single-blog/" + `${data?._id}`}><img src={BASE_URL_IMG + data?.Image} alt="" className="img-fluid mb20" /></Link>
                                  </div>

                                  <a href="#"><h3>{data?.title}</h3></a>
                                  <ul className="post-meta list-inline">
                                    <li className="list-inline-item">
                                      <i className="fa fa-user-circle-o"></i> <Link to={"/poets-profile/" + `${data?._id}`} className="text-capitalize">{data?.userId?.name}</Link>
                                    </li>

                                    <li className="list-inline-item">
                                      <i className="fa fa-tags"></i> <a href="#" className="fw-bold">{data?.tags}  </a>
                                    </li>
                                    <li className="list-inline-item">

                                      <i className="fa-solid fa-share-nodes"></i> <Link >Share Now</Link>
                                    </li>
                                  </ul>
                                  <p>
                                    <Link to={"/single-blog/" + `${data?._id}`}>
                                      {/* <i className="fa fa-quote-left fa-fw pull-left"></i> */}
                                      <p> {data?.description}</p>
                                      {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                    </Link>
                                  </p>
                                </div>
                                <div className="vtimeline-content-btn"> <a href="https://wa.me/?text=Get%20Shayari%20on%20your%20Whatsapp" className="sendbutton">Share on your Whatsapp</a> </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* ------------left side------------ */}
              {/* ------------Right side------------ */}

              <div className="col-lg-3 m-15px-tb blog-aside article">
                {/* <div className="search-1  ">
                <form>
                  <input type="search" placeholder="Search" required="" />
                  <input type="submit" value=" " />
                </form>
              </div> */}
                <hr />
                <div className="text-center">
                  <div className="adscard">
                    <div className="adstools">
                      <div className="adscircle">
                        <span className="adsred adsbox"></span>
                      </div>
                      <div className="adscircle">
                        <span className="adsyellow adsbox"></span>
                      </div>
                      <div className="adscircle">
                        <span className="adsgreen adsbox"></span>
                      </div>
                    </div>
                    <div className="card__content"></div>
                  </div>

                  <hr />
                </div>
                <div className="text-center">
                  <div className="adscard">
                    <div className="adstools">
                      <div className="adscircle">
                        <span className="adsred adsbox"></span>
                      </div>
                      <div className="adscircle">
                        <span className="adsyellow adsbox"></span>
                      </div>
                      <div className="adscircle">
                        <span className="adsgreen adsbox"></span>
                      </div>
                    </div>
                    <div className="card__content"></div>
                  </div>

                  <hr />
                </div>
              </div>
              {/* ------------Right side------------ */}
            </div>
          </div>
        </> : <>
          <div className="container">
            <div className="d-flex justify-content-center align-items-center">
              <h1 className="mt-3 mb-4">
                No Content Available
              </h1>
            </div>
          </div>
        </>}

      </div>
      <ToastContainer />
    </>
  );
}
