import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer id="contect" className="text-center text-lg-start foote-bg1 text-muted  bg-secondary">

        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom bg-muted">
          <div className="me-5 d-none d-lg-block footer-info">
            <span>Get connected with us on social networks:</span>
          </div>
          <div className="footer-top-icons">
            <a href="https://www.facebook.com/poeticatma" className="me-4" target="_blank">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.youtube.com/@poeticatma" className="me-4" target="_blank">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="https://www.instagram.com/poeticatma/" className="me-4 link-insta" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/919888323607" target="_blank" className="me-4">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3 ">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 text-start  footer-bottom-link">
                <div>
                  <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fa-solid fa-pen-nib me-3"></i><Link to="/" className="text-light">Poetic Atma</Link>
                  </h6>
                  <p className="text-justify">
                    "Explore the enchanting world of poetry on our website, where words come alive to paint emotions, tell stories, and capture the essence of the human experience. Immerse yourself in the beauty of verses and discover the power of language to ignite your imagination."
                  </p>
                </div>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 text-start footer-bottom-link">
                <h6 className="text-uppercase fw-bold mb-4">
                  Quick Links
                </h6>
                <p>
                  <Link to="/" className="text-reset">Home</Link>
                </p>
                <p>
                  <Link to="/poets" className="text-reset">Poets</Link>
                </p>
                <p>
                  <Link to="/shayari" className="text-reset">Shayari</Link>
                </p>
                <p>
                  <Link to="/shers" className="text-reset">Sher</Link>
                </p>
                <p>
                  <Link to="/prose" className="text-reset">Prose</Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 text-start footer-bottom-link">
                <h6 className="text-uppercase fw-bold mb-4">
                  Important Links
                </h6>
                <p>
                  <Link to="/contact" className="text-reset">Contact Us</Link>
                </p>
                <p>
                  <Link to="/helpdesk" className="text-reset">Help Desk</Link>
                </p>
                <p>
                  <Link to="/faqs" className="text-reset">FAQs</Link>
                </p>
                <p>
                  <Link to="/privacy-policy" className="text-reset">Privacy Policy</Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-start footer-top-icons footer-bottom-link">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p><i className="fas fa-home me-3 "></i> Jalandhar-144009, punjab</p>
                <p>
                  <i className="fas fa-envelope me-3 "></i>
                  <a href="mailto:poeticatma@gmail.com" style={{ color: "inherit", fontSize: "inherit" }}>
                    poeticatma@gmail.com
                  </a>
                </p>
                <p>
                  <i className="fas fa-phone me-3 "></i>
                  <a href="tel:+918699524005" style={{ color: "inherit", fontSize: "inherit" }}>
                    +91 8699524005
                  </a>
                </p>
              </div>

            </div>
          </div>
        </section>

        <div className="text-center footer-text p-4 foote-bg2" >
          © Copyright {new Date().getFullYear()} &nbsp;
          <a className="footer-text fw-bold" href="/">
            Poetic Atma
            <span className="px-2 fw-normal">
              All Rights Reserved
            </span>
          </a>
        </div>

      </footer>
    </>
  )
}
