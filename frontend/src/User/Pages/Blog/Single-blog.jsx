import { Link, useParams, useNavigate } from "react-router-dom";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from "react";
import "./BlogLike.css";
import "./viewblog.css";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import parse from "html-react-parser";
import { format } from "date-fns";

export default function Singleblog() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [allBlog, setAllBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [showReply, setShowReply] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState(0);
  const [alllatest, setAlllatest] = useState([]);
  const authenticate = sessionStorage.getItem("authenticate");
const isAuthed = !!sessionStorage.getItem("authenticate");
  const override = {
    display: "block",
    margin: "0 auto",
    position: "absolute",
    top: "30%",
    left: "48%",
    zIndex: "1",
  };

  // increment + fetch latest views
  const incrementViewCount = async (id) => {
    if (!id) return;
    try {
      await apiServices.blogincrementPageView({ postId: id });
      const vc = await apiServices.bloggetPageViewCount({ postId: id });
      if (vc.data.success) {
        setViewCount(vc.data.count || 0);
      }
    } catch {}
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        // 1) Fetch blog by slug
        const res = await apiServices.getsingleblogBySlug(slug);
        if (!res?.data?.success || !res?.data?.data) {
          navigate("/404", { replace: true });
          return;
        }
        const blog = res.data.data;
        if (!isMounted) return;
        setAllBlog(blog);

        const blogId = blog._id;

        // 2) Latest blogs
        const latestRes = await apiServices.latestBlog();
        if (isMounted && latestRes.data.success) {
          setAlllatest(
            latestRes.data.data.filter(
              (b) => b.status === true && !b.isFeatured
            )
          );
        }

        // 3) Comments + replies
        const commentRes = await apiServices.getAllComments({ blogId });
        if (isMounted && commentRes.data.success) {
          const base = commentRes.data.data || [];
          const withReplies = await Promise.all(
            base.map(async (c) => {
              const rr = await apiServices.getAllReplies({ commentId: c._id });
              return {
                ...c,
                replies: rr.data.success ? rr.data.data || [] : [],
              };
            })
          );
          setComments(withReplies);

          setComments(withReplies);
        }

        // // 4) View count
        // const vc = await apiServices.bloggetPageViewCount({ postId: blogId });
        // if (isMounted && vc.data.success) {
        //   setViewCount(vc.data.count || 0);
        // }

        // 5) Like count
        const likeRes = await apiServices.getLikeCountForBlog({ blogId });
        if (isMounted && likeRes.data.success) {
          setLikeCount(likeRes.data.likeCount || 0);
        }

        // 6) Increment views
        await incrementViewCount(blogId);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // ✅ LIKE / UNLIKE
  const handleLikeUnlike = async () => {
    if (!isAuthed) {
   navigate("/login");
   return;
  }
    if (!allBlog?._id) return;

    const data = { blogId: allBlog._id };
    try {
      if (liked) {
        const response = await apiServices.BlogUnLike(data);
        if (response.data.success) {
          setLiked(false);
          setLikeCount(response.data.likeCount);
        }
      } else {
        const response = await apiServices.BlogLike(data);
        if (response.data.success) {
          setLiked(true);
          setLikeCount(response.data.likeCount);
        }
      }
    } catch {
      toast.error("Error updating like");
    }
  };

  // ✅ COMMENT
  const createComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    try {
      const response = await apiServices.createblogComment({
        text: newComment,
        blogId: allBlog._id,
      });
      if (response.data.success) {
        toast.success("Comment posted");
        setComments((prev) => [response.data.data, ...prev]);
        setNewComment("");
      } else {
        toast.error(response.data.message || "Error posting comment");
      }
    } catch {
      toast.error("Error posting comment");
    }
  };

  // ✅ REPLY
  const createReply = async (commentId) => {
    if (!newReply.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }
    try {
      const response = await apiServices.createReply({
        commentId,
        text: newReply,
      });
      if (response.data.success) {
        toast.success("Reply posted");
        const reply = response.data.data;
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === commentId
              ? { ...comment, replies: [...(comment.replies || []), reply] }
              : comment
          )
        );

        setNewReply("");
        setShowReply((prev) => ({ ...prev, [commentId]: false }));
      } else {
        toast.error(response.data.message || "Error posting reply");
      }
    } catch {
      toast.error("Error posting reply");
    }
  };

  // toggle reply form
  const toggleReply = (commentId) => {
    setShowReply((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
    if (showReply[commentId]) setNewReply("");
  };

  const isValidDate = (dateString) => {
    const dateObject = new Date(dateString);
    return !isNaN(dateObject.getTime());
  };

  return (
    <>
      <ScaleLoader loading={loading} cssOverride={override} size={70} />
      <div className={loading ? "disable-full-screen" : ""}>
        <div className="blog-blogsingle bloggray-bg">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-lg-8 m-15px-tb">
                <div className="container mb-5">
                  <article className="card shadow-sm border-0 rounded-3 overflow-hidden">
                    <div className="position-relative">
                      <img
                        src={BASE_URL_IMG + allBlog?.Image}
                        className="img-fluid w-100"
                        alt={allBlog?.title}
                        style={{ height: "350px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "/default_image.jpg";
                        }}
                      />
                      <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge bg-primary text-white px-3 py-2 rounded-pill">
                          {allBlog?.Category_id?.Category_name}
                        </span>
                      </div>
                    </div>

                    <div className="card-body p-4 p-md-5">
                      <h1 className="display-5 fw-bold mb-3">
                        {allBlog?.title}
                      </h1>
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
                          <span className="fw-bold">{allBlog?.tags}</span>
                        </div>
                      </div>

                      <div className="blog-content lead mb-4">
                        <p className="fst-italic">{allBlog?.description}</p>
                        {allBlog?.blog && typeof allBlog.blog === "string" ? (
                          parse(allBlog.blog)
                        ) : (
                          <p>Invalid or missing blog content.</p>
                        )}
                      </div>

                      <div className="d-flex flex-wrap align-items-center justify-content-between border-top pt-4">
                        <div className="d-flex align-items-center">
                          <div className="like-button me-4">
                            <label
                              className="d-flex align-items-center mb-0"
                              style={{ cursor: "pointer" }}
                            >
                              <input
                                type="checkbox"
                                className="d-none"
                                checked={liked}
                                onChange={handleLikeUnlike}
                                // disabled={!authenticate}
                              />
                              <svg
                                className={`me-2 ${
                                  liked ? "text-danger" : "text-primary"
                                }`}
                                width="24"
                                height="24"
                                viewBox="0 0 512 512"
                                style={{ fill: "currentColor" }}
                              >
                                <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                              </svg>
                              <span className="fw-bold ms-2">{likeCount}</span>
                            </label>
                          </div>
                          <div className="d-flex align-items-center text-muted">
                            <i className="fa-solid fa-eye me-2"></i>
                            <span>{viewCount} Views</span>
                          </div>
                        </div>
                        <div className="share-buttons mt-3 mt-md-0">
                          <FacebookShareButton
                            url={window.location.href}
                            quote={allBlog?.title}
                            className="btn btn-outline-primary btn-sm me-2"
                          >
                            <i className="fa fa-facebook me-1"></i> Facebook
                          </FacebookShareButton>
                          <WhatsappShareButton
                            url={window.location.href}
                            title={allBlog?.title}
                            className="btn btn-outline-primary btn-sm me-2"
                          >
                            <i className="fa fa-whatsapp me-1"></i> Whatsapp
                          </WhatsappShareButton>
                        </div>
                      </div>
                    </div>
                  </article>

                  {/* COMMENTS */}
                  {authenticate && (
                    <section className="mt-5">
                      <h2 className="h4 mb-4">Comments</h2>
                      <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4">
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

                          {comments.length > 0 ? (
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
                                          to={`/poets-profile/${comment?.userId?._id}`}
                                          className="text-decoration-none text-capitalize"
                                        >
                                          {comment?.userId?.name || "Anonymous"}
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
                                          ? "Hide"
                                          : "Reply"}
                                      </a>
                                    </div>
                                    <p className="mb-2">{comment.text}</p>

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
                                          disabled={!newReply.trim()}
                                        >
                                          Send
                                        </button>
                                      </div>
                                    )}

                                    {Array.isArray(comment.replies) &&
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
                                                    to={`/poets-profile/${reply?.userId?._id}`}
                                                    className="text-decoration-none text-capitalize"
                                                  >
                                                    {reply?.userId?.name ||
                                                      "Anonymous"}
                                                  </Link>
                                                  <small className="text-muted ms-2">
                                                    {isValidDate(
                                                      reply.created_at
                                                    )
                                                      ? format(
                                                          new Date(
                                                            reply.created_at
                                                          ),
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
                  )}
                </div>
              </div>
              {/* sidebar */}
              <div className="col-lg-4 m-15px-tb blog-aside">
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
                              allBlog?.userId?.slug ||
                                allBlog?.userId?._id ||
                                "default"
                            )}`}
                          >
                            {allBlog?.userId?.name || "Admin"}
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                {/* latest posts */}
                <div className="widget widget-latest-post">
                  <div className="widget-title">
                    <h3>Latest Post</h3>
                  </div>
                  <div className="widget-body">
                    {alllatest.map((data) => (
                      <div className="latest-post-aside media" key={data._id}>
                        <div className="lpa-left media-body">
                          <div className="lpa-title">
                            <h5>
                              <Link to={`/single-blog/${data._id}`}>
                                {data.description}
                              </Link>
                            </h5>
                          </div>
                          <div className="lpa-meta">
                            <Link
                              className="name"
                              to={`/poets-profile/${
                                data?.userId?._id || "default"
                              }`}
                            >
                              {data?.userId?.name || "Admin"}
                            </Link>
                          </div>
                        </div>
                        <div className="lpa-right">
                          <Link to={`/single-blog/${data._id}`}>
                            <img
                              src={
                                BASE_URL_IMG +
                                (data?.Image || "/default_image.jpg")
                              }
                              alt="Blog"
                              onError={(e) => {
                                e.target.src = "/default_image.jpg";
                              }}
                            />
                          </Link>
                        </div>
                      </div>
                    ))}
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
