import { Link} from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import parse from "html-react-parser";

export default function SingleSher() {
  const { _id } = useParams();
   const { slug } = useParams();      // from /single-sher/:slug
  const navigate = useNavigate();
  const [sher, setAllSher] = useState([]);
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
    position: "absolute",
    top: "25%",
    left: "48%",
    zIndex: "1",
  };

  const incrementViewCount = async (id) => {
  if (!id) return; // guard against undefined
  try {
    const response = await apiServices.sherincrementPageView({ postId: id });
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
        // 1) fetch by slug
        const res = await apiServices.getsinglesherBySlug(slug); // <-- create this API (GET /sher/:slug)
        const ok = res?.data?.success && res?.data?.data;
        if (!ok) {
          navigate("/404", { replace: true });
          return;
        }

        const item = res.data.data;
        const sherId = item._id;

        if (!isMounted) return;

        setAllSher(item);

        // 2) latest shers (unchanged)
        apiServices
          .latestSher()
          .then(({ data }) => {
            if (!isMounted) return;
            if (data.success) {
              setAlllatest(data.data.filter((s) => s.status === true));
            }
          })
          .catch(() => {});

        // 3) comments + replies (use sherId)
        try {
          const commentRes = await apiServices.getAllsherComments({ sherId });
          if (isMounted && commentRes.data.success) {
            const base = commentRes.data.data || [];
            const withReplies = await Promise.all(
              base.map(async (c) => {
                const rr = await apiServices.getAllsherReplies({ _id: c._id });
                return rr.data.success ? { ...c, replies: rr.data.data } : { ...c, replies: [] };
              })
            );
            if (isMounted) setComments(withReplies);
          }
        } catch {}

        // 4) view count (read)
        try {
          const vc = await apiServices.shergetPageViewCount({ postId: sherId });
          if (isMounted && vc.data) setViewCount(vc.data.count ?? 0);
        } catch {}

        // 5) like count
        apiServices
          .getLikeCountForSher({ sherId })
          .then((r) => {
            if (!isMounted) return;
            const count = r?.data?.data?.likeCount ?? 0;
            setLikeCount(count);
          })
          .catch(() => {});

        // 6) increment views after load
        await incrementViewCount(sherId);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const sherId = {
    sherId: _id,
  };

  const handleLikeUnlike = () => {
    if (liked) {
      apiServices
        .SherUnLike(sherId)
        .then((response) => {
          setLiked(false);
        })
        .catch((error) => {
          // console.error("Error unliking post:", error);
        });
    } else {
      apiServices
        .SherLike(sherId)
        .then((response) => {
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
      sherId: _id,
    };
    apiServices
      .createsherComment(data)
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
    try {
      const response = await apiServices.createSherReply({
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
      setNewReply("");
    }
  };

  function isValidDate(dateString) {
    const dateObject = new Date(dateString);
    return !isNaN(dateObject.getTime());
  }

  return (
    <>
      <style>{`.sher-content p {
  margin-bottom: 1em;
}

.sher-content {
  white-space: pre-wrap;
  word-wrap: break-word;
}`}</style>
      <ScaleLoader loading={loading} cssOverride={override} size={70} />
      <div className={loading ? "disable-full-screen" : ""}>
        <div className="blog-blogsingle bloggray-bg">
          <div className="container">
            <section id="blogads"></section>
            <div className="row align-items-start">
              <div className="col-lg-8 m-15px-tb">
                <div className="container mb-5">
                  <article className="card shadow-sm border-0 rounded-3 overflow-hidden">
                    <div className="position-relative">
                      <img
                        src={BASE_URL_IMG + sher?.Image}
                        alt={sher?.title}
                        className="img-fluid w-100"
                        style={{ height: "300px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default_image.jpg";
                        }}
                      />
                      <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge bg-primary text-white px-3 py-2 rounded-pill">
                          {sher?.Category_id?.Category_name}
                        </span>
                      </div>
                    </div>
                    <div className="card-body p-4 p-md-5">
                      <h1 className="display-5 fw-bold mb-3">{sher?.title}</h1>
                      <div className="d-flex flex-wrap align-items-center mb-4 text-muted">
                        <div className="d-flex align-items-center me-4">
                          <i className="fa fa-user-circle-o me-2"></i>
                          <Link
                            to={`/poets-profile/${sher?.userId?._id}`}
                            className="text-capitalize text-decoration-none"
                          >
                            {sher?.userId?.name || "Admin"}
                          </Link>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="fa fa-tags me-2"></i>
                          <span className="fw-bold">{sher?.tags}</span>
                        </div>
                      </div>
                      <div className="sher-content">
                        {sher?.sher && typeof sher.sher === "string" ? (
                          parse(sher.sher)
                        ) : (
                          <p>Invalid or missing content.</p>
                        )}
                      </div>
                      <div className="d-flex flex-wrap align-items-center justify-content-start border-top pt-3">
                        <div className="like-button me-4">
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
                                  onError={(e) => {
                                    e.target.src = "/assets/images/avtar.png";
                                  }}
                                />
                                <div className="flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-baseline">
                                    <h6 className="mb-1">
                                      <Link
                                        to={`/poets-profile/${comment.userId?._id || ""}`}
                                        className="text-decoration-none text-capitalize"
                                      >
                                        {comment.userId?.name || "Anonymous"}
                                      </Link>
                                      <small className="text-muted ms-2">
                                        {isValidDate(comment.created_at)
                                          ? format(
                                              new Date(comment.created_at),
                                              "MMMM d, yyyy"
                                            )
                                          : "Invalid Date"}
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
                                        onClick={() => createReply(comment._id)}
                                      >
                                        Send
                                      </button>
                                    </div>
                                  )}
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
                                                  to={`/poets-profile/${reply.userId?._id || ""}`}
                                                  className="text-decoration-none text-capitalize"
                                                >
                                                  {reply.userId?.name || "Anonymous"}
                                                </Link>
                                                <small className="text-muted ms-2">
                                                  {isValidDate(reply.created_at)
                                                    ? format(
                                                        new Date(reply.created_at),
                                                        "MMMM d, yyyy"
                                                      )
                                                    : "Invalid Date"}
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
  <div className="widget widget-author">
    <div className="widget-title">
      <h3>Author</h3>
    </div>
    <div className="widget-body">
      <div className="media align-items-center">
        <div className="avatar">
          <img
            src={BASE_URL_IMG + (sher?.userId?.Image || "/assets/images/avtar.png")}
            title={sher?.userId?.name || "Author"}
            alt={sher?.userId?.name || "Author"}
            onError={(e) => {
              e.target.src = "/assets/images/avtar.png";
            }}
          />
        </div>
        <div className="media-body">
          <h6 className="text-capitalize">
            <Link
              className="name"
              to={`/poets-profile/${encodeURIComponent(sher?.userId?.slug)}`}
            >
              {sher?.userId?.name || "Admin"}
            </Link>
          </h6>
        </div>
      </div>
    </div>
  </div>

  <div className="widget widget-author">
    <div className="widget-title">
      <h3>Category</h3>
    </div>
    <div className="blogbox categories">
      <ul className="list-unstyled">
        <li>
          <Link to="/english-sher">
            <i className="fa-solid fa-heart"></i>English
          </Link>
        </li>
        <li>
          <Link to="/hindi-sher">
            <i className="fa-solid fa-heart"></i>Hindi
          </Link>
        </li>
        <li>
          <Link to="/top20-sher">
            <i className="fa-solid fa-heart"></i>Top-20 Sher
          </Link>
        </li>
        <li>
          <Link to="/sher-Image">
            <i className="fa-solid fa-heart"></i>Sher Images
          </Link>
        </li>
      </ul>
    </div>
  </div>

  <div className="widget widget-latest-post">
    <div className="widget-title">
      <h3>Latest Post</h3>
    </div>
    <div className="widget-body">
      {alllatest.map((data) => {
        const slug = data?.slug || data?._id; // fallback for old shers
        const poetSlug = data?.userId?.slug || data?.userId?._id; // fallback for old users
        return (
          <div className="latest-post-aside media" key={data._id}>
            <div className="lpa-left media-body">
              <div className="lpa-title">
                <h5 className="shayaricontent-container2">
                  <Link
                    className="shayaricontent2"
                    to={`/single-sher/${encodeURIComponent(slug)}`}
                  >
                    {data?.sher}
                  </Link>
                </h5>
              </div>
              <div className="lpa-meta">
                <Link
                  className="name"
                  to={`/poets-profile/${encodeURIComponent(poetSlug)}`}
                >
                  {data?.userId?.name || "Admin"}
                </Link>
              </div>
            </div>
            <div className="lpa-right">
              <Link to={`/single-sher/${encodeURIComponent(slug)}`}>
                <img
                  src={BASE_URL_IMG + (data?.Image || "no-image.jpg")}
                  alt={data?.title || "sher"}
                  className=""
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default_image.jpg";
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