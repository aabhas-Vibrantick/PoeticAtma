import React, { useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddQuote() { 
  const nav = useNavigate();
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error("Please enter the quote text.");
      return;
    }

    const payload = {
      quote: text.trim(),
      author: author.trim() || "Anonymous",
    };

    try {
      console.log("Payload to be sent:", payload);
      const response = await apiServices.addquote(payload);
      if (response.data.success) {
        toast.success("Quote added successfully!");
        setTimeout(() => {
          nav("/admin/view-quote");
        }, 2500);
      } else {
        toast.error("Failed to add quote.");
      }
    } catch (error) {
      console.error("Error adding quote:", error);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <>
      <main className="main-container adminbody">
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col article">
              <h2 className="text-dark">Add Daily Quote</h2>
              <form className="mt-5" onSubmit={handleQuoteSubmit}>
                {/* Quote Text */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Quote</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter the quote here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                </div>

                {/* Author */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Author</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Kabir Das"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary-1 btn-block mb-4">
                  Post Quote
                </button>
              </form>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default AddQuote;
