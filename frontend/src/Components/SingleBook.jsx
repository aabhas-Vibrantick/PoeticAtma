import { Link, useParams } from "react-router-dom"
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

export default function SingleBook() {
  const param = useParams()

  const id = param._id
  const [book, setBook] = useState([])
  const [loading, setLoading] = useState(true);
  const authenticate = sessionStorage.getItem('authenticate')

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
    }, 3500);

    let data = {
      _id: id
    }

    apiServices.getsingleBook(data).then(data => {
      if (data.data.success) {
        // const filteredShayas = data.data.data.filter((book) => book.status === true);
        // setAllBook(filteredBooks);
        setBook(data.data.data);
      } else {
        toast.error(data.data.message);
      }
    }).catch(err => {
      // // console.log(err);
      toast.error("Something went wrong");
    });
  }, []);

  return (
    <>
      <ScaleLoader loading={loading} cssOverride={override} size={70} />
      <div className={loading ? "disable-full-screen" : ""}>
        {/* <!-- course Details Section Begin --> */}
        <section className="">
          <div className="container mt-5 ">
            <div className="row article">
              <div className="col-lg-6 col-md-6 book-container article">
                <div className="">
                  <div className="">
                    <img className="img-fluid"
                      src={BASE_URL_IMG + book?.Image} alt="book image" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 text-start">
                <div className="">
                  <h3 className="fs-1 fw-bold text-warning text-start pt-3">{book?.title}
                  </h3>
                  <p className="nametext">Author:{book?.author}</p>
                  <div className="">
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star-half-o text-warning"></i>
                    <span className=" fw-bolder">(18 reviews)</span>
                  </div>
                  <div className="fw-bolder">&#8377;{book?.Book_Price}</div>
                  <div className="bookcontent-container">
                    <p className="bookcontent fs-6">
                      {book?.description}
                    </p>
                  </div>
                  {authenticate ? (
                    <>
                      <Link to={"/payment-form/" + `${book?._id}`} className="  mt-4 login-button">Book Now</Link>
                    </>
                  ) : (
                    <>
                      <button className="  mt-4 login-button" onClick={handleReadMoreClick}>
                        Book Now
                      </button>
                    </>
                  )}

                  {/* <Link to={"/payment-form/"+`${book?._id}`} className="  mt-4 login-button">Book Now</Link> */}


                  {/* <Link to='/login'><a className="site-btn link-light">Enroll Now</a></Link> */}
                  <div className="text-start pt-3">

                    {/* <li><b>Availability</b> <span className="mx-5">In Stock</span></li>
                                    <li><b>purches</b> <span className="mx-5">500</span></li>
                                    <li><b></b> access<span className="px-5">Life time</span></li> */}
                    <b className="">Share on</b>
                    <div className="mt-3 text-start">
                      <a href="#"><i className="fa fa-facebook mx-2 fs-3"></i></a>
                      <a href="#"><i className="fa fa-twitter mx-2 fs-3"></i></a>
                      <a href="#"><i className="fa fa-instagram mx-2 fs-3"></i></a>

                    </div>


                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section profile">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body pt-3">
                  {/* <!-- Bordered Tabs --> */}
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button type="submit"
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                      >
                        Description<i className="fa-regular fa-address-card mx-1"></i>
                      </button>
                    </li>

                    {/* <li className="nav-item">
                      <button type="button"
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit "
                      >
                        review<i className="fa-solid fa-user-pen mx-1 "></i>
                      </button>
                    </li> */}


                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview"
                    >
                      <div className="course__details__tab__desc">
                        <h6>Book Infomation</h6>
                        {book?.description}
                      </div>
                    </div>
                    {/* <div
                      className="tab-pane fade pt-3 " id="profile-edit">
                      <div className="course__details__tab__desc">
                        <h6>Book Infomation</h6>
                        {book?.description}
                      </div>
                    </div> */}
                  </div>
                  {/* <!-- End Bordered Tabs --> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
