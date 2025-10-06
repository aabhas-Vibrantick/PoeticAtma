import { Link, useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import parse from "html-react-parser";

export default function Singleprose() {
  const { _id, slug } = useParams();
  const [prose, setAllProse] = useState({});
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [showReply, setShowReply] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(null);
  const [alllatest, setAlllatest] = useState([]);
  const navigate = useNavigate();
  const authenticate = sessionStorage.getItem("authenticate");

  const handleReadMoreClick = () => {
    if (!authenticate) {
      navigate("/login");
    }
  };

  const override = {
    display: "block",
    position: "absolute",
    top: "25%",
    left: "48%",
    zIndex: "1",
  };

  const incrementViewCount = async (id) => {
    if (!id) return;
    try {
      const response = await apiServices.proseincrementPageView({ postId: id });
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
        // 1) Fetch prose by slug
        const res = await apiServices.getsingleproseBySlug(slug);
        const ok = res?.data?.success && res?.data?.data;
        if (!ok) {
          navigate("/404", { replace: true });
          return;
        }

        const item = res.data.data;
        const proseId = item._id;

        if (!isMounted) return;

        setAllProse(item);

        // 2) Comments + replies
        try {
          const commentRes = await apiServices.getAllproseComments({ proseId });
          if (isMounted && commentRes.data.success) {
            const base = commentRes.data.data || [];
            const withReplies = await Promise.all(
              base.map(async (c) => {
                const rr = await apiServices.getAllproseReplies({
                  commentId: c._id,
                });
                return rr.data.success
                  ? { ...c, replies: rr.data.data }
                  : { ...c, replies: [] };
              })
            );

            if (isMounted) setComments(withReplies);
          }
        } catch {}

        // 3) Page view count
        try {
          const vc = await apiServices.prosegetPageViewCount({
            postId: proseId,
          });
          if (isMounted && vc.data) setViewCount(vc.data.count ?? 0);
        } catch {}

        // 4) Like count
        apiServices
          .getLikeCountForProse({ proseId })
          .then((r) => {
            if (!isMounted) return;
            const count = r?.data?.data?.likeCount ?? 0;
            setLikeCount(count);
          })
          .catch(() => {});

        // 5) Latest Prose
        apiServices
          .latestProse()
          .then(({ data }) => {
            if (!isMounted) return;
            if (data.success) {
              setAlllatest(data.data.filter((p) => p.status === true));
            } else {
              toast.error(data.message);
            }
          })
          .catch(() => {
            toast.error("Something went wrong");
          });

        // 6) Increment view count
        await incrementViewCount(proseId);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [slug, navigate]);

  const handleLikeUnlike = () => {
    if (!prose?._id) return;

    const data = { proseId: prose._id };

    if (liked) {
      apiServices
        .ProseUnLike(data)
        .then((res) => {
          setLiked(false);
          setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
        })
        .catch(() => toast.error("Error unliking post"));
    } else {
      apiServices
        .ProseLike(data)
        .then((res) => {
          setLiked(true);
          setLikeCount((prev) => prev + 1);
        })
        .catch(() => toast.error("Error liking post"));
    }
  };

  // Create comment
  const createComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Please Enter Comment");
      return;
    }
    const data = {
      text: newComment,
      proseId: prose._id,
    };
    apiServices
      .createproseComment(data)
      .then((x) => {
        if (x.data.success) {
          toast.success("Comment posted");
          // ✅ backend already returns populated userId
          setComments((prev) => [x.data.data, ...prev]);
          setNewComment("");
        } else {
          toast.error(x.data.message || "Error posting comment");
        }
      })
      .catch(() => {
        toast.error("Error posting comment");
      });
  };

  // Create reply
  const createReply = async (commentId) => {
    if (!newReply.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }
    try {
      const response = await apiServices.createProseReply({
        commentId, // ✅ correct key
        text: newReply,
      });

      if (response.data.success) {
        toast.success("Reply posted");

        const newReplyObj = response.data.data; // ✅ populated reply from backend

        const updatedComments = comments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), newReplyObj],
              }
            : comment
        );

        setComments(updatedComments);
        setNewReply("");
        setShowReply((prev) => ({ ...prev, [commentId]: false }));
      } else {
        toast.error(response.data.message || "Error posting reply");
      }
    } catch (error) {
      toast.error("Error posting reply");
    }
  };

  // Toggle reply box
  const toggleReply = (commentId) => {
    setShowReply((prevShowReplies) => ({
      ...prevShowReplies,
      [commentId]: !prevShowReplies[commentId],
    }));
    if (showReply[commentId]) {
      setNewReply("");
    }
  };

  return (
    <>
      <style>{`
        .prose-content p {
          margin-bottom: 1em;
        }
        .prose-content {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
      <ScaleLoader loading={loading} cssOverride={override} size={70} />
      <div className={loading ? "disable-full-screen" : ""}>
        <div className="blog-blogsingle bloggray-bg">
          <div className="container">
            <section id="blogads">
  <img src="/poeticatma_single_banner.jpg" alt="Blog Advertisement Banner" />
</section>
            <div className="row align-items-start">
              <div className="col-lg-8 m-15px-tb">
                <div className="container mb-5">
                  <article className="card shadow-sm border-0 rounded-3 overflow-hidden">
                    <div className="position-relative">
                      <img
                        src={
                          prose?.Image
                            ? BASE_URL_IMG + prose.Image
                            : "/default_image.jpg"
                        }
                        alt={prose?.title || "Prose Image"}
                        className="img-fluid w-100"
                        style={{ height: "300px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default_image.jpg";
                        }}
                      />
                      <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge bg-primary text-white px-3 py-2 rounded-pill">
                          {prose?.Category_id?.Category_name || "Uncategorized"}
                        </span>
                      </div>
                    </div>
                    <div className="card-body p-4 p-md-5">
                      <h1 className="display-5 fw-bold mb-3">
                        {prose?.title || "Untitled"}
                      </h1>
                      <div className="d-flex flex-wrap align-items-center mb-4 text-muted">
                        <div className="d-flex align-items-center me-4">
                          <i className="fa fa-user-circle-o me-2"></i>
                          <Link
                            to={
                              prose?.userId?._id
                                ? `/poets-profile/${prose.userId._id}`
                                : "#"
                            }
                            className="text-capitalize text-decoration-none"
                          >
                            {prose?.userId?.name || "Admin"}
                          </Link>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="fa fa-tags me-2"></i>
                          <span className="fw-bold">
                            {prose?.tags || "No tags"}
                          </span>
                        </div>
                      </div>
                      <div className="lead mb-4">
                        <div className="prose-content">
                          {prose?.prose && typeof prose.prose === "string" ? (
                            parse(prose.prose)
                          ) : (
                            <p>No content available.</p>
                          )}
                        </div>
                      </div>
                      <div className="d-flex flex-wrap align-items-center justify-content-start border-top pt-3">
                        <div className="like-button me-4">
                          {authenticate ? (
                            <label className="d-flex align-items-center mb-0">
                              <input
                                type="checkbox"
                                className="d-none"
                                checked={liked}
                                onChange={handleLikeUnlike}
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
                              <span className="fw-bold">
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
                  <section className="mt-5">
                    <h2 className="h4 mb-4">Comments</h2>
                    <div className="card shadow-sm border-0 rounded-3">
                      <div className="card-body p-4">
                        <div className="d-flex mb-4">
                          <textarea
                            className="form-control me-2"
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
                        {comments && comments.length > 0 ? (
                          comments.map((comment) => (
                            <div className="mb-4" key={comment._id}>
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
                                  onError={(e) =>
                                    (e.target.src = "/assets/images/avtar.png")
                                  }
                                />
                                <div className="flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-baseline">
                                    <h6 className="mb-1">
                                      <Link
                                        to={
                                          comment?.userId?._id
                                            ? `/poets-profile/${comment.userId._id}`
                                            : "#"
                                        }
                                        className="text-decoration-none text-capitalize"
                                      >
                                        {comment?.userId?.name || "Anonymous"}
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

                                  {/* Reply form */}
                                  {showReply[comment._id] && (
                                    <div className="d-flex mt-3">
                                      <textarea
                                        className="form-control me-2"
                                        placeholder="Write a reply..."
                                        value={newReply}
                                        onChange={(e) =>
                                          setNewReply(e.target.value)
                                        }
                                      />
                                      <button
                                        className="btn btn-outline-primary"
                                        onClick={() => createReply(comment._id)}
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
                                              onError={(e) =>
                                                (e.target.src =
                                                  "/assets/images/avtar.png")
                                              }
                                            />
                                            <div className="flex-grow-1">
                                              <h6 className="mb-1 small">
                                                <Link
                                                  to={
                                                    reply?.userId?._id
                                                      ? `/poets-profile/${reply.userId._id}`
                                                      : "#"
                                                  }
                                                  className="text-decoration-none text-capitalize"
                                                >
                                                  {reply?.userId?.name ||
                                                    "Anonymous"}
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
                {/* Author */}
                <div className="widget widget-author">
                  <div className="widget-title">
                    <h3>Author</h3>
                  </div>
                  <div className="widget-body">
                    <div className="media align-items-center">
                      <div className="avatar">
                        <img
                          src={
                            prose?.userId?.Image
                              ? BASE_URL_IMG + prose.userId.Image
                              : "/assets/images/avtar.png"
                          }
                          alt={prose?.userId?.name || "Author"}
                          onError={(e) => {
                            e.currentTarget.src = "/assets/images/avtar.png";
                          }}
                        />
                      </div>
                      <div className="media-body">
                        <h6 className="text-capitalize">
                          <Link
                            className="name"
                            to={
                              prose?.userId?.slug
                                ? `/poets-profile/${encodeURIComponent(
                                    prose.userId.slug
                                  )}`
                                : "#"
                            }
                          >
                            {prose?.userId?.name || "Admin"}
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category (static links left as-is; switch to dynamic slug if available) */}
                <div className="widget widget-author">
                  <div className="widget-title">
                    <h3>Category</h3>
                  </div>
                  <div className="blogbox categories">
                    <li>
                      <Link to="/hindi-prose">
                        <i className="fa-solid fa-heart"></i>Hindi
                      </Link>
                    </li>
                    <li>
                      <Link to="/english-prose">
                        <i className="fa-solid fa-heart"></i>English
                      </Link>
                    </li>
                    <li>
                      <Link to="/top20-prose">
                        <i className="fa-solid fa-heart"></i>Top-10 Prose
                      </Link>
                    </li>
                    <li>
                      <Link to="/prose-Image">
                        <i className="fa-solid fa-heart"></i>Prose Images
                      </Link>
                    </li>
                  </div>
                </div>

                {/* Latest Post */}
                <div className="widget widget-latest-post">
                  <div className="widget-title">
                    <h3>Latest Post</h3>
                  </div>
                  <div className="widget-body">
                    {alllatest.map((item) => {
                      const proseSlug = item?.slug || item?._id; // fallback for old records
                      const poetSlug = item?.userId?.slug || item?.userId?._id; // fallback for old users
                      return (
                        <div
                          className="latest-post-aside media"
                          key={item?._id}
                        >
                          <div className="lpa-left media-body">
                            <div className="lpa-title">
                              <h5 className="shayaricontent-container2">
                                <Link
                                  className="shayaricontent2"
                                  to={`/single-prose/${encodeURIComponent(
                                    proseSlug
                                  )}`}
                                >
                                  {item?.prose || "No content"}
                                </Link>
                              </h5>
                            </div>
                            <div className="lpa-meta">
                              <Link
                                className="name"
                                to={
                                  poetSlug
                                    ? `/poets-profile/${encodeURIComponent(
                                        poetSlug
                                      )}`
                                    : "#"
                                }
                              >
                                {item?.userId?.name || "Anonymous"}
                              </Link>
                            </div>
                          </div>
                          <div className="lpa-right">
                            <Link
                              to={`/single-prose/${encodeURIComponent(
                                proseSlug
                              )}`}
                            >
                              <img
                                src={
                                  item?.Image
                                    ? BASE_URL_IMG + item.Image
                                    : "/default_image.jpg"
                                }
                                alt={item?.title || "Post Image"}
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
