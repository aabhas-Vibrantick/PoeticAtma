import React, { useEffect, useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
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
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won’t be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const res = await apiServices.deleteQuote(id);
      if (res.data.success) {
        Swal.fire("Deleted!", "Your quote has been deleted.", "success");
        setQuotes(quotes.filter((q) => q._id !== id));
      } else {
        Swal.fire("Error", res.data.message || "Delete failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server error", "error");
    }
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
