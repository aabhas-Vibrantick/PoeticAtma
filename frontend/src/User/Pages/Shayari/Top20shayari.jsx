import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices'
import { toast, ToastContainer } from 'react-toastify'
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
export default function Top20shayari() {
  const [allPopular, setAllPopular] = useState([]);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    apiServices.getPopularShayari()
      .then((data) => {
        if (data.data.success) {
          const filteredShayaris = data.data.data.filter((shayari) => shayari.status === true);
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

    apiServices.latestShayari()
      .then((data) => {
        if (data.data.success) {
          const filteredShayaris = data.data.data.filter((shayari) => shayari.status === true);
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
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
     //search handle
     const handleSearchQueryChange = (e) => {
      setSearchQuery(e.target.value);
    };
    const performSearch = (query) => {
      const filteredResults = allPopular.filter((proses) => {
        const fullName = proses.title + proses.tags + proses.shayari +proses.userId?.name;
        return fullName.toLowerCase().includes(query.toLowerCase());
      });
  
      setSearchResults(filteredResults);
    };
  
    const handleSearch = (e) => {
      e.preventDefault();
      if (searchQuery === '') {
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
                <div className="container mb80">
                  <div className="page-timeline">
                    {searchResults.length > 0
                      ? searchResults.map((data, index) => (
                          <div className="vtimeline-point">
                            <div className="vtimeline-icon">
                              <i className="fa fa-image"></i>
                            </div>
                            <div className="vtimeline-block">
                              <div className="vtimeline-content">
                                <div className="vtimeline-imgcontent">
                                  <Link
                                    to={"/single-shayari/" + `${data?._id}`}
                                  >
                                    <img
                                      src={BASE_URL_IMG + data?.Image}
                                      alt=""
                                      className="img-fluid mb20"
                                    />
                                  </Link>
                                </div>

                                <a href="#">
                                  <h3>{data?.title}</h3>
                                </a>
                                <ul className="post-meta list-inline">
                                  <li className="list-inline-item">
                                    <i className="fa fa-user-circle-o"></i>
                                    <Link
                                      to={
                                        "/poets-profile/" +
                                        `${data?.userId?._id}`
                                      }
                                      className="text-capitalize mx-1"
                                    >
                                      {data?.userId?.name || "Admin"}
                                    </Link>
                                  </li>

                                  {/* <li className="list-inline-item">
                            <i className="fa fa-calendar-o"></i> <a href="#"> {format(new Date(data.created_at), 'MMMM d, yyyy')}</a>
                        </li> */}
                                  <li className="list-inline-item">
                                    <i className="fa fa-tags"></i>{" "}
                                    <a href="#" className="fw-bold">
                                      {data?.tags}{" "}
                                    </a>
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="fa-solid fa-share-nodes"></i>{" "}
                                    <Link>Share Now</Link>
                                  </li>
                                </ul>
                                <p>
                                  <Link
                                    to={"/single-shayari/" + `${data?._id}`}
                                  >
                                    {/* <i className="fa fa-quote-left fa-fw pull-left"></i> */}
                                    {authenticate ? (
                                      <>
                                        <p>{parse(data.shayari)}</p>
                                        {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <div className="shayaricontent-container">
                                          <p className="shayaricontent ">
                                            {parse(data.shayari)}
                                          </p>
                                        </div>
                                        {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                        <br />
                                        <button
                                          className="readbutton"
                                          onClick={handleReadMoreClick}
                                        >
                                          View More
                                        </button>
                                      </>
                                    )}
                                  </Link>
                                </p>
                              </div>
                              <div className="vtimeline-content-btn">
                                <a
                                  className="sendbutton"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={`https://wa.me/?text=${encodeURIComponent(
                                    `${data?.title}\n\n${data?.sher.replace(
                                      /<[^>]+>/g,
                                      ""
                                    )}\n\nRead more: https://poeticatma.com/single-shayari/${
                                      data?._id
                                    }`
                                  )}`}
                                >
                                  Get Shayari on WhatsApp
                                </a>
                              </div>
                            </div>
                          </div>
                        ))
                      : allPopular.map((data, index) => (
                          <div className="vtimeline-point">
                            <div className="vtimeline-icon">
                              <i className="fa fa-image"></i>
                            </div>
                            <div className="vtimeline-block">
                              <div className="vtimeline-content">
                                <div className="vtimeline-imgcontent">
                                  <Link
                                    to={"/single-shayari/" + `${data?._id}`}
                                  >
                                    <img
                                      src={BASE_URL_IMG + data?.Image}
                                      alt=""
                                      className="img-fluid mb20"
                                    />
                                  </Link>
                                </div>

                                <a href="#">
                                  <h3>{data?.title}</h3>
                                </a>
                                <ul className="post-meta list-inline">
                                  <li className="list-inline-item">
                                    <i className="fa fa-user-circle-o"></i>
                                    <Link
                                      to={
                                        "/poets-profile/" +
                                        `${data?.userId?._id}`
                                      }
                                      className="text-capitalize mx-1"
                                    >
                                      {data?.userId?.name || "Admin"}
                                    </Link>
                                  </li>

                                  {/* <li className="list-inline-item">
                                <i className="fa fa-calendar-o"></i> <a href="#"> {format(new Date(data.created_at), 'MMMM d, yyyy')}</a>
                            </li> */}
                                  <li className="list-inline-item">
                                    <i className="fa fa-tags"></i>{" "}
                                    <a href="#" className="fw-bold">
                                      {data?.tags}{" "}
                                    </a>
                                  </li>
                                  <li className="list-inline-item">
                                    <i className="fa-solid fa-share-nodes"></i>{" "}
                                    <Link>Share Now</Link>
                                  </li>
                                </ul>
                                <p>
                                  <Link
                                    to={"/single-shayari/" + `${data?._id}`}
                                  >
                                    {/* <i className="fa fa-quote-left fa-fw pull-left"></i> */}
                                    {authenticate ? (
                                      <>
                                        <p>{parse(data.shayari)}</p>
                                        {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                      </>
                                    ) : (
                                      <>
                                        {" "}
                                        <div className="shayaricontent-container">
                                          <p className="shayaricontent ">
                                            {parse(data.shayari)}
                                          </p>
                                        </div>
                                        {/* <i className="fa fa-quote-right fa-fw pull-right"></i> */}
                                        <br />
                                        <button
                                          className="readbutton"
                                          onClick={handleReadMoreClick}
                                        >
                                          View More
                                        </button>
                                      </>
                                    )}
                                  </Link>
                                </p>
                              </div>
                              <div className="vtimeline-content-btn">
                                <a
                                  className="sendbutton"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={`https://wa.me/?text=${encodeURIComponent(
                                    `${data?.title}\n\n${data?.sher.replace(
                                      /<[^>]+>/g,
                                      ""
                                    )}\n\nRead more: https://poeticatma.com/single-shayari/${
                                      data?._id
                                    }`
                                  )}`}
                                >
                                  Get Shayari on WhatsApp
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}

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
                        <Link to="/english-shayari" >
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
                        <Link to="/shayari-Image" >
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