import { Link, useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import parse from "html-react-parser";

export default function SingleShayari() {
  const { _id } = useParams();
  const [shayari, setAllShayari] = useState([]);
  const [alllatest, setAlllatest] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [showReply, setShowReply] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(null);
  const [user, setUserId] = useState(null);
  const parse = require("html-react-parser");
  const authenticate = sessionStorage.getItem("authenticate");
  // console.log("()()()",user)

  const handleReadMoreClick = () => {
    if (!authenticate) {
      window.location.href = "/login";
    }
  };

  const override = {
    display: "block",
    // "margin":"0 auto",
    position: "absolute",
    top: "25%",
    left: "48%",
    zIndex: "1",
  };

  const incrementViewCount = async () => {
    try {
      const response = await apiServices.shayariincrementPageView({
        postId: _id,
      });
      if (response.data.success) {
        setViewCount((prevCount) => prevCount + 1);
      } else {
        // console.error(response.data.message);
      }
    } catch (error) {
      // console.error("Error incrementing view count:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const fetchData = async () => {
      try {
        const response = await apiServices.getsingleshayari({ _id });

        if (response.data.success) {
          setAllShayari(response.data.data);
          setUserId(response.data.data.userId?._id);
          // // console.log(response)
        } else {
          // console.error(response.data.message);
        }
      } catch (error) {
        // console.error("Error fetching shayari:", error);
      }

      apiServices
        .latestShayari()
        .then((data) => {
          if (data.data.success) {
            const filteredShayaris = data.data.data.filter(
              (shayari) => shayari.status === true
            );
            setAlllatest(filteredShayaris);
            // setAllBest(data.data.data);
            // // console.log(data);
          } else {
            toast.error(data.data.message);
          }
        })
        .catch((err) => {
          // // console.log(err);
          // toast.error("Something went wrong");
        });

      try {
        const commentResponse = await apiServices.getAllshayariComments({
          shayariId: _id,
        });
        if (commentResponse.data.success) {
          setComments(commentResponse.data.data);

          // Fetch replies for each comment
          const promises = commentResponse.data.data.map(async (comment) => {
            const replyResponse = await apiServices.getAllshayariReplies({
              _id: comment._id,
            });
            if (replyResponse.data.success) {
              return { ...comment, replies: replyResponse.data.data };
            } else {
              return comment;
            }
          });

          // Wait for all reply fetch requests to complete
          const commentsWithReplies = await Promise.all(promises);

          setComments(commentsWithReplies);
        } else {
          // console.error(commentResponse.data.message);
        }
      } catch (error) {
        // console.error("Error fetching comments:", error);
      }

      try {
        const response = await apiServices.shayarigetPageViewCount({
          postId: _id,
        });

        setViewCount(response.data.count);
        if (response.data.success) {
        } else {
          // console.error(response.data.message);
        }
      } catch (error) {
        // console.error("Error fetching view count:", error);
      }

      apiServices
        .getLikeCountForShayari({ shayariId: _id })
        .then((response) => {
          const data = response.data.data;
          setLikeCount(data.likeCount);
        })
        .catch((error) => {
          // console.error('Error fetching like count:', error);
        });

      setLoading(false);
    };

    fetchData();
    incrementViewCount();
  }, [liked]);

  const shayariId = {
    shayariId: _id,
  };

  const handleLikeUnlike = (e) => {
    e.preventDefault();
    if (liked) {
      apiServices
        .ShayariUnLike(shayariId)
        .then((response) => {
          // // console.log("UnLike response>>>>",response)
          setLiked(false);
        })
        .catch((error) => {
          // console.error("Error unliking post:", error);
        });
    } else {
      apiServices
        .ShayariLike(shayariId)
        .then((response) => {
          // // console.log("Like response>>>>",response)
          setLiked(true);
        })
        .catch((error) => {
          // console.error("Error liking post:", error);
        });
    }
  };

  const createComment = (e) => {
    e.preventDefault();
    let data = {
      text: newComment,
      shayariId: _id,
    };
    apiServices
      .createshayariComment(data)
      .then((x) => {
        if (x.data.success == true) {
          toast.success("Message sent");
        } else {
          toast.error("Error try again ");
        }
      })
      .catch("Message in msg sending");
  };

  const createReply = async (_id) => {
    // // console.log(_id);
    try {
      // Send a request to your API to create a reply
      const response = await apiServices.createShayariReply({
        _id,
        text: newReply,
      });

      if (response.data.success) {
        toast.success("Message sent");
        const updatedComments = comments.map((comment) => {
          if (comment._id === _id) {
            return {
              ...comment,
              replies: [...comment.replies, response.data.data],
            };
          }
          return comment;
        });
        setCommentId(_id);
        setComments(updatedComments);
        setNewReply("");
      } else {
        // console.error(response.data.message);
      }
    } catch (error) {
      // console.error("Error creating reply:", error);
    }
  };

  const toggleReply = (commentId) => {
    setShowReply((prevShowReplies) => ({
      ...prevShowReplies,
      [commentId]: !prevShowReplies[commentId],
    }));
    if (!showReply[commentId]) {
      // Clear the newReply state when hiding replies
      setNewReply("");
    }
  };

  function isValidDate(dateString) {
    const dateObject = new Date(dateString);
    return !isNaN(dateObject.getTime());
  }

  return (
    <>
      <style>{`.shayari-content p {
  margin-bottom: 1em;  /* Add spacing between paragraphs */
}

.shayari-content {
  white-space: pre-wrap; /* preserve spaces and line breaks */
  word-wrap: break-word; /* break long words */
}
`}</style>
      <ScaleLoader loading={loading} cssOverride={override} size={70} />
      <div className={loading ? "disable-full-screen" : ""}>
        <div className="blog-blogsingle bloggray-bg">
          <div className="container">
            {/* <!-- Blog Ads --> */}
            <section id="blogads"></section>
            {/* ---------------------left sidebar start---------------------------*/}
            <div className="row align-items-start">
              <div className="col-lg-8 m-15px-tb">
                <div className="container mb-5">
                  <article className="card shadow-sm border-0 rounded-3 overflow-hidden">
                    {/* Featured Image */}
                    <div className="position-relative">
                      <img
                        src={BASE_URL_IMG + shayari?.Image}
                        alt={shayari?.title}
                        className="img-fluid w-100"
                        style={{ height: "300px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default_image.jpg";
                        }}
                      />
                      <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge bg-primary text-white px-3 py-2 rounded-pill">
                          {shayari?.Category_id?.Category_name}
                        </span>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="card-body p-4 p-md-5">
                      <h1 className="display-5 fw-bold mb-3">
                        {shayari?.title}
                      </h1>

                      {/* Meta Info */}
                      <div className="d-flex flex-wrap align-items-center mb-4 text-muted">
                        <div className="d-flex align-items-center me-4">
                          <i className="fa fa-user-circle-o me-2"></i>
                          <Link
                            to={"/poets-profile/" + `${shayari?.userId?._id}`}
                            className="text-capitalize text-decoration-none"
                          >
                            {shayari?.userId?.name || "Admin"}
                          </Link>
                        </div>
                        {/* Uncomment if date is needed */}
                        {/* <div className="d-flex align-items-center me-4">
            <i className="fa fa-calendar-o me-2"></i>
            {isValidDate(shayari?.created_at) ? format(new Date(shayari?.created_at), 'MMMM d, yyyy') : 'Invalid Date'}
          </div> */}
                        <div className="d-flex align-items-center">
                          <i className="fa fa-tags me-2"></i>
                          <span className="fw-bold">{shayari.tags}</span>
                        </div>
                      </div>

                      {/* Shayari Content */}
                      <div className="shayari-content">
                        {shayari?.shayari &&
                        typeof shayari.shayari === "string" ? (
                          parse(shayari.shayari)
                        ) : (
                          <p>Invalid or missing content.</p>
                        )}
                      </div>

                      {/* Article Footer: Likes, Views */}
                      <div className="d-flex flex-wrap align-items-center justify-content-start border-top pt-3">
                        <div className="like-button me-4">
                          {authenticate ? (
                            <label className="d-flex align-items-center mb-0">
                              <input
                                type="checkbox"
                                className="d-none"
                                onClick={handleLikeUnlike}
                              />
                              <svg
                                className="me-2 text-primary"
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                style={{ cursor: "pointer" }}
                              >
                                <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                              </svg>
                              <span
                                className={`fw-bold ${
                                  liked ? "text-primary" : ""
                                }`}
                              >
                                {likeCount !== null ? likeCount : "Loading..."}
                              </span>
                            </label>
                          ) : (
                            <label className="d-flex align-items-center mb-0">
                              <input
                                type="checkbox"
                                className="d-none"
                                onClick={handleReadMoreClick}
                              />
                              <svg
                                className="me-2 text-primary"
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                style={{ cursor: "pointer" }}
                              >
                                <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                              </svg>
                              <span
                                className={`fw-bold ${
                                  liked ? "text-primary" : ""
                                }`}
                              >
                                {likeCount !== null ? likeCount : "Loading..."}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="fa-solid fa-eye me-2"></i>
                          {viewCount} Views
                        </div>
                      </div>
                    </div>
                  </article>

                  {/* Comments Section */}
                  <section className="mt-5">
                    <h2 className="h4 mb-4">Comments</h2>
                    <div className="card shadow-sm border-0 rounded-3">
                      <div className="card-body p-4">
                        {/* Add Comment */}
                        <div className="d-flex mb-4">
                          <textarea
                            className="form-control me-2"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <button
                            className="btn btn-primary"
                            onClick={
                              authenticate ? createComment : handleReadMoreClick
                            }
                          >
                            Send
                          </button>
                        </div>

                        {/* Comments List */}
                        {comments && comments.length > 0 ? (
                          comments.map((comment) => (
                            <div className="mb-4" key={comment._id}>
                              <div className="d-flex">
                                <img
                                  className="rounded-circle me-3"
                                  src={
                                    BASE_URL_IMG + comment?.userId?.Image ||
                                    "/assets/images/avtar.png"
                                  }
                                  alt="avatar"
                                  width="50"
                                  height="50"
                                  onError={(e) => {
                                    e.target.src = "/assets/images/avtar.png";
                                  }}
                                />
                                <div className="flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-baseline">
                                    <h6 className="mb-1">
                                      <Link
                                        to={
                                          "/poets-profile/" +
                                          `${comment?.userId?._id}`
                                        }
                                        className="text-decoration-none text-capitalize"
                                      >
                                        {comment.userId.name}
                                      </Link>
                                      <small className="text-muted ms-2">
                                        {format(
                                          new Date(comment.created_at),
                                          "MMMM d, yyyy"
                                        )}
                                      </small>
                                    </h6>
                                    <a
                                      href="#!"
                                      className="text-primary text-decoration-none small"
                                      onClick={() => toggleReply(comment._id)}
                                    >
                                      <i className="fas fa-reply me-1"></i>
                                      {showReply[comment._id]
                                        ? "Hide Reply"
                                        : "Reply"}
                                    </a>
                                  </div>
                                  <p className="mb-2">{comment.text}</p>

                                  {/* Reply Form */}
                                  {showReply[comment._id] && (
                                    <div className="d-flex mt-3">
                                      <textarea
                                        className="form-control me-2"
                                        placeholder="Write a reply..."
                                        value={newReply}
                                        onChange={(e) =>
                                          setNewReply(e.target.value)
                                        }
                                        required
                                      />
                                      <button
                                        className="btn btn-outline-primary"
                                        onClick={
                                          authenticate
                                            ? () => createReply(comment._id)
                                            : handleReadMoreClick
                                        }
                                      >
                                        Send
                                      </button>
                                    </div>
                                  )}

                                  {/* Replies */}
                                  {comment.replies &&
                                    comment.replies.length > 0 && (
                                      <div className="mt-3">
                                        {comment.replies.map((reply) => (
                                          <div
                                            className="d-flex mb-3"
                                            key={reply._id}
                                          >
                                            <img
                                              className="rounded-circle me-3"
                                              src={
                                                BASE_URL_IMG +
                                                  reply?.userId?.Image ||
                                                "/assets/images/avtar.png"
                                              }
                                              alt="avatar"
                                              width="40"
                                              height="40"
                                              onError={(e) => {
                                                e.target.src =
                                                  "/assets/images/avtar.png";
                                              }}
                                            />
                                            <div className="flex-grow-1">
                                              <h6 className="mb-1 small">
                                                <Link
                                                  to={
                                                    "/poets-profile/" +
                                                    `${reply?.userId?._id}`
                                                  }
                                                  className="text-decoration-none text-capitalize"
                                                >
                                                  {reply.userId.name}
                                                </Link>
                                                <small className="text-muted ms-2">
                                                  {format(
                                                    new Date(reply.created_at),
                                                    "MMMM d, yyyy"
                                                  )}
                                                </small>
                                              </h6>
                                              <p className="mb-0 small">
                                                {reply.text}
                                              </p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted">
                            No comments yet. Be the first to comment!
                          </p>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div className="col-lg-4 m-15px-tb blog-aside">
                {/* <!-- Author --> */}
                <div className="widget widget-author">
                  <div className="widget-title">
                    <h3>Author</h3>
                  </div>
                  <div className="widget-body">
                    <div className="media align-items-center">
                      <div className="avatar">
                        <img
                          src={
                            BASE_URL_IMG + shayari?.userId?.Image ||
                            "/assets/images/avtar.png"
                          }
                          title=""
                          alt=""
                          onError={(e) => {
                            e.target.src = "/assets/images/avtar.png";
                          }}
                        />
                      </div>
                      <div className="media-body">
                        <h6 className="text-capitalize">
                          {" "}
                          <Link
                            className="name"
                            to={"/poets-profile/" + `${shayari?.userId?._id}`}
                          >
                            {shayari?.userId?.name || "Admin"}
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Author --> */}
                {/* <!-- category Post --> */}
                <div className="widget widget-author">
                  <div className="widget-title">
                    <h3>Category</h3>
                  </div>
                  <div className="blogbox categories">
                    <ul className="list-unstyled">
                      <li>
                        <Link to="/hindi-shayari">
                          <i className="fa-solid fa-heart"></i>Hindi
                        </Link>
                        {/* <a href="#">
                          <i className="fa-solid fa-heart"></i>Love
                        </a> */}
                      </li>
                      <li>
                        <Link to="/hindi-shayari">
                          <i className="fa-solid fa-heart"></i>English
                        </Link>
                      </li>
                      <li>
                        <Link to="/top20-shayari">
                          <i className="fa-solid fa-heart"></i>Top-20 Shayari
                        </Link>
                        {/* <a href="#">
                          <i className="fa-solid fa-heart-crack"></i>Sad
                        </a> */}
                      </li>
                      <li>
                        <Link to="/shayari-Image">
                          <i className="fa-solid fa-heart"></i>Shayari Images
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* <!-- category Post end --> */}
                {/* <!-- Trending Post --> */}
                {/* <div className="widget widget-post">
                        <div className="widget-title">
                            <h3>Trending Now</h3>
                        </div>
                        <div className="widget-body">
                        <div className="latest-post-aside media">
                                <div className="lpa-left media-body">
                                    <div className="lpa-title">
                                        <h5><a href="#">Prevent 75% of visitors from google analytics</a></h5>
                                    </div>
                                    <div className="lpa-meta">
                                        <a className="name" href="#">
                                            Rachel Roth
                                        </a>
                                        <a className="date" href="#">
                                            26 FEB 2020
                                        </a>
                                    </div>
                                </div>
                                <div className="lpa-right">
                                    <a href="#">
                                        <img src="https://www.bootdey.com/image/400x200/FFB6C1/000000" title="" alt=""/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div> */}
                {/* <!-- End Trending Post --> */}
                {/* <!-- Latest Post --> */}
                <div className="widget widget-latest-post">
                  <div className="widget-title">
                    <h3>Latest Post</h3>
                  </div>
                  <div className="widget-body">
                    {alllatest.map((data, index) => (
                      <div
                        className="latest-post-aside media"
                        key={data?._id || index}
                      >
                        <div className="lpa-left media-body">
                          <div className="lpa-title">
                            <h5 className="shayaricontent-container2">
                              <Link
                                className="shayaricontent2"
                                to={`/single-shayari/${data?._id}`}
                              >
                                {data?.shayari}
                              </Link>
                            </h5>
                          </div>
                          <div className="lpa-meta">
                            {data?.userId?._id ? (
                              <Link
                                className="name"
                                to={`/poets-profile/${data.userId._id}`}
                              >
                                {data.userId.name}
                              </Link>
                            ) : (
                              <span className="name">Admin</span>
                            )}
                          </div>
                        </div>
                        <div className="lpa-right">
                          <Link to={`/single-shayari/${data?._id}`}>
                            <img
                              src={`${BASE_URL_IMG}${
                                data?.Image?.startsWith("/")
                                  ? data?.Image.slice(1)
                                  : data?.Image
                              }`}
                              alt=""
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/default_image.jpg";
                              }}
                            />
                          </Link>
                        </div>
                      </div>
                    ))}
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
                                <a href="#">Love</a>
                                <a href="#">Romantic</a>
                                <a href="#">Sad</a>
                                <a href="#">Attitude</a>
                                <a href="#">Shayari</a>
                                <a href="#">beautifull</a>
                              
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
