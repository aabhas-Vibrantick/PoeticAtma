import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices'
import { toast, ToastContainer } from 'react-toastify'
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
export default function Hindisher() {
  const [allHindi, setAllHindi] = useState([]);
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


    apiServices.getsherByHindi()
      .then(response => {
        if (response.data.success) {
          const filteredShers = response.data.allhindi.filter((sher) => sher.status === true);
          setAllHindi(filteredShers);
          // setAllHindi(response.data.allhindi);
          // // console.log("hindi response",response)
        } else {
          // Handle error
          // console.error(response.data.message);
        }
      })
      .catch(error => {
        // console.error('Error:', error);
      });

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
  }, [loading]);


     // ========search========
     const [searchQuery, setSearchQuery] = useState('');
     const [searchResults, setSearchResults] = useState([]);
      //search handle
      const handleSearchQueryChange = (e) => {
       setSearchQuery(e.target.value);
     };
     const performSearch = (query) => {
       const filteredResults = allHindi.filter((proses) => {
         const fullName = proses.title + proses.tags + proses.sher +proses.userId.name;
         return fullName.toLowerCase().includes(query.toLowerCase());
       });
   
       setSearchResults(filteredResults);
     };
   
     const handleSearch = (e) => {
       e.preventDefault();
       if (searchQuery === '') {
         // If search input is empty, show all poets
         setSearchResults(allHindi);
       } else {
         performSearch(searchQuery);
       }
     };
  return (
  <>
    <style>{`.card-body {
  background-color: #fff;
  border-radius: 0 0 0.75rem 0.75rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4;
}

.shayaricontent,
.shayaritext {
  font-size: 1rem;
  color: #333;
  line-height: 1.8;
  font-weight: 600;
}

.card:hover {
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.poet-img-wrapper {
  width: 120px; /* or any size you need */
  height: 120px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff; /* Optional for contrast */
}

.poet-avatar {
  width: 100%;
  height: auto;
  object-fit: contain; /* instead of cover */
}

`}</style>
    <ScaleLoader loading={loading} cssOverride={override} size={70} />
    <div className={loading ? "disable-full-screen" : ""}>
      <div className="blog-blogsingle bg-light min-h-screen py-5">
        <div className="container">
          {/* Blog Ads */}
          <section id="blogads"></section>

          <div className="row gx-5">
            {/* Left Column */}
            <div className="col-lg-8">
              <div className="page-timeline">
                {(searchResults.length > 0 ? searchResults : allHindi).map((data, index) => (
                  <div className="card border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
                    <Link to={`/single-sher/${data?._id}`}>
                      <img
                        src={BASE_URL_IMG + data?.Image}
                        alt=""
                        className="img-fluid w-100 object-fit-cover"
                        style={{ height: "320px" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default_image.jpg";
                        }}
                      />
                    </Link>
                    <div className="card-body bg-white p-4 d-flex flex-column justify-content-between h-100">
                      <div>
                        <h5 className="card-title mb-2 text-primary fw-bold">
                          <Link to={`/single-sher/${data?._id}`} className="text-decoration-none text-primary">
                            {data?.title}
                          </Link>
                        </h5>
                        <ul className="list-inline small text-muted mb-3">
                          <li className="list-inline-item me-3">
                            <i className="fa fa-user-circle-o me-1"></i>
                            <Link to={`/poets-profile/${data?.userId?._id}`} className="text-dark fw-semibold">
                              {data?.userId?.name || "Admin"}
                            </Link>
                          </li>
                          <li className="list-inline-item">
                            <i className="fa fa-tags me-1"></i>
                            <span className="fw-bold">{data?.tags}</span>
                          </li>
                        </ul>

                        <div className="text-secondary small" style={{ lineHeight: "1.7" }}>
                          {authenticate ? (
                            <p className="shayaritext mb-0">{parse(data?.sher)}</p>
                          ) : (
                            <>
                              <div className="shayaricontent-container">
                                <p className="shayaricontent mb-0">{parse(data?.sher)}</p>
                              </div>
                              <button
                                className="btn btn-outline-primary btn-sm mt-3"
                                onClick={handleReadMoreClick}
                              >
                                View More
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <a
                          className="btn btn-success btn-sm w-100"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://wa.me/?text=${encodeURIComponent(`${data?.title}\n\n${data?.sher.replace(/<[^>]+>/g, '')}\n\nRead more: https://poeticatma.com/single-sher/${data?._id}`)}`}
                        >
                          Get Sher on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="position-sticky top-0">
                {/* Search */}
                <div className="mb-4">
                  <form onSubmit={handleSearch} className="input-group">
                    <input
                      type="search"
                      placeholder="Search"
                      className="form-control"
                      value={searchQuery}
                      onChange={handleSearchQueryChange}
                      required
                    />
                    <button className="btn btn-primary" type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                </div>

                {/* Category */}
                <div className="card mb-4 shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Category</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <Link to="/english-sher" className="text-decoration-none">
                        <i className="fa-solid fa-heart me-2 text-danger"></i> English
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/top20-sher" className="text-decoration-none">
                        <i className="fa-solid fa-heart me-2 text-danger"></i> Top-20 Sher
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/sher-Image" className="text-decoration-none">
                        <i className="fa-solid fa-heart me-2 text-danger"></i> Sher Images
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Latest Post */}
                <div className="card shadow-sm">
                  <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">Latest Post</h5>
                  </div>
                  <div className="card-body">
                    {alllatest.map((data, index) => (
                      <div className="d-flex mb-3" key={index}>
                        <div className="flex-shrink-0 me-3">
                          <Link to={`/single-sher/${data?._id}`}>
                            <img
                              src={BASE_URL_IMG + data?.Image}
                              alt=""
                              className="img-thumbnail"
                              style={{ width: "60px", height: "60px", objectFit: "cover" }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/default_image.jpg";
                              }}
                            />
                          </Link>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">
                            <Link to={`/single-sher/${data?._id}`} className="text-dark text-decoration-none">
                              {data?.sher?.length > 60 ? data.sher.substring(0, 60) + "..." : data.sher}
                            </Link>
                          </h6>
                          <small className="text-muted">
                            <Link to={`/poets-profile/${data?.userId?._id}`} className="text-muted">
                              {data?.userId?.name || "Admin"}
                            </Link>
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* End Sidebar */}
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
  </>
);

}