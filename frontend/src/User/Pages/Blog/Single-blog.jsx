import { Link, useParams ,useNavigate } from "react-router-dom";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect } from "react";
import { useState } from "react";
import "./BlogLike.css";
import "./viewblog.css";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import parse from "html-react-parser";
import { format } from "date-fns";
export default function Singleblog() {
  // const param = useParams();
  // const id = param._id;
    const { slug } = useParams();
  const navigate = useNavigate();
  const parse = require("html-react-parser");
  const { _id } = useParams();
  const [allBlog, setAllBlog] = useState("");
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [showReply, setShowReply] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(null);
  const authenticate = sessionStorage.getItem("authenticate");
  const [alllatest, setAlllatest] = useState([]);

  const handleReadMoreClick = () => {
    if (!authenticate) {
      window.location.href = "/login";
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

  const incrementViewCount = async (id) => {
  if (!id) return; // guard against undefined
  try {
    const response = await apiServices.blogincrementPageView({ postId: id });
    if (response.data.success) {
      setViewCount((prevCount) => prevCount + 1);
    }
  } catch (error) {
    // console.error("Error incrementing view count:", error);
  }
};
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        // 1) fetch blog by slug
        const res = await apiServices.getsingleblogBySlug(slug); // <-- GET /blog/:slug
        const ok = res?.data?.success && res?.data?.data;
        if (!ok) {
          navigate("/404", { replace: true });
          return;
        }

        const item = res.data.data;
        const blogId = item._id;

        if (!isMounted) return;

        setAllBlog(item);

        // 2) latest blogs (unchanged)
        apiServices
          .latestBlog()
          .then(({ data }) => {
            if (!isMounted) return;
            if (data.success) {
              const filtered = data.data.filter(b => b.status === true && !b.isFeatured);
              setAlllatest(filtered);
            } else {
              toast.error(data.message);
            }
          })
          .catch(() => {
            toast.error("Something went wrong");
          });

        // 3) comments + replies (use blogId)
        try {
          const commentRes = await apiServices.getAllComments({ blogId });
          if (isMounted && commentRes.data.success) {
            const base = commentRes.data.data || [];
            const withReplies = await Promise.all(
              base.map(async (c) => {
                const rr = await apiServices.getAllReplies({ _id: c._id });
                return rr.data.success ? { ...c, replies: rr.data.data } : { ...c, replies: [] };
              })
            );
            if (isMounted) setComments(withReplies);
          }
        } catch {}

        // 4) page view count (read)
        try {
          const vc = await apiServices.bloggetPageViewCount({ postId: blogId });
          if (isMounted && vc.data) setViewCount(vc.data.count ?? 0);
        } catch {}

        // 5) like count (read)
        apiServices
          .getLikeCountForBlog({ blogId })
          .then((r) => {
            if (!isMounted) return;
            const count = r?.data?.data?.likeCount ?? 0;
            setLikeCount(count);
          })
          .catch(() => {});

        // 6) increment views
        await incrementViewCount(blogId);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [slug, liked]); // re-run if slug changes or you toggle like

  const blogId = {
    blogId: _id,
  };

  const handleLikeUnlike = () => {
    if (liked) {
      apiServices
        .BlogUnLike(blogId)
        .then((response) => {
          // // console.log("UnLike response>>>>",response)
          setLiked(false);
        })
        .catch((error) => {
          // console.error("Error unliking post:", error);
        });
    } else {
      apiServices
        .BlogLike(blogId)
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
      blogId: _id,
    };
    apiServices
      .createblogComment(data)
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
      const response = await apiServices.createReply({
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
        toast.error(response.data.message);
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
                  {/* --- Modern Article Card --- */}
                  <article className="card shadow-sm border-0 rounded-3 overflow-hidden">
                    {/* Featured Image */}
                    <div className="position-relative">
                      <img
                        src={BASE_URL_IMG + allBlog?.Image}
                        className="img-fluid w-100"
                        alt={allBlog?.title}
                        style={{ height: "350px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default_image.jpg";
                        }}
                      />
                      {/* Category Badge */}
                      <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge bg-primary text-white px-3 py-2 rounded-pill">
                          {allBlog?.Category_id?.Category_name}
                        </span>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="card-body p-4 p-md-5">
                      {/* Title */}
                      <h1 className="display-5 fw-bold mb-3">
                        {allBlog?.title}
                      </h1>

                      {/* Meta Info */}
                      <div className="d-flex flex-wrap align-items-center mb-4 text-muted">
                        <div className="d-flex align-items-center me-4">
                          <i className="fa fa-user-circle-o me-2"></i>
                          <Link
                            to={`/poets-profile/${allBlog?.userId?._id}`}
                            className="text-capitalize text-decoration-none text-muted fw-medium"
                          >
                            {allBlog?.userId?.name || "Admin"}
                          </Link>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="fa fa-tags me-2"></i>
                          <span className="fw-bold">{allBlog.tags}</span>
                        </div>
                      </div>

                      {/* Main Blog Content */}
                      <div className="blog-content lead mb-4">
                        <p className="fst-italic">{allBlog?.description}</p>
                        {allBlog?.blog && typeof allBlog.blog === "string" ? (
                          parse(allBlog.blog)
                        ) : (
                          <p>Invalid or missing blog content.</p>
                        )}
                      </div>

                      {/* Article Footer: Likes, Views, Share */}
                      <div className="d-flex flex-wrap align-items-center justify-content-between border-top pt-4">
                        <div className="d-flex align-items-center">
                          {/* Like Button */}
                          <div className="like-button me-4">
                            <label
                              className="d-flex align-items-center mb-0"
                              style={{ cursor: "pointer" }}
                            >
                              <input
                                type="checkbox"
                                className="d-none"
                                onClick={
                                  authenticate
                                    ? handleLikeUnlike
                                    : handleReadMoreClick
                                }
                              />
                              <svg
                                className={
                                  liked ? "text-danger" : "text-primary"
                                }
                                width="24"
                                height="24"
                                viewBox="0 0 512 512"
                                style={{ fill: "currentColor" }}
                              >
                                <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                              </svg>
                              <span className="fw-bold ms-2">
                                {likeCount !== null ? likeCount : "0"}
                              </span>
                            </label>
                          </div>
                          {/* View Count */}
                          <div className="d-flex align-items-center text-muted">
                            <i className="fa-solid fa-eye me-2"></i>
                            <span>{viewCount} Views</span>
                          </div>
                        </div>
                        {/* Social Share Buttons */}
                        <div className="share-buttons mt-3 mt-md-0">
                          <FacebookShareButton
                            url={window.location.href}
                            quote={allBlog?.title}
                            className="btn btn-outline-primary btn-sm me-2"
                          >
                            <i className="fa fa-facebook me-1"></i> Facebook
                          </FacebookShareButton>
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                              `${allBlog?.title}\n\n${window.location.href}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-success btn-sm"
                          >
                            <i className="fa-brands fa-whatsapp me-1"></i>{" "}
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>

                  {/* --- Modern Comments Section --- */}
                  {authenticate && (
                    <section className="mt-5">
                      <h2 className="h4 mb-4">Comments</h2>
                      <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4">
                          {/* Add Comment Form */}
                          <div className="d-flex mb-4">
                            <textarea
                              className="form-control me-2"
                              rows="3"
                              placeholder="Write a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button
                              className="btn btn-primary"
                              onClick={createComment}
                            >
                              Send
                            </button>
                          </div>

                          {/* Comments List */}
                          {comments && comments.length > 0 ? (
                            comments.map((comment) => (
                              <div
                                className="mb-4 border-bottom pb-3"
                                key={comment._id}
                              >
                                <div className="d-flex">
                                  <img
                                    className="rounded-circle me-3"
                                    src={
                                      comment?.userId?.Image
                                        ? BASE_URL_IMG + comment.userId.Image
                                        : "/assets/images/avtar.png"
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
                                          to={`/poets-profile/${comment.userId?._id}`}
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
                                          ? "Hide"
                                          : "Reply"}
                                      </a>
                                    </div>
                                    <p className="mb-2">{comment.text}</p>

                                    {/* Reply Form (Conditional) */}
                                    {showReply[comment._id] && (
                                      <div className="d-flex mt-3">
                                        <textarea
                                          className="form-control me-2"
                                          rows="2"
                                          placeholder="Write a reply..."
                                          value={newReply}
                                          onChange={(e) =>
                                            setNewReply(e.target.value)
                                          }
                                          required
                                        />
                                        <button
                                          className="btn btn-outline-primary"
                                          onClick={() =>
                                            createReply(comment._id)
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
                                                  reply?.userId?.Image
                                                    ? BASE_URL_IMG +
                                                      reply.userId.Image
                                                    : "/assets/images/avtar.png"
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
                                                    to={`/poets-profile/${reply.userId?._id}`}
                                                    className="text-decoration-none text-capitalize"
                                                  >
                                                    {reply.userId.name}
                                                  </Link>
                                                  <small className="text-muted ms-2">
                                                    {format(
                                                      new Date(
                                                        reply.created_at
                                                      ),
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
                  )}
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
            allBlog?.userId?.Image
              ? BASE_URL_IMG + allBlog.userId.Image
              : "/assets/images/avtar.png"
          }
          title=""
          alt="Author"
          onError={(e) => {
            e.target.src = "/assets/images/avtar.png";
          }}
        />
      </div>
      <div className="media-body">
        <h6 className="text-capitalize">
          <Link
            className="name"
            to={`/poets-profile/${encodeURIComponent(
              allBlog?.userId?.slug || allBlog?.userId?._id
            )}`}
          >
            {allBlog?.userId?.name || "Admin"}
          </Link>
        </h6>
      </div>
    </div>
    <p></p>
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
                        <Link to="/blogs" state={{ category: "Love" }}>
                          <i className="fa-solid fa-heart"></i>Love
                        </Link>
                      </li>
                      <li>
                        <Link to="/blogs" state={{ category: "Life" }}>
                          <i className="fa-solid fa-heart"></i>Life
                        </Link>
                      </li>
                      <li>
                        <Link to="/blogs" state={{ category: "Nature" }}>
                          <i className="fa-solid fa-heart"></i>Nature
                        </Link>
                      </li>
                      <li>
                        <Link to="/blogs" state={{ category: "Sorrow" }}>
                          <i className="fa-solid fa-heart"></i>Sorrow
                        </Link>
                      </li>
                      <li>
                        <Link to="/blogs" state={{ category: "Spiritual" }}>
                          <i className="fa-solid fa-heart"></i>Spiritual
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
                          <h5>
                            <a href="#">
                              Prevent 75% of visitors from google analytics
                            </a>
                          </h5>
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
                          <img
                            src="https://www.bootdey.com/image/400x200/FFB6C1/000000"
                            title=""
                            alt=""
                          />
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
                      <div className="latest-post-aside media">
                        <div className="lpa-left media-body">
                          <div className="lpa-title">
                            <h5 className="shayaricontent-container2 ">
                              {" "}
                              <Link
                                className="shayaricontent2 "
                                to={"/single-blog/" + `${data?._id}`}
                              >
                                {data?.description}
                              </Link>
                            </h5>
                          </div>
                          <div className="lpa-meta">
                            {/* <a  href="#">
                              Rachel Roth
                            </a> */}
                            <Link
                              className="name"
                              to={"/poets-profile/" + `${data?.userId?._id}`}
                            >
                              {data?.userId?.name || "Admin"}
                            </Link>
                            {/* <a className="date" href="#">
                            {format(new Date(data.created_at), 'MMMM d, yyyy')}
                            </a> */}
                          </div>
                        </div>
                        <div className="lpa-right">
                          {/* <a href="#"> */}
                          <Link to={"/single-blog/" + `${data?._id}`}>
                            <img
                              src={BASE_URL_IMG + data?.Image}
                              alt=""
                              className=""
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/default_image.jpg";
                              }}
                            />
                          </Link>
                          {/* <img src="https://www.bootdey.com/image/400x200/FFB6C1/000000" title="" alt="" /> */}
                          {/* </a> */}
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
