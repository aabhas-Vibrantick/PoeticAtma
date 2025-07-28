import { useState, useEffect } from "react"
import apiservices from "../ApiServices/ApiServices"
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [subject, setSubject] = useState()
  const [contact, setContact] = useState()
  const [message, setMessage] = useState()

  const handelForm = (e) => {
    e.preventDefault()

    let data = {
      name: name,
      email: email,
      subject: subject,
      message: message,
      contact: contact,
    }

    apiservices.contact(data).then(
      (x) => {
        if (x.data.success == true) {
          toast.success("Message Sent")
        }
        else {
          toast.error("Error try again ")
        }
      }
    ).catch("Message in msg sending")
  }

  return (
    <>
      {/* <section className="container-fluid bg-warning bread">
        <div className=" py-5 ">
          <div className=" pt-lg-5 pt-3 p-lg-4 pb-3">
            <h2 className=" fs-1 mt-5 pt-lg-5 pt-sm-3">Contact Us</h2>
            <p className="fs-5 ">
              We'd love to hear from you! Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>
        </div>
      </section> */}

     <section id="contact" className="contact mb-5 mt-1">
  <div className="container-fluid px-0">
    <div className="row g-0">
      {/* Left Image Section */}
      <div className="col-lg-6 d-none d-lg-block">
        <div
          style={{
            backgroundImage: `url('/contact.png')`, // <-- Replace with your image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            minHeight: "100%",
          }}
          className="h-100"
        ></div>
      </div>

      {/* Right Form + Info Section */}
      <div className="col-lg-6 p-5 bg-light">
        <h2 className="mb-4 text-center fw-bold text-primary">Contact Us</h2>

        {/* Info Boxes */}
        <div className="row g-4 mb-4">
          <div className="col-md-6 d-flex align-items-start">
            <i className="fa-solid fa-location-dot fa-xl me-3 text-primary mt-1"></i>
            <div>
              <h5 className="fw-bold">Location:</h5>
              <p className="mb-0">
                Office No 36, Second Floor, D-185, Phase 8B, Industrial Area, Sector 74,<br />
                Sahibzada Ajit Singh Nagar (Mohali), Punjab-160055
              </p>
            </div>
          </div>

          <div className="col-md-6 d-flex align-items-start">
            <i className="fa-regular fa-clock fa-xl me-3 text-primary mt-1"></i>
            <div>
              <h5 className="fw-bold">Open Hours:</h5>
              <p className="mb-0">Mon - Sat: 10:00 AM - 6:30 PM</p>
            </div>
          </div>

          <div className="col-md-6 d-flex align-items-start">
            <i className="fa-solid fa-envelope fa-xl me-3 text-primary mt-1"></i>
            <div>
              <h5 className="fw-bold">Email:</h5>
              <p className="mb-0">poeticatma@gmail.com<br />info@poeticatma.com</p>
            </div>
          </div>

          <div className="col-md-6 d-flex align-items-start">
            <i className="fa-solid fa-phone-volume fa-xl me-3 text-primary mt-1"></i>
            <div>
              <h5 className="fw-bold">Call:</h5>
              <p className="mb-0">+91 76579 99786<br />+91 86995 24005</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="email-form" onSubmit={handelForm}>
          <div className="row g-3">
            <div className="col-md-6">
              <input type="text" name="name" className="form-control" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <input type="email" name="email" className="form-control" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="form-group mt-3">
            <input type="text" className="form-control" name="subject" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div className="form-group mt-3">
            <input type="number" className="form-control" name="number" placeholder="Number" value={contact} onChange={(e) => setContact(e.target.value)} required />
          </div>
          <div className="form-group mt-3">
            <textarea className="form-control" name="message" rows="5" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary btn-lg px-5 rounded-pill">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  {/* Optional: Google Map Embed Below */}
  <div className="map">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.2215007285563!2d75.59786437550889!3d31.32525537430389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5b1d100ae15b%3A0x9992dadc580b19e8!2sVibrantick%20Infotech%20Solutions!5e0!3m2!1sen!2sin!4v1705407543538!5m2!1sen!2sin"
      style={{ border: 0, width: "100%", height: "350px", marginTop: '50px' }}
      allowFullScreen
      loading="lazy"
    ></iframe>
  </div>
</section>


      <ToastContainer />
    </>
  )
}
