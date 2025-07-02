import { Link, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
export default function SingleSher() {
  const { _id } = useParams();
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
  const authenticate = sessionStorage.getItem('authenticate')
  const [alllatest, setAlllatest] = useState([]);
  const parse = require("html-react-parser");
  const handleReadMoreClick = () => {

    if (!authenticate) {
      window.location.href = '/login';
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
      const response = await apiServices.sherincrementPageView({ postId: _id });
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
        const response = await apiServices.getsinglesher({ _id });
        if (response.data.success) {
          setAllSher(response.data.data);
        } else {
          // console.error(response.data.message);
        }
      } catch (error) {
        // console.error("Error fetching sher:", error);
      }

     

      apiServices.latestSher()
        .then((data) => {
          if (data.data.success) {
            const filteredShers = data.data.data.filter((sher) => sher.status === true);
            setAlllatest(filteredShers);
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

      try {
        const commentResponse = await apiServices.getAllsherComments({
          sherId: _id,
        });
        if (commentResponse.data.success) {
          setComments(commentResponse.data.data);

          // Fetch replies for each comment
          const promises = commentResponse.data.data.map(async (comment) => {
            const replyResponse = await apiServices.getAllsherReplies({
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
        const response = await apiServices.shergetPageViewCount({ postId: _id });
        setViewCount(response.data.count);
        if (response.data.success) {

        } else {
          // console.error(response.data.message);
        }
      } catch (error) {
        // console.error("Error fetching view count:", error);
      }

      apiServices
        .getLikeCountForSher({ sherId: _id })
        .then(response => {
          const data = response.data.data;
          setLikeCount(data.likeCount);
        })
        .catch(error => {
          // console.error('Error fetching like count:', error);
        });


      setLoading(false);
    };

    // fetchReplies();
    fetchData();
    incrementViewCount();
  }, [_id]);

  const sherId = {
    sherId: _id,
  };

  const handleLikeUnlike = () => {
    if (liked) {
      apiServices
        .SherUnLike(sherId)
        .then((response) => {
          // // console.log("UnLike response>>>>",response)
          setLiked(false);

        })
        .catch((error) => {
          // console.error("Error unliking post:", error);
        });
    } else {
      apiServices
        .SherLike(sherId)
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
    // // console.log(_id);
    try {
      // Send a request to your API to create a reply
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
      <ScaleLoader loading={loading} cssOverride={override} size={70} />
      <div className={loading ? "disable-full-screen" : ""}>
        <div className="blog-blogsingle bloggray-bg">
          <div className="container">
            {/* <!-- Blog Ads --> */}
            <section id="blogads">

            </section>
            {/* ---------------------left sidebar start---------------------------*/}
            <div className="row align-items-start">
              <div className="col-lg-8 m-15px-tb">
                <div className="container mb80">
                  <div className="page-timeline">

                    <div className="vtimeline-point">
                      <div className="vtimeline-icon">
                        <i className="fa fa-image"></i>
                      </div>
                      <div className="vtimeline-block">
                        <div className="vtimeline-content">
                          <div className="vtimeline-imgcontent">
                            <img src={BASE_URL_IMG + sher?.Image} alt="" className="img-fluid mb20" />
                          </div>
                          <h6 className="catlitile">
                            <a href="#"><span className="px-2">Category:</span>{sher?.Category_id?.Category_name} </a>
                          </h6>
                          <a href="#"><h3>{sher?.title}</h3></a>
                          <ul className="post-meta list-inline">
                           
                                <li className="list-inline-item">
                                  <i className="fa fa-user-circle-o"></i> <Link to={"/poets-profile/" + `${sher?.userId?._id}`} className="text-capitalize mx-1">{sher?.userId?.name || "Admin"}</Link>
                                </li>
                              

                            {/* <li className="list-inline-item">
                            <i className="fa fa-calendar-o"></i> <a href="#">
                            {isValidDate(sher?.created_at)
    ? format(new Date(sher?.created_at), 'MMMM d, yyyy')
    : 'Invalid Date'}
                            </a>
                        </li> */}
                            <li className="list-inline-item">

                              <span >
                                <i className="fa fa-tags"></i>{" "}
                                <Link className="fw-bold">{sher.tags}</Link>

                              </span>

                            </li>
                          </ul>
                          <p>

                            {/* <i className="fa fa-quote-left fa-fw pull-left"></i> */}

                            {authenticate ? (
                              <>
                                {/* <p> {sher?.sher}</p> */}
                                <p > {sher?.sher && typeof sher.sher === 'string' ? (
                                  <>
                                    {parse(sher.sher)}
                                  </>
                                ) : (
                                  <p>Invalid or missing blog content.</p>
                                )}</p>
                                {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                              </>
                            ) : (
                              <>      <div className="shayaricontent-container">
                                {/* <p className="shayaricontent ">
        {sher?.sher}
        </p> */}
                                <p className="shayaricontent "> {sher?.sher && typeof sher.sher === 'string' ? (
                                  <>
                                    {parse(sher.sher)}
                                  </>
                                ) : (
                                  <p>Invalid or missing blog content.</p>
                                )}</p>
                              </div>
                                {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                <br />
                                <button className="readbutton" onClick={handleReadMoreClick}>
                                  View More
                                </button>
                              </>
                            )}


                          </p>
                          <div className="articlefooter">
                            <ul className="articlestats">
                              <div className="like-button">
                                {authenticate ? (
                                  <>
                                    <li> <a className="m-r-15 text-inverse-lighter mx-2 ">
                                      <label className="">
                                        <input
                                          type="checkbox"
                                          className="likeinput"
                                          onClick={handleLikeUnlike}
                                        />
                                        <svg
                                          className="likesvg "
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 512 512"
                                        >
                                          <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                        </svg>
                                        <span className={`like-count px-2 ${liked ? "liked" : ""}`}>
                                          {likeCount !== null ? likeCount : 'Loading...'}
                                        </span>
                                      </label>
                                    </a>
                                    </li>
                                  </>
                                ) : (
                                  <>
                                    <li> <a className="m-r-15 text-inverse-lighter mx-2 ">
                                      <label className="">
                                        <input
                                          type="checkbox"
                                          className="likeinput"
                                          onClick={handleReadMoreClick}
                                        />
                                        <svg
                                          className="likesvg "
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 512 512"
                                        >
                                          <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                                        </svg>
                                        <span className={`like-count px-2 ${liked ? "liked" : ""}`}>
                                          {likeCount !== null ? likeCount : 'Loading...'}
                                        </span>
                                      </label>
                                    </a>
                                    </li>

                                  </>
                                )}
                                <a className="m-r-15 text-inverse-lighter px-4">
                                  <i className="fa fa-comments fa-fw fa-lg m-r-3 mx-2"></i>
                                  Comment
                                </a>

                                <a className="m-r-15 text-inverse-lighter ">
                                  <i className="fa-solid fa-eye mx-2"></i>
                                  {viewCount} Views
                                </a>
                                <a className="m-r-15 text-inverse-lighter px-4">
                                  <i className="fa-solid fa-share-nodes mx-2"></i>
                                  <span className=" text-muted"> Share</span>
                                </a>
                              </div>

                            </ul>
                          </div>
                        </div>

                      </div>

                    </div>
                    {/* <div className="vtimeline-point">
            <div className="vtimeline-icon">
                <i className="fa fa-image"></i>
            </div>
            <div className="vtimeline-block">
                <span className="vtimeline-date">June 25, 2017</span><div className="vtimeline-content">
                     <div className="embed-responsive embed-responsive-21by9 mb20">
                   <iframe src="https://www.youtube.com/embed/htPYk6QxacQ?ecver=2" style={{position:"absolute",width:"100%",height:"100%",left:"0"}} width="640" height="360" frameborder="0" allowfullscreen=""></iframe>
                </div>
                    <a href="#"><h3>Standard post title</h3></a>
                    <ul className="post-meta list-inline">
                        <li className="list-inline-item">
                            <i className="fa fa-user-circle-o"></i> <a href="#">John Doe</a>
                        </li>
                        <li className="list-inline-item">
                            <i className="fa fa-calendar-o"></i> <a href="#">29 June 2017</a>
                        </li>
                        <li className="list-inline-item">
                            <i className="fa fa-tags"></i> <a href="#">Bootstrap4</a>
                        </li>
                    </ul>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in iaculis ex. Etiam volutpat laoreet urna. Morbi ut tortor nec nulla commodo malesuada sit amet vel lacus. Fusce eget efficitur libero. Morbi dapibus porta quam laoreet placerat.
                    </p><br/>
                    <a href="#" className="btn btn-outline-secondary btn-sm">View More</a>
                </div>
            </div>
        </div> */}

                  </div>
                  {authenticate ? (
                    <>
                      <section className="">
                        <div className="container my-5 py-5">
                          <h2 className="comments-title text-start"> <i className="fa fa-comments fa-fw fa-lg m-r-3 mx-3"></i>Comments</h2>


                          <div className="card">
                            <div className="card-body p-4">
                              <div className=" my-3 d-flex flex-row gap-2">
                                <textarea
                                  className=" form-control col-9"
                                  placeholder="Write a comment..."
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button className="replybutton "
                                  onClick={createComment}>
                                  <div className="svg-wrapper-1">
                                    <div className="svg-wrapper">
                                      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                      </svg>
                                    </div>
                                  </div>
                                  <span>Send</span>
                                </button>

                              </div>
                              {/* ==================start comment main map================ */}
                              {comments && comments.length > 0 ? (
                                comments.map((comment) => (

                                  <div className="row mt-5" key={comment._id}>
                                    <div className="col">
                                      {/* ==================start comment content================ */}
                                      <div className="d-flex flex-start">
                                        <img className="rounded-circle shadow-1-strong me-3"
                                          src={BASE_URL_IMG + comment?.userId?.Image || "/assets/images/avtar.png"} alt="avatar" width="65"
                                          height="65" 
                                          onError={(e) => {
                                            e.target.src = "/assets/images/avtar.png";
                                          }}
                                          />
                                        <div className="flex-grow-1 flex-shrink-1">
                                          <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                              <p className="mb-1 text-capitalize">
                                              <Link to={"/poets-profile/" + `${comment?.userId?._id}`}></Link>  {comment.userId.name} 
                                                <span className="small"> {format(new Date(comment.created_at), 'MMMM d, yyyy')}</span>
                                              </p>
                                              {/* ==================end comment content================ */}
                                              <a href="#!" className={`px-3 ${showReply[comment._id]
                                                  ? "active-reply-button"
                                                  : ""
                                                }`}
                                                onClick={() => {
                                                  toggleReply(comment._id);

                                                }}><i className="fas fa-reply fa-xs"></i><span className="small"> {showReply[comment._id] ? "Hide Reply" : "show Reply"}</span>
                                              </a>
                                              {showReply[comment._id] && (
                                                <div className="d-flex flex-start mt-4">
                                                  <textarea
                                                    className=" repinput  gap-2 "
                                                    placeholder="   Reply..."
                                                    value={newReply}
                                                    onChange={(e) => setNewReply(e.target.value)}
                                                    required
                                                  />
                                                  <button className="replybutton "
                                                    onClick={() => createReply(comment._id)}>
                                                    <div className="svg-wrapper-1">
                                                      <div className="svg-wrapper">
                                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                          <path d="M0 0h24v24H0z" fill="none"></path>
                                                          <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <span>Send</span>
                                                  </button>
                                                </div>)}
                                            </div>
                                            <p className="small mb-0">
                                              {comment.text}
                                            </p>
                                          </div>

                                          {comment.replies &&
                                            comment.replies.length > 0 && (
                                              <div className="" key={`replies-${comment._id}`}>
                                                {comment.replies.map((reply) => (
                                                  <div className="d-flex flex-start mt-4" key={reply._id}>
                                                    <a className="me-3" href="#">
                                                      <img className="rounded-circle shadow-1-strong"
                                                        src={BASE_URL_IMG + reply?.userId?.Image || "/assets/images/avtar.png"} alt="avatar"
                                                        width="65" height="65"
                                                        onError={(e) => {
                                                          e.target.src = "/assets/images/avtar.png";
                                                        }}
                                                        />
                                                    </a>
                                                    <div className="flex-grow-1 flex-shrink-1">
                                                      <div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                          <p className="mb-1 text-capitalize">
                                                          <Link to={"/poets-profile/" + `${reply?.userId?._id}`}></Link>  {reply.userId.name}
                                                            <span className="small">-  {format(new Date(reply.created_at), 'MMMM d, yyyy')}</span>
                                                          </p>
                                                        </div>
                                                        <p className="small mb-0">
                                                          {reply.text}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ))

                                                }
                                              </div>
                                            )}

                                          {/* </div>
             )} */}
                                          {/* ==================end togel for show hide  replies================ */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))

                              ) : (

                                <p>No comments available</p>
                              )}
                              {/* ==================end comment main map================ */}
                            </div>
                          </div>
                        </div>

                      </section>
                    </>
                  ) : (
                    <>
                      <section className="">
                        <div className="container my-5 py-5">
                          <h2 className="comments-title text-start"> <i className="fa fa-comments fa-fw fa-lg m-r-3"></i>Comments</h2>


                          <div className="card">
                            <div className="card-body p-4">
                              <div className=" my-3 d-flex flex-row gap-2">
                                <textarea
                                  className=" form-control col-9"
                                  placeholder="Write a comment..."
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button className="replybutton "
                                  onClick={handleReadMoreClick}>
                                  <div className="svg-wrapper-1">
                                    <div className="svg-wrapper">
                                      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                      </svg>
                                    </div>
                                  </div>
                                  <span>Send</span>
                                </button>

                              </div>
                              {/* ==================start comment main map================ */}
                              {comments && comments.length > 0 ? (
                                comments.map((comment) => (

                                  <div className="row mt-5" key={comment._id}>
                                    <div className="col">
                                      {/* ==================start comment content================ */}
                                      <div className="d-flex flex-start">
                                        <img className="rounded-circle shadow-1-strong me-3"
                                          src={BASE_URL_IMG + comment?.userId?.Image || "/assets/images/avtar.png"} alt="avatar" width="65"
                                          height="65" 
                                          onError={(e) => {
                                            e.target.src = "/assets/images/avtar.png";
                                          }}
                                          />
                                        <div className="flex-grow-1 flex-shrink-1">
                                          <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                              <p className="mb-1 text-capitalize">
                                              <Link to={"/poets-profile/" + `${comment?.userId?._id}`}></Link> {comment.userId.name} 
                                                <span className="small">{format(new Date(comment.created_at), 'MMMM d, yyyy')}</span>
                                              </p>
                                              {/* ==================end comment content================ */}
                                              <a href="#!" className={`px-3 ${showReply[comment._id]
                                                  ? "active-reply-button"
                                                  : ""
                                                }`}
                                                onClick={() => {
                                                  toggleReply(comment._id);

                                                }}><i className="fas fa-reply fa-xs"></i><span className="small"> {showReply[comment._id] ? "Hide Reply" : "show Reply"}</span>
                                              </a>
                                              {showReply[comment._id] && (
                                                <div className="d-flex flex-start mt-4">
                                                  <textarea
                                                    className=" repinput  gap-2 "
                                                    placeholder="Reply to this comment..."
                                                    value={newReply}
                                                    onChange={(e) => setNewReply(e.target.value)}
                                                    required
                                                  />
                                                  <button className="replybutton "
                                                    onClick={handleReadMoreClick}>
                                                    <div className="svg-wrapper-1">
                                                      <div className="svg-wrapper">
                                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                          <path d="M0 0h24v24H0z" fill="none"></path>
                                                          <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <span>Send</span>
                                                  </button>
                                                </div>)}
                                            </div>
                                            <p className="small mb-0">
                                              {comment.text}
                                            </p>
                                          </div>

                                          {comment.replies &&
                                            comment.replies.length > 0 && (
                                              <div className="" key={`replies-${comment._id}`}>
                                                {comment.replies.map((reply) => (
                                                  <div className="d-flex flex-start mt-4" key={reply._id}>
                                                    <a className="me-3" href="#">
                                                      <img className="rounded-circle shadow-1-strong"
                                                        src={BASE_URL_IMG + reply?.userId?.Image || "/assets/images/avtar.png"} alt="avatar"
                                                        width="65" height="65" 
                                                        onError={(e) => {
                                                          e.target.src = "/assets/images/avtar.png";
                                                        }}
                                                        />
                                                    </a>
                                                    <div className="flex-grow-1 flex-shrink-1">
                                                      <div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                          <p className="mb-1 text-capitalize">
                                                          <Link to={"/poets-profile/" + `${reply?.userId?._id}`}> {reply.userId.name}</Link>
                                                            <span className="small">-{format(new Date(reply.created_at), 'MMMM d, yyyy')}</span>
                                                          </p>
                                                        </div>
                                                        <p className="small mb-0">
                                                          {reply.text}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ))

                                                }
                                              </div>
                                            )}

                                          {/* </div>
             )} */}
                                          {/* ==================end togel for show hide  replies================ */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))

                              ) : (

                                <p>No comments available</p>
                              )}
                              {/* ==================end comment main map================ */}
                            </div>
                          </div>
                        </div>

                      </section>

                    </>
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
                      <img src={BASE_URL_IMG + sher?.userId?.Image || "/assets/images/avtar.png"} title="" alt="" 
                        onError={(e) => {
                          e.target.src = "/assets/images/avtar.png";
                        }}
                        />
                      </div>
                      <div className="media-body">
                      <h6 className="text-capitalize">Hello, I'm<br /> <Link className="name" to={"/poets-profile/" + `${sher?.userId?._id}`}>{sher?.userId?.name || "Admin"}</Link></h6>
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
                      <li><a href="#"><i className="fa-solid fa-heart"></i>Love</a></li>
                      <li><a href="#"><i className="fa-solid fa-heart-crack"></i>Sad</a></li>
                      <li><a href="#"><i className="fa-regular fa-face-kiss-wink-heart"></i>Romantic</a></li>
                      <li><a href="#"><i className="fa-brands fa-canadian-maple-leaf"></i>Nature</a></li>
                      <li><a href="#"><i className="fa-solid fa-star"></i>Occasion</a></li>
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
                      <div className="latest-post-aside media">
                        <div className="lpa-left media-body">
                          <div className="lpa-title">
                            <h5 className="shayaricontent-container2 "> <Link className="shayaricontent2 " to={"/single-sher/" + `${data?._id}`}>{data?.sher}</Link></h5>

                          </div>
                          <div className="lpa-meta">
                            {/* <a  href="#">
                              Rachel Roth
                            </a> */}
                            <Link className="name" to={"/poets-profile/" + `${data?.userId?._id}`}>{data?.userId?.name || "Admin"}</Link>
                            {/* <a className="date" href="#">
                            {format(new Date(data.created_at), 'MMMM d, yyyy')}
                            </a> */}
                          </div>
                        </div>
                        <div className="lpa-right">
                          {/* <a href="#"> */}
                          <Link to={"/single-sher/" + `${data?._id}`}><img src={BASE_URL_IMG + data?.Image} alt="" className="" /></Link>
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
