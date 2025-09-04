import React, { useEffect, useState } from "react";
import apiServices from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

function ViewShayariOfTheDay() {
  const [shayaris, setShayaris] = useState([]);

  useEffect(() => {
    apiServices
      .getAllShayariOfTheDay() // ✅ namespaced getter
      .then((res) => {
        if (res.data?.success) {
          setShayaris(res.data.data || []);
        } else {
          toast.error(res.data?.message || "Failed to load shayaris");
        }
      })
      .catch(() => toast.error("Server error"));
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
        const res = await apiServices.deleteShayariOfTheDay(id); // ✅ namespaced delete
        if (res.data?.success) {
          Swal.fire("Deleted!", "The shayari has been deleted.", "success");
          setShayaris((prev) => prev.filter((s) => s._id !== id));
        } else {
          Swal.fire("Error", res.data?.message || "Delete failed", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Server error", "error");
      }
    }
  };

  return (
    <main className="main-container adminbody">
      <div className="container mt-4">
        <h2>Manage Shayari of the Day</h2>
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Shayari</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shayaris.map((shayari) => (
              <tr key={shayari._id}>
                <td>{shayari.shayari}</td> {/* ✅ field name is 'shayari' */}
                <td>{shayari.author}</td>
                <td>
                  {/* <Link to={`/admin/update-shayari-of-the-day/${shayari._id}`}>
                    <button className="btn btn-sm btn-warning me-2">Edit</button>
                  </Link> */}
                  <button
                    onClick={() => handleDelete(shayari._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {shayaris.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No shayari found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </main>
  );
}

export default ViewShayariOfTheDay;
