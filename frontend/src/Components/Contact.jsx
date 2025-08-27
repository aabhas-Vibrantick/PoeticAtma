import { useState, useEffect, useRef } from "react";
import apiservices from "../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

// ---------- Security & Validation Helpers ----------

// Remove HTML tags, control chars, and dangerous symbols.
// Keep letters (Unicode), digits, spaces, punctuation we expect.
const stripHtml = (s = "") => s.replace(/<[^>]*>/g, "");
const stripControls = (s = "") => s.replace(/[\u0000-\u001F\u007F]/g, "");
const sanitizeLoose = (s = "") =>
  stripControls(stripHtml(s)).replace(/[<>]/g, "").trim();

// Name: letters, spaces, dots, hyphens, apostrophes (supports many scripts)
const NAME_RE = /^[\p{L} .'-]{2,60}$/u;

// Subject: allow letters, digits, spaces, common punctuation
const SUBJECT_RE = /^[\p{L}\p{N}\s.,!?'"()\-:;_/&]{3,120}$/u;

// 10–15 digits, optional +, spaces, hyphens, parentheses
const PHONE_RE = /^\+?[0-9 ()\-]{10,20}$/;

// RFC5322-lite email
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Hard limits to avoid payload abuse
const LIMITS = {
  name: 60,
  email: 254,
  subject: 120,
  contact: 20,
  message: 2000,
};

// Throttle (ms) between submits from this tab
const SUBMIT_THROTTLE_MS = 8000;

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  // Honeypot (bots will often fill hidden inputs)
  const [hp, setHp] = useState("");
  // Loading / disable button
  const [sending, setSending] = useState(false);
  // Throttle
  const lastSubmitRef = useRef(0);

  // Helpers to enforce length limits on change
  const cap = (s, max) => (s || "").slice(0, max);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // 1) Throttle
    const now = Date.now();
    if (now - lastSubmitRef.current < SUBMIT_THROTTLE_MS) {
      toast.info("Please wait a few seconds before sending again.");
      return;
    }

    // 2) Honeypot (if bot filled it, silently succeed to not tip them off)
    if (hp && hp.trim() !== "") {
      toast.success("Message Sent Successfully!");
      // optionally: still send to a sink or ignore
      return;
    }

    // 3) Sanitize + trim + cap
    const cleaned = {
      name: cap(sanitizeLoose(name), LIMITS.name),
      email: cap(sanitizeLoose(email), LIMITS.email),
      subject: cap(sanitizeLoose(subject), LIMITS.subject),
      contact: cap(sanitizeLoose(contact), LIMITS.contact),
      message: cap(sanitizeLoose(message), LIMITS.message),
    };

    // 4) Validate
    if (!NAME_RE.test(cleaned.name)) {
      toast.error("Please enter a valid name (2–60 letters).");
      return;
    }
    if (!EMAIL_RE.test(cleaned.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!SUBJECT_RE.test(cleaned.subject)) {
      toast.error("Subject can include letters, numbers and basic punctuation (3–120 chars).");
      return;
    }
    if (!PHONE_RE.test(cleaned.contact)) {
      toast.error("Please enter a valid phone number (10–15 digits, + optional).");
      return;
    }
    if (cleaned.message.length < 10) {
      toast.error("Message is too short (min 10 characters).");
      return;
    }

    // 5) Submit
    setSending(true);
    try {
      const res = await apiservices.contact(cleaned);
      if (res?.data?.success) {
        toast.success("Message Sent Successfully!");
        setName("");
        setEmail("");
        setSubject("");
        setContact("");
        setMessage("");
        lastSubmitRef.current = now;
      } else {
        toast.error(res?.data?.message || "Error, please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section id="contact" className="contact my-5">
        <div className="container-fluid px-0">
          <div className="d-flex g-0">
            {/* Left Image */}
            <div className="col-lg-6 d-none d-lg-block">
              <div
                style={{
                  backgroundImage: `url('/contact.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  minHeight: "100%",
                }}
                className="h-100"
              />
            </div>

            {/* Right Form & Info */}
            <div className="col-lg-6 bg-light">
              <h2 className="mb-4 text-center fw-bold custom-icon-color">Contact Us</h2>

              {/* Info boxes (unchanged) */}
              <div className="row g-4 mb-4">
                <div className="col-md-6 d-flex align-items-start">
                  <i className="fa-solid fa-location-dot fa-xl me-3 custom-icon-color mt-1" />
                  <div>
                    <h5 className="fw-bold">Location:</h5>
                    <p className="mb-0">
                      Office No 36, 2nd Floor, D-185, Phase 8B, Industrial Area, Sector 74,<br />
                      Mohali, Punjab - 160055
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-start">
                  <i className="fa-regular fa-clock fa-xl me-3 custom-icon-color mt-1" />
                  <div>
                    <h5 className="fw-bold">Open Hours:</h5>
                    <p className="mb-0">Mon - Sat: 10:00 AM - 6:30 PM</p>
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-start">
                  <i className="fa-solid fa-envelope fa-xl me-3 custom-icon-color mt-1" />
                  <div>
                    <h5 className="fw-bold">Email:</h5>
                    <p className="mb-0">
                      poeticatma@gmail.com<br />
                      info@poeticatma.com
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-start">
                  <i className="fa-solid fa-phone-volume fa-xl me-3 custom-icon-color mt-1" />
                  <div>
                    <h5 className="fw-bold">Call:</h5>
                    <p className="mb-0">
                      +91 76579 99786<br />
                      +91 86995 24005
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleFormSubmit} className="email-form" noValidate>
                {/* Honeypot (hidden) */}
                <input
                  type="text"
                  name="company"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ display: "none" }}
                />

                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(cap(e.target.value, LIMITS.name))}
                      required
                      inputMode="text"
                      autoComplete="name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(cap(e.target.value, LIMITS.email))}
                      required
                      inputMode="email"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(cap(e.target.value, LIMITS.subject))}
                    required
                    inputMode="text"
                  />
                </div>

                <div className="form-group mt-3">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number"
                    value={contact}
                    onChange={(e) => setContact(cap(e.target.value, LIMITS.contact))}
                    required
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </div>

                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(cap(e.target.value, LIMITS.message))}
                    required
                  />
                  <div className="form-text text-end">
                    {message.length}/{LIMITS.message}
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5 rounded-pill"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="map mt-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.2215007285563!2d75.59786437550889!3d31.32525537430389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5b1d100ae15b%3A0x9992dadc580b19e8!2sVibrantick%20Infotech%20Solutions!5e0!3m2!1sen!2sin!4v1705407543538!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Poetic Atma Office Location"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <ToastContainer />
    </>
  );
}
