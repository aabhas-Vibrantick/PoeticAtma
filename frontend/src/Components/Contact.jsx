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
      <section className="container-fluid bg-warning bread">
        <div className=" py-5 ">
          <div className=" pt-lg-5 pt-3 p-lg-4 pb-3">
            <h2 className=" fs-1 mt-5 pt-lg-5 pt-sm-3">Contact Us</h2>
            <p className="fs-5 ">
              We'd love to hear from you! Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact mb-5 mt-1">

        <div className="container contact-bg mt-5">
          
          <div className="info-wrap">
            <div className="row">
              <div className="col-lg-3 col-md-6 info">
                <i className="fa-solid fa-location-dot"></i>
                <h4>Location:</h4>
                <p>Jalandhar<br />Punjab India</p>
              </div>
              <div className="col-lg-3 col-md-6 info mt-4 mt-lg-0">
                <i className="fa-regular fa-clock"></i>
                <h4>Open Hours:</h4>
                <p>Monday-Saturday:<br />11:00 AM - 23:00 PM</p>
              </div>
              <div className="col-lg-3 col-md-6 info mt-4 mt-lg-0">
                <i className="fa-solid fa-envelope"></i>
                <h4>Email:</h4>
                <p>poeticatma@gmail.com<br />poetic@gmail.com</p>
              </div>
              <div className="col-lg-3 col-md-6 info mt-4 mt-lg-0">
                <i className="fa-solid fa-phone-volume"></i>
                <h4>Call:</h4>
                <p>+1 5589 55488 51<br />+1 5589 22475 14</p>
              </div>
            </div>
          </div>

          <form className="email-form" onSubmit={handelForm}>
            <div className="row">
              <div className="col-md-6 form-group">
                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" value={name} onChange={(e) => { setName(e.target.value) }} required />
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
              </div>
            </div>
            <div className="form-group mt-3">
              <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" value={subject} onChange={(e) => { setSubject(e.target.value) }} required />
            </div>
            <div className="form-group mt-3">
              <input type="number" className="form-control" name="number" id="number" placeholder="Number" value={contact} onChange={(e) => { setContact(e.target.value) }} required />
            </div>
            <div className="form-group mt-3">
              <textarea className="form-control" name="message" rows="5" placeholder="Message" value={message} onChange={(e) => { setMessage(e.target.value) }} required></textarea>
            </div>
            <div className="my-3">
              <div className="loading">Loading</div>
              <div className="error-message"></div>
              <div className="sent-message">Your message has been sent. Thank you!</div>
            </div>
            <div className="text-center"><button type="submit">Send Message</button></div>
          </form>
        </div>

        <div className="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.2215007285563!2d75.59786437550889!3d31.32525537430389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5b1d100ae15b%3A0x9992dadc580b19e8!2sVibrantick%20Infotech%20Solutions!5e0!3m2!1sen!2sin!4v1705407543538!5m2!1sen!2sin" style={{ border: "0", width: "100% ", height: "350px", marginTop: '50px' }} allowfullscreen></iframe>
        </div>

      </section>

      <ToastContainer />
    </>
  )
}
