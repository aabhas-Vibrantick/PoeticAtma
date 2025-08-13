import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
export default function BlogList() {
  const [allBlog, setAllBlog] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);
  const parse = require("html-react-parser");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    setLoading(true);
    apiServices
      .getallblog()
      .then((res) => {
        if (res.data.success) {
          // Show all blogs, not just active ones
          setAllBlog(res.data.data);
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong");
        setLoading(false);
      });
  };

  const deleteBlog = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        apiServices
          .deleteblog({ _id: id })
          .then((res) => {
            if (res.data.success) {
              fetchBlogs(); // Refresh list after deletion
              Swal.fire(
                "Deleted!",
                res.data.message || "The record has been deleted.",
                "success"
              );
            } else {
              Swal.fire(
                "Error!",
                res.data.message || "Failed to delete",
                "error"
              );
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong", "error");
          });
      }
    });
  };

  const changeStatus = (id, status) => {
    const updatedStatus = status ? "0" : "1";
    apiServices
      .updateBlogStatus({ _id: id, status: updatedStatus })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          fetchBlogs();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const handleClear = () => {
    setFilterText("");
  };

  const columns = [
    { name: "S.No", selector: (_, index) => index + 1, width: "70px" },
    { name: "Title", selector: "title", sortable: true, wrap: true },
    {
      name: "Description",
      selector: (row) => parse(row.description || ""),
      wrap: true,
      grow: 2,
    },
    {
      name: "Image",
      width: "100px",
      cell: (row) => (
        <img
          src={BASE_URL_IMG + row.Image}
          className="img-thumbnail"
          style={{
            width: "70px",
            height: "70px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          alt="Blog"
        />
      ),
    },
    {
      name: "Category",
      selector: (row) => row.Category_id?.Category_name || "N/A",
      sortable: true,
    },
    {
      name: "Author",
      selector: (row) => row.userId?.name || "Unknown",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.status ? 1 : 0), // numeric for sorting
      cell: (row) => (
        <span className={`badge ${row.status ? "bg-success" : "bg-secondary"}`}>
          {row.status ? "Active" : "Inactive"}
        </span>
      ),
      sortable: true,
      sortFunction: (a, b) => b.status - a.status, // Active first
    },
    {
      name: "Featured",
      selector: (row) => (row.isFeatured ? "Yes" : "No"),
      cell: (row) => (
        <span
          className={`badge ${row.isFeatured ? "bg-success" : "bg-secondary"}`}
        >
          {row.isFeatured ? "Yes" : "No"}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex flex-wrap gap-2">
          {/* Edit */}
          <Link to={`/admin/update-blog/${row._id}`}>
            <button className="btn btn-sm btn-outline-warning" title="Edit">
              <FaEdit />
            </button>
          </Link>

          {/* Status Toggle */}
          <button
            onClick={() => changeStatus(row._id, row.status)}
            className={`btn btn-sm ${
              row.status ? "btn-outline-warning" : "btn-outline-success"
            }`}
            title={row.status ? "Set Inactive" : "Set Active"}
          >
            {row.status ? <FaToggleOn /> : <FaToggleOff />}
          </button>

          {/* Delete */}
          <button
            onClick={() => deleteBlog(row._id)}
            className="btn btn-sm btn-outline-danger"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ),
      width: "300px",
    },
  ];

  const filteredBlogs = allBlog.filter((item) => {
    const search = filterText.toLowerCase();
    return (
      item.title?.toLowerCase().includes(search) ||
      item.description?.toLowerCase().includes(search) ||
      item.userId?.name?.toLowerCase().includes(search) ||
      item.Category_id?.Category_name?.toLowerCase().includes(search)
    );
  });

  return (
    <>
      <main className="main-container adminbody bg-light py-4">
        <div className="container-fluid">
          <div className="text-center mb-4">
            <h2 className="text-dark fw-bold">Blog List</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search blog..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
            <div className="col-md-6 text-end">
              <CSVLink data={filteredBlogs} filename="blog-data.csv">
                <button className="btn btn-primary">Download CSV</button>
              </CSVLink>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="List of Blogs"
              columns={columns}
              data={filteredBlogs}
              selectableRows
              onSelectedRowsChange={({ selectedRows }) =>
                console.log("Selected Rows:", selectedRows)
              }
              progressPending={loading}
              striped
              highlightOnHover
              pagination
              expandableRows
              expandableRowsComponent={({ data }) => (
                <pre>{JSON.stringify(data, null, 2)}</pre>
              )}
              customStyles={{
                header: {
                  style: {
                    fontSize: "18px",
                    fontWeight: "600",
                    backgroundColor: "#f8f9fa",
                    padding: "16px",
                  },
                },
              }}
            />
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}
