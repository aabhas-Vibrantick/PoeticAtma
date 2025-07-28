import React, { useEffect, useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function ViewQuote() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    apiServices.getAllQuotes().then((res) => {
      if (res.data.success) {
        setQuotes(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to load quotes");
      }
    }).catch(() => toast.error("Server error"));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quote?")) return;

    try {
      const res = await apiServices.deleteQuote(id);
      if (res.data.success) {
        toast.success("Deleted successfully");
        setQuotes(quotes.filter((q) => q._id !== id));
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <main className="main-container adminbody">
      <div className="container mt-4">
        <h2>Manage Quotes</h2>
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Quote</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote._id}>
                <td>{quote.quote}</td>
                <td>{quote.author}</td>
                <td>
                  {/* <Link to={`/admin/update-quote/${quote._id}`}>
                    <button className="btn btn-sm btn-warning me-2">Edit</button>
                  </Link> */}
                  <button
                    onClick={() => handleDelete(quote._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </main>
  );
}

export default ViewQuote;
