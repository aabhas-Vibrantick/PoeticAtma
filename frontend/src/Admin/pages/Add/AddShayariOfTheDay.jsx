import React, { useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddShayariOfTheDay() {
  const nav = useNavigate();
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleShayariSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error("Please enter the shayari text.");
      return;
    }

    const payload = {
      shayari: text.trim(),
      author: author.trim() || "Anonymous",
    };

    try {
      setSubmitting(true);
      const response = await apiServices.addShayariOfTheDay(payload); // ✅ namespaced API
      if (response.data?.success) {
        toast.success("Shayari added successfully!");
        setTimeout(() => {
          nav("/admin/view-shayari-of-the-day"); // ✅ matches namespaced list route
        }, 1200);
      } else {
        toast.error(response.data?.message || "Failed to add shayari.");
      }
    } catch (error) {
      console.error("Error adding shayari:", error);
      toast.error("Server error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className="main-container adminbody">
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col article">
              <h2 className="text-dark">Add Shayari of the Day</h2>
              <form className="mt-5" onSubmit={handleShayariSubmit}>
                {/* Shayari Text */}
                <div className="form-outline mb-4">
                  <label className="form-label text-dark">Shayari</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter the shayari here..."
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
                    placeholder="e.g. Mirza Ghalib"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary-1 btn-block mb-4"
                  disabled={submitting}
                >
                  {submitting ? "Posting..." : "Post Shayari"}
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

export default AddShayariOfTheDay;
