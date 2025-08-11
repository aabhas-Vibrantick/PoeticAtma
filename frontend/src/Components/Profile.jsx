import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DescriptionIcon from "@mui/icons-material/Description";
import { useEffect } from "react";
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { useReducedMotionConfig } from "framer-motion";

import { format } from "date-fns";
import { Button } from "react-bootstrap";
import "./Profile.css";

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
  const authenticate = sessionStorage.getItem("authenticate");

  const handleReadMoreClick = () => {
    if (!authenticate) {
      window.location.href = "/login";
      toast.error("Please Sign In to Continue!");
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
          const filteredShayaris = data.data.data.filter(
            (shayari) => shayari.isApproved === true
          );
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
          const filteredShers = data.data.data.filter(
            (sher) => sher.isApproved === true
          );
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
          const filteredProses = data.data.data.filter(
            (prose) => prose.isApproved === true
          );
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
          const filteredBlogs = data.data.data.filter(
            (blog) => blog.isApproved === true
          );
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
          const filteredShayaris = response.data.allenglish.filter(
            (shayari) => shayari.status === true
          );
          setAllEnglishShayari(filteredShayaris);
        } else {
        }
      })
      .catch((error) => {});

    apiServices
      .getenglishSherByUserId(unique)
      .then((response) => {
        if (response.data.success) {
          const filteredShers = response.data.allenglish.filter(
            (sher) => sher.status === true
          );
          setAllEnglishSher(filteredShers);
        } else {
        }
      })
      .catch((error) => {});

    apiServices
      .getenglishProseByUserId(unique)
      .then((response) => {
        if (response.data.success) {
          const filteredProses = response.data.allenglish.filter(
            (prose) => prose.status === true
          );
          setAllEnglishProse(filteredProses);
        } else {
        }
      })
      .catch((error) => {});

    apiServices
      .gethindiShayariByUserId(unique)
      .then((response) => {
        if (response.data.success) {
          const filteredShayaris = response.data.allhindi.filter(
            (shayari) => shayari.status === true
          );
          setAllHindiShayari(filteredShayaris);
        } else {
        }
      })
      .catch((error) => {});

    apiServices
      .gethindiSherByUserId(unique)
      .then((response) => {
        if (response.data.success) {
          const filteredShers = response.data.allhindi.filter(
            (sher) => sher.status === true
          );
          setAllHindiSher(filteredShers);
        } else {
        }
      })
      .catch((error) => {});

    apiServices
      .gethindiProseByUserId(unique)
      .then((response) => {
        if (response.data.success) {
          const filteredProses = response.data.allhindi.filter(
            (prose) => prose.status === true
          );
          setAllHindiProse(filteredProses);
        } else {
        }
      })
      .catch((error) => {});

    apiServices
      .getFollowCountsForUser(unique)
      .then((response) => {
        const data = response.data.data;
        setFollowerCount(data.followerCount);
        setFollowingCount(data.followingCount);
      })
      .catch((error) => {});
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
    <div className="poet-profile-section">
      {loading && (
        <div className="loader-container">
          <ScaleLoader loading={loading} cssOverride={override} size={70} />
        </div>
      )}

      <div className={loading ? "disable-full-screen" : ""}>
        {/* Profile Section */}
        <section className="profile-header py-5 text-center">
          <div className="container">
            <div className="profile-card shadow-sm">
              <img
                src={
                  BASE_URL_IMG + userDetail?.Image || "/assets/images/avtar.png"
                }
                className="profile-img"
                alt="Poet Avatar"
                onError={(e) => {
                  e.target.src = "/assets/images/avtar.png";
                }}
              />
              <div className="profile-content">
                <h2 className="profile-name">
                  {userDetail?.name}
                  {userDetail?.penname && <span> ({userDetail?.penname})</span>}
                  {userDetail?.bedgeverify && (
                    <img
                      src="/quality.png"
                      alt="Verified Badge"
                      className="badge-image"
                    />
                  )}
                </h2>
                {userDetail?.bio && (
                  <p className="profile-bio">{userDetail.bio}</p>
                )}
                <ul className="social-links">
                  {userDetail?.facebook && (
                    <li>
                      <a
                        href={userDetail.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                  )}
                  {userDetail?.twiter && (
                    <li>
                      <a
                        href={userDetail.twiter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                  )}
                  {userDetail?.instagram && (
                    <li>
                      <a
                        href={userDetail.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  )}
                  {userDetail?.linkdin && (
                    <li>
                      <a
                        href={userDetail.linkdin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  )}
                </ul>
                <div className="follow-stats">
                  <span className="stat">
                    <strong>{followingCount ?? "Loading..."}</strong> Following
                  </span>
                  <span className="stat">
                    <strong>{followerCount ?? "Loading..."}</strong> Followers
                  </span>
                </div>
                {authenticate ? (
                  <div className="action-buttons">
                    <button
                      className={`follow-btn ${isFollowing ? "following" : ""}`}
                      onClick={handleFollow}
                    >
                      <i
                        className={`fa-solid ${
                          isFollowing ? "fa-user-check" : "fa-user-plus"
                        }`}
                      ></i>
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                    <button className="share-btn">
                      <i className="fa-solid fa-share-nodes"></i> Share
                    </button>
                  </div>
                ) : (
                  <div className="action-buttons">
                    <button
                      className={`follow-btn ${isFollowing ? "following" : ""}`}
                      onClick={handleReadMoreClick}
                    >
                      <i
                        className={`fa-solid ${
                          isFollowing ? "fa-user-check" : "fa-user-plus"
                        }`}
                      ></i>
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                    <button className="share-btn">
                      <i className="fa-solid fa-share-nodes"></i> Share
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        {allBlog.length > 0 ||
        allEnglishProse.length > 0 ||
        allEnglishShayari.length > 0 ||
        allEnglishSher.length > 0 ||
        allHindiProse.length > 0 ||
        allHindiShayari.length > 0 ||
        allHindiSher.length > 0 ||
        allprose.length > 0 ||
        allshayari.length > 0 ||
        allsher.length > 0 ? (
          <section className="content-section py-5">
            <div className="container">
              <div className="row">
                {/* Left Column: Content */}
                <div className="col-lg-8">
                  <div className="tab-container">
                    <div className="tab-buttons">
                      {allshayari.length > 0 && (
                        <button
                          onClick={() => handleTabChange(1)}
                          className={`tab-btn ${
                            activeTab === 1 ? "active" : ""
                          }`}
                        >
                          Ghazal{" "}
                          <span className="tab-count">{allshayari.length}</span>
                        </button>
                      )}
                      {allsher.length > 0 && (
                        <button
                          onClick={() => handleTabChange(2)}
                          className={`tab-btn ${
                            activeTab === 2 ? "active" : ""
                          }`}
                        >
                          Sher{" "}
                          <span className="tab-count">{allsher.length}</span>
                        </button>
                      )}
                      {allprose.length > 0 && (
                        <button
                          onClick={() => handleTabChange(3)}
                          className={`tab-btn ${
                            activeTab === 3 ? "active" : ""
                          }`}
                        >
                          Nazm{" "}
                          <span className="tab-count">{allprose.length}</span>
                        </button>
                      )}
                      {(allshayari.length > 0 ||
                        allprose.length > 0 ||
                        allsher.length > 0) && (
                        <button
                          onClick={() => handleTabChange(4)}
                          className={`tab-btn ${
                            activeTab === 4 ? "active" : ""
                          }`}
                        >
                          English
                        </button>
                      )}
                      {(allshayari.length > 0 ||
                        allprose.length > 0 ||
                        allsher.length > 0) && (
                        <button
                          onClick={() => handleTabChange(5)}
                          className={`tab-btn ${
                            activeTab === 5 ? "active" : ""
                          }`}
                        >
                          Hindi
                        </button>
                      )}
                      {allBlog.length > 0 && (
                        <button
                          onClick={() => handleTabChange(6)}
                          className={`tab-btn ${
                            activeTab === 6 ? "active" : ""
                          }`}
                        >
                          Blog{" "}
                          <span className="tab-count">{allBlog.length}</span>
                        </button>
                      )}
                    </div>

                    {/* Tab Content */}

                    {activeTab === 1 && allshayari.length > 0 && (
                      <div className="tab-content">
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 600,
                            bgcolor: "background.paper",
                          }}
                        >
                          {allshayari.map((data, index) => (
                            <ListItem
                              key={data?._id || index}
                              component={Link}
                              to={`/single-shayari/${data?._id}`}
                              sx={{
                                textDecoration: "none",
                                color: "inherit",
                                "&:hover": { backgroundColor: "#fff3e0" },
                              }}
                            >
                              {/* <ListItemAvatar>
                                <Avatar
                                  variant="circle"
                                  src={BASE_URL_IMG + data?.Image}
                                  alt={data?.title}
                                  sx={{ width: 50, height: 56 }}
                                  onError={(e) => {
                                    e.target.src = "/default_image.jpg";
                                  }}
                                />
                              </ListItemAvatar> */}
                              <ListItemAvatar>
                                <Avatar
                                  variant="circle"
                                  src={
                                    data?.Image
                                      ? BASE_URL_IMG + data.Image
                                      : "/default_image.jpg"
                                  }
                                  alt={data?.title}
                                  sx={{ width: 50, height: 56 }}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={data?.title}
                                secondary={data?.tags || "No tags"}
                                primaryTypographyProps={{
                                  fontWeight: "bold",
                                  color: "primary.main",
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </div>
                    )}

                    {activeTab === 2 && allsher.length > 0 && (
                      <div className="tab-content">
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 600,
                            bgcolor: "background.paper",
                          }}
                        >
                          {allsher.map((data, index) => (
                            <ListItem
                              key={data?._id || index}
                              component={Link}
                              to={`/single-sher/${data?._id}`}
                              sx={{
                                textDecoration: "none",
                                color: "inherit",
                                "&:hover": { backgroundColor: "#fff3e0" },
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  variant="circle"
                                  src={
                                    data?.Image
                                      ? BASE_URL_IMG + data.Image
                                      : "/default_image.jpg"
                                  }
                                  alt={data?.title}
                                  sx={{ width: 50, height: 56 }}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={data?.title}
                                secondary={data?.tags || "No tags"}
                                primaryTypographyProps={{
                                  fontWeight: "bold",
                                  color: "primary.main",
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </div>
                    )}

                    {activeTab === 3 && allprose.length > 0 && (
                      <div className="tab-content">
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 600,
                            bgcolor: "background.paper",
                          }}
                        >
                          {allprose.map((data, index) => (
                            <ListItem
                              key={data?._id || index}
                              component={Link}
                              to={`/single-prose/${data?._id}`}
                              sx={{
                                textDecoration: "none",
                                color: "inherit",
                                "&:hover": { backgroundColor: "#fff3e0" },
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  variant="circle"
                                  src={
                                    data?.Image
                                      ? BASE_URL_IMG + data.Image
                                      : "/default_image.jpg"
                                  }
                                  alt={data?.title}
                                  sx={{ width: 50, height: 56 }}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={data?.title}
                                secondary={data?.tags || "No tags"}
                                primaryTypographyProps={{
                                  fontWeight: "bold",
                                  color: "primary.main",
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </div>
                    )}

                    {activeTab === 4 && (
                      <div className="tab-content">
                        {/* English Shayari */}
                        {allEnglishShayari.length > 0 && (
                          <>
                            <h2 className="tab-title">English Shayari</h2>
                            <List
                              sx={{
                                width: "100%",
                                maxWidth: 600,
                                bgcolor: "background.paper",
                              }}
                            >
                              {allEnglishShayari.map((data, index) => (
                                <ListItem
                                  key={data?._id || index}
                                  component={Link}
                                  to={`/single-shayari/${data?._id}`}
                                  sx={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    "&:hover": { backgroundColor: "#fff3e0" },
                                  }}
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      variant="circle"
                                      src={
                                        data?.Image
                                          ? BASE_URL_IMG + data.Image
                                          : "/default_image.jpg"
                                      }
                                      alt={data?.title}
                                      sx={{ width: 50, height: 56 }}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={data?.title}
                                    secondary={`${
                                      data?.userId?.name || "Unknown"
                                    } • ${format(
                                      new Date(data.created_at),
                                      "MMMM d, yyyy"
                                    )}`}
                                    primaryTypographyProps={{
                                      fontWeight: "bold",
                                      color: "primary.main",
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </>
                        )}

                        {/* English Sher */}
                        {allEnglishSher.length > 0 && (
                          <>
                            <h2 className="tab-title">English Sher</h2>
                            <List
                              sx={{
                                width: "100%",
                                maxWidth: 600,
                                bgcolor: "background.paper",
                              }}
                            >
                              {allEnglishSher.map((data, index) => (
                                <ListItem
                                  key={data?._id || index}
                                  component={Link}
                                  to={`/single-sher/${data?._id}`}
                                  sx={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    "&:hover": { backgroundColor: "#fff3e0" },
                                  }}
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      variant="circle"
                                      src={
                                        data?.Image
                                          ? BASE_URL_IMG + data.Image
                                          : "/default_image.jpg"
                                      }
                                      alt={data?.title}
                                      sx={{ width: 50, height: 56 }}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={data?.title}
                                    secondary={`${
                                      data?.userId?.name || "Unknown"
                                    } • ${format(
                                      new Date(data.created_at),
                                      "MMMM d, yyyy"
                                    )}`}
                                    primaryTypographyProps={{
                                      fontWeight: "bold",
                                      color: "primary.main",
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </>
                        )}

                        {/* English Prose */}
                        {allEnglishProse.length > 0 && (
                          <>
                            <h2 className="tab-title">English Prose</h2>
                            <List
                              sx={{
                                width: "100%",
                                maxWidth: 600,
                                bgcolor: "background.paper",
                              }}
                            >
                              {allEnglishProse.map((data, index) => (
                                <ListItem
                                  key={data?._id || index}
                                  component={Link}
                                  to={`/single-prose/${data?._id}`}
                                  sx={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    "&:hover": { backgroundColor: "#fff3e0" },
                                  }}
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      variant="circle"
                                      src={
                                        data?.Image
                                          ? BASE_URL_IMG + data.Image
                                          : "/default_image.jpg"
                                      }
                                      alt={data?.title}
                                      sx={{ width: 50, height: 56 }}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={data?.title}
                                    secondary={`${
                                      data?.userId?.name || "Unknown"
                                    } • ${format(
                                      new Date(data.created_at),
                                      "MMMM d, yyyy"
                                    )}`}
                                    primaryTypographyProps={{
                                      fontWeight: "bold",
                                      color: "primary.main",
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </>
                        )}
                      </div>
                    )}

                    {activeTab === 5 && (
                      <div className="tab-content">
                        {/* Hindi Shayari */}
                        {allHindiShayari.length > 0 && (
                          <>
                            <h2 className="tab-title">Hindi Shayari</h2>
                            <List
                              sx={{
                                width: "100%",
                                maxWidth: 600,
                                bgcolor: "background.paper",
                              }}
                            >
                              {allHindiShayari.map((data, index) => (
                                <ListItem
                                  key={data?._id || index}
                                  component={Link}
                                  to={`/single-shayari/${data?._id}`}
                                  sx={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    "&:hover": { backgroundColor: "#fff3e0" },
                                  }}
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      variant="circle"
                                      src={
                                        data?.Image
                                          ? BASE_URL_IMG + data.Image
                                          : "/default_image.jpg"
                                      }
                                      alt={data?.title}
                                      sx={{ width: 50, height: 56 }}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={data?.title}
                                    secondary={`${
                                      data?.userId?.name || "Unknown"
                                    } • ${format(
                                      new Date(data.created_at),
                                      "MMMM d, yyyy"
                                    )}`}
                                    primaryTypographyProps={{
                                      fontWeight: "bold",
                                      color: "primary.main",
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </>
                        )}

                        {/* Hindi Sher */}
                        {allHindiSher.length > 0 && (
                          <>
                            <h2 className="tab-title">Hindi Sher</h2>
                            <List
                              sx={{
                                width: "100%",
                                maxWidth: 600,
                                bgcolor: "background.paper",
                              }}
                            >
                              {allHindiSher.map((data, index) => (
                                <ListItem
                                  key={data?._id || index}
                                  component={Link}
                                  to={`/single-sher/${data?._id}`}
                                  sx={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    "&:hover": { backgroundColor: "#fff3e0" },
                                  }}
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      variant="circle"
                                      src={
                                        data?.Image
                                          ? BASE_URL_IMG + data.Image
                                          : "/default_image.jpg"
                                      }
                                      alt={data?.title}
                                      sx={{ width: 50, height: 56 }}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={data?.title}
                                    secondary={`${
                                      data?.userId?.name || "Unknown"
                                    } • ${format(
                                      new Date(data.created_at),
                                      "MMMM d, yyyy"
                                    )}`}
                                    primaryTypographyProps={{
                                      fontWeight: "bold",
                                      color: "primary.main",
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </>
                        )}

                        {/* Hindi Prose */}
                        {allHindiProse.length > 0 && (
                          <>
                            <h2 className="tab-title">Hindi Prose</h2>
                            <List
                              sx={{
                                width: "100%",
                                maxWidth: 600,
                                bgcolor: "background.paper",
                              }}
                            >
                              {allHindiProse.map((data, index) => (
                                <ListItem
                                  key={data?._id || index}
                                  component={Link}
                                  to={`/single-prose/${data?._id}`}
                                  sx={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    "&:hover": { backgroundColor: "#fff3e0" },
                                  }}
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      variant="circle"
                                      src={
                                        data?.Image
                                          ? BASE_URL_IMG + data.Image
                                          : "/default_image.jpg"
                                      }
                                      alt={data?.title}
                                      sx={{ width: 50, height: 56 }}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={data?.title}
                                    secondary={`${
                                      data?.userId?.name || "Unknown"
                                    } • ${format(
                                      new Date(data.created_at),
                                      "MMMM d, yyyy"
                                    )}`}
                                    primaryTypographyProps={{
                                      fontWeight: "bold",
                                      color: "primary.main",
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </>
                        )}
                      </div>
                    )}

                    {activeTab === 6 && allBlog.length > 0 && (
                      <div className="tab-content">
                        <h2 className="tab-title">Blog</h2>
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 800,
                            bgcolor: "background.paper",
                          }}
                        >
                          {allBlog.map((data, index) => (
                            <ListItem
                              key={data?._id || index}
                              alignItems="flex-start"
                              component={Link}
                              to={`/single-blog/${data?._id}`}
                              sx={{
                                textDecoration: "none",
                                color: "inherit",
                                "&:hover": { backgroundColor: "#fff3e0" },
                              }}
                            >
                              {/* Blog Thumbnail */}
                              <ListItemAvatar>
                                <Avatar
                                  variant="circle"
                                  src={
                                    data?.Image
                                      ? BASE_URL_IMG + data.Image
                                      : "/default_image.jpg"
                                  }
                                  alt={data?.title}
                                  sx={{ width: 50, height: 56 }}
                                />
                              </ListItemAvatar>

                              {/* Blog Content */}
                              <ListItemText
                                primary={data?.title}
                                secondary={
                                  <>
                                    {/* Author & Date */}
                                    <span
                                      style={{
                                        display: "block",
                                        marginBottom: 4,
                                      }}
                                    >
                                      <i className="fa fa-user-circle-o me-1"></i>
                                      {data?.userId?.name || "Unknown"} •{" "}
                                      {format(
                                        new Date(data.created_at),
                                        "MMMM d, yyyy"
                                      )}
                                    </span>

                                    {/* Tags */}
                                    {data?.tags && (
                                      <span
                                        style={{
                                          display: "block",
                                          fontWeight: "bold",
                                          marginBottom: 6,
                                        }}
                                      >
                                        <i className="fa fa-tags me-1"></i>{" "}
                                        {data.tags}
                                      </span>
                                    )}

                                    {/* Description */}
                                    <span
                                      style={{
                                        display: "block",
                                        marginBottom: 6,
                                      }}
                                    >
                                      {data?.description.replace(
                                        /<[^>]+>/g,
                                        ""
                                      )}
                                    </span>

                                    {/* WhatsApp Share Link */}
                                    <a
                                      className="whatsapp-btn"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      href={`https://wa.me/?text=${encodeURIComponent(
                                        `${
                                          data?.title
                                        }\n\n${data?.description.replace(
                                          /<[^>]+>/g,
                                          ""
                                        )}\n\nRead more: https://poeticatma.com/single-blog/${
                                          data?._id
                                        }`
                                      )}`}
                                      onClick={(e) => e.stopPropagation()} // Prevents triggering the Link
                                    >
                                      <i className="fab fa-whatsapp me-1"></i>{" "}
                                      Share on WhatsApp
                                    </a>
                                  </>
                                }
                                primaryTypographyProps={{
                                  fontWeight: "bold",
                                  color: "primary.main",
                                  fontSize: "1.1rem",
                                }}
                                secondaryTypographyProps={{
                                  component: "div",
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </div>
                    )}
                  </div>
                </div>
                {/* Right Column: Ads */}
                <div className="col-lg-3">
                  <div className="ad-section">
                    {/* First Ad Card */}
                    <div className="ad-card shadow-sm">
                      {/* <div className="ad-tools">
        <span className="ad-circle ad-red"></span>
        <span className="ad-circle ad-yellow"></span>
        <span className="ad-circle ad-green"></span>
      </div> */}
                      <img
                        src="/Add.jpg" // replace with your actual image path
                        alt="Advertisement 1"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "4px",
                          display: "block",
                        }}
                      />
                    </div>

                    {/* Second Ad Card */}
                    <div className="ad-card shadow-sm">
                      {/* <div className="ad-tools">
        <span className="ad-circle ad-red"></span>
        <span className="ad-circle ad-yellow"></span>
        <span className="ad-circle ad-green"></span>
      </div> */}
                      <img
                        src="/Add.jpg" // replace with your actual image path
                        alt="Advertisement 2"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "4px",
                          display: "block",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="no-content-section py-5 text-center">
            <div className="container">
              <h2 className="no-content-title">No Content Available</h2>
            </div>
          </section>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
