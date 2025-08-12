import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from "react";
import { format } from "date-fns";
export default function Top20shayari() {
  const [allPopular, setAllPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const authenticate = sessionStorage.getItem("authenticate");
  const [alllatest, setAlllatest] = useState([]);
  const parse = require("html-react-parser");
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
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    apiServices
      .getPopularShayari()
      .then((data) => {
        if (data.data.success) {
          const filteredShayaris = data.data.data.filter(
            (shayari) => shayari.status === true
          );
          setAllPopular(filteredShayaris);
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
        toast.error("Something went wrong");
      });
  }, [loading]);

  // ========search========
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //search handle
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const performSearch = (query) => {
    const filteredResults = allPopular.filter((proses) => {
      const fullName =
        proses.title + proses.tags + proses.shayari + proses.userId?.name;
      return fullName.toLowerCase().includes(query.toLowerCase());
    });

    setSearchResults(filteredResults);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery === "") {
      // If search input is empty, show all poets
      setSearchResults(allPopular);
    } else {
      performSearch(searchQuery);
    }
  };
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
                  {/* Determine the correct data source first, then map over the result */}
                  {(searchResults.length > 0 ? searchResults : allPopular).map(
                    (data, index) => (
                      <article
                        key={data._id || index}
                        className="card shadow-sm border-0 rounded-3 overflow-hidden mb-4"
                      >
                        {/* Featured Image */}
                        {data.Image && (
                          <div className="position-relative">
                            <Link to={`/single-shayari/${data._id}`}>
                              <img
                                src={BASE_URL_IMG + data.Image}
                                alt={data.title}
                                className="img-fluid w-100"
                                style={{ height: "250px", objectFit: "cover" }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/default_image.jpg";
                                }}
                              />
                            </Link>
                          </div>
                        )}

                        {/* Article Content */}
                        <div className="card-body p-4">
                          {/* Title */}
                          <Link
                            to={`/single-shayari/${data._id}`}
                            className="text-dark text-decoration-none"
                          >
                            <h3 className="fw-bold mb-3">{data.title}</h3>
                          </Link>

                          {/* Meta Info */}
                          <div className="d-flex flex-wrap align-items-center mb-3 text-muted small">
                            <div className="d-flex align-items-center me-4">
                              <i className="fa fa-user-circle-o me-2"></i>
                              <Link
                                to={`/poets-profile/${data?.userId?._id}`}
                                className="text-capitalize text-decoration-none text-muted"
                              >
                                {data?.userId?.name || "Admin"}
                              </Link>
                            </div>
                            <div className="d-flex align-items-center">
                              <i className="fa fa-tags me-2"></i>
                              <span className="fw-bold">{data.tags}</span>
                            </div>
                          </div>

                          {/* Content Snippet */}
                          <p className="card-text">
                            {/* Safely create a preview snippet, checking for 'shayari' or 'sher' */}
                            {data.shayari || data.sher
                              ? `${(data.shayari || data.sher)
                                  .replace(/<[^>]+>/g, "")
                                  .substring(0, 200)}...`
                              : "No content preview available."}
                          </p>

                          {/* Action Buttons */}
                          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                            <Link
                              to={`/single-shayari/${data._id}`}
                              className="btn btn-primary"
                            >
                              View More
                            </Link>
                            <a
                              href={`https://wa.me/?text=${encodeURIComponent(
                                `${data.title}\n\n${(
                                  data.shayari ||
                                  data.sher ||
                                  ""
                                ).replace(
                                  /<[^>]+>/g,
                                  ""
                                )}\n\nRead more: https://poeticatma.com/single-shayari/${
                                  data._id
                                }`
                              )}`}
                              className="btn btn-success"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fab fa-whatsapp me-2"></i>Share on
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </article>
                    )
                  )}

                  {/* Message to display if no items are available */}
                  {searchResults.length === 0 && allPopular.length === 0 && (
                    <div className="text-center p-5 card shadow-sm border-0 rounded-3">
                      <h4>No Items Found</h4>
                      <p className="text-muted">
                        There are no items matching your criteria.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-4 m-15px-tb blog-aside">
                {/* <!-- Author --> */}
                <div className="widget widget-author">
                  <div className="search-1  ">
                    <form onSubmit={handleSearch}>
                      <input
                        type="search"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        required=""
                      />
                      <input type="submit" value="." />
                    </form>
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
                        <Link to="/english-shayari">
                          <i className="fa-solid fa-heart"></i>English
                        </Link>
                        {/* <a href="#">
                          <i className="fa-solid fa-heart"></i>Love
                        </a> */}
                      </li>
                      <li>
                        <Link to="/hindi-shayari">
                          <i className="fa-solid fa-heart"></i>Hindi
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
                      <div className="latest-post-aside media">
                        <div className="lpa-left media-body">
                          <div className="lpa-title">
                            <h5 className="shayaricontent-container2 ">
                              {" "}
                              <Link
                                className="shayaricontent2 "
                                to={"/single-shayari/" + `${data?._id}`}
                              >
                                {data?.shayari}
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
                          <Link to={"/single-shayari/" + `${data?._id}`}>
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
