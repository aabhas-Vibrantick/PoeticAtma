import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function ShayriList() {
  const [allShayari, setAllShayari] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);
  const parse = require("html-react-parser");

  useEffect(() => {
    fetchShayari();
  }, []);

  const fetchShayari = () => {
    setLoading(true);
    apiServices
      .getallshayari()
      .then((res) => {
        if (res.data.success) {
          setAllShayari(res.data.data);
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

  // Delete with confirmation
  const deleteShayari = (id) => {
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
          .deleteShayari({ _id: id })
          .then((res) => {
            if (res.data.success) {
              setAllShayari((prev) =>
                prev.filter((shayari) => shayari._id !== id)
              );
              Swal.fire("Deleted!", "The record has been deleted.", "success");
            } else {
              Swal.fire(
                "Error!",
                res.data.message || "Failed to delete",
                "error"
              );
            }
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

  // Status change with confirmation
  const changeStatus = (id, status) => {
    const upstatus = status ? "0" : "1";
    apiServices
      .updateShayariStatus({ _id: id, status: upstatus })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setAllShayari((prev) =>
            prev.map((shayari) =>
              shayari._id === id ? { ...shayari, status: !status } : shayari
            )
          );
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong!! Try Again Later"));
  };

  const approveShayari = (id) => {
    setLoading(true);
    apiServices
      .approveShayari({ _id: id })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message || "Shayari approved");
          setAllShayari((prev) =>
            prev.map((shayari) =>
              shayari._id === id ? { ...shayari, isApproved: true } : shayari
            )
          );
        } else {
          toast.error(res.data.message || "Approval failed");
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong");
        setLoading(false);
      });
  };

  const handleClear = () => setFilterText("");

  const columns = [
    { name: "S.No", selector: (_, index) => index + 1, width: "70px" },
    { name: "Title", selector: "title", sortable: true },
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
          alt="Shayari"
        />
      ),
    },
    {
      name: "Category",
      selector: (row) => row.Category_id?.Category_name || "N/A",
      sortable: true,
    },
    {
      name: "Shayari",
      selector: (row) => parse(row.shayari),
      wrap: true,
      grow: 2,
    },
    {
      name: "Author",
      selector: (row) => row.userId?.name || "Unknown",
      sortable: true,
    },
    {
      name: "Approved",
      selector: (row) => (row.isApproved ? 1 : 0), // numeric value for sorting
      cell: (row) => (
        <span
          className={`badge ${
            row.isApproved ? "bg-success" : "bg-secondary"
          } text-light`}
        >
          {row.isApproved ? "Approved" : "Pending"}
        </span>
      ),
      sortable: true,
      sortFunction: (a, b) => b.isApproved - a.isApproved, // Approved first
    },
    {
      name: "Status",
      cell: (row) => (
        <span className={`badge ${row.status ? "bg-primary" : "bg-danger"}`}>
          {row.status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      name: "Tags",
      selector: "tags",
      wrap: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex flex-wrap gap-2">
          {/* Edit */}
          <Link to={`/admin/update-shayari/${row._id}`}>
            <button className="btn btn-sm btn-outline-primary" title="Edit">
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
            {row.status ? <FaToggleOff /> : <FaToggleOn />}
          </button>

          {/* Delete */}
          <button
            onClick={() => deleteShayari(row._id)}
            className="btn btn-sm btn-outline-danger"
            title="Delete"
          >
            <FaTrash />
          </button>

          {/* Approve */}
          {!row.isApproved && (
            <button
              onClick={() => approveShayari(row._id)}
              className="btn btn-sm btn-outline-success"
              title="Approve"
            >
              <FaCheck />
            </button>
          )}
        </div>
      ),
      width: "300px",
    },
  ];

  const filteredShayari = allShayari.filter((s) => {
    const search = filterText.trim().toLowerCase(); // normalize search text

    // Convert every field to string safely
    const title = (s.title || "").toLowerCase();
    const author = (s.userId?.name || "").toLowerCase();
    const category = (s.Category_id?.Category_name || "").toLowerCase();
    const shayariText = (s.shayari || "").toLowerCase();
    const tags = (
      typeof s.tags === "string"
        ? s.tags
        : Array.isArray(s.tags)
        ? s.tags.join(", ")
        : ""
    ).toLowerCase();

    // Match if search is in any field
    return (
      title.includes(search) ||
      author.includes(search) ||
      category.includes(search) ||
      shayariText.includes(search) ||
      tags.includes(search)
    );
  });

  return (
    <>
      <main className="main-container adminbody bg-light py-4">
        <div className="container-fluid">
          <div className="text-center mb-4">
            <h2 className="text-dark fw-bold">Shayari List</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search shayari..."
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
              <CSVLink data={filteredShayari} filename="shayari-data.csv">
                <button className="btn btn-primary">Download CSV</button>
              </CSVLink>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="List of Shayari"
              columns={columns}
              data={filteredShayari}
              selectableRows
              progressPending={loading}
              striped
              highlightOnHover
              pagination
              expandableRows
              expandableRowsComponent={({ data }) => (
                <pre>{JSON.stringify(data, null, 2)}</pre>
              )}
            />
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}
