
import { Link } from 'react-router-dom';
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices'
import { toast, ToastContainer } from 'react-toastify'
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect, useState } from 'react';
export default function ProseImage(){
    const [allProseImg, setAllProseImg] = useState([]);
    const [loading, setLoading] = useState();
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
      }, 1500);
      apiServices.getallProseImage()
        .then((data) => {
          if (data.data.success) {
            setAllProseImg(data.data.data);
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

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (data) => {
      setSelectedImage(data);
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedImage(null);
    };

    return(
        <>
        {/* <!-- ======= Hero Section ======= --> */}
        <ScaleLoader loading={loading} cssOverride={override} size={70} />
      <div className={loading ? "disable-full-screen" : ""}>
      <section id="hero" className="photohero d-flex flex-column justify-content-center align-items-center" data-aos="fade" data-aos-delay="1500">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <h2> <span>Prose Image</span></h2>
          <p>Blanditiis praesentium aliquam illum tempore incidunt debitis dolorem magni est deserunt sed qui libero. Qui voluptas amet.</p>
        </div>
      </div>
    </div>
  </section>
  {/* <!-- End Hero Section --> */}
 
  {/* <!-- End Hero Section --> */}
  <main id="main" data-aos="fade" data-aos-delay="1500">
    {/* <!-- ======= Gallery Section ======= --> */}
     <section id="gallery" className="gallery">
              <div className="container-fluid">
                <div className="row gy-4 justify-content-center">
                  {/* <!-- End Gallery Item --> */}
                  {allProseImg.map((data, index) => (
                    <div className="col-xl-3 col-lg-4 col-md-6">
                      {/* <h4>{data?.userId?.name}</h4> */}
                      <div
                        className="gallery-item h-100"
                        onClick={() => handleImageClick(data)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={BASE_URL_IMG + data?.Image}
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                  ))}

          
          {/* <!-- End Gallery Item --> */}
        
         

        </div>

      </div>
    </section>
    {showModal && selectedImage && (
              <div className="modal-backdrop" onClick={handleCloseModal}>
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={BASE_URL_IMG + selectedImage.Image}
                    alt="Popup"
                    style={{
                      width: "100%",
                      maxHeight: "500px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                  <button
                    className="btn btn-dark mt-3"
                    onClick={handleCloseModal}
                    style={{ width: "100%", borderRadius: "6px" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
    </main>
    {/* <!-- End Gallery Section --> */}
    </div>

<ToastContainer/>
        </>
    )
}