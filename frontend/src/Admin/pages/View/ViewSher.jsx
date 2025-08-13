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
const parse = require("html-react-parser");

export default function SherList() {
  const [allSher, setAllSher] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiServices
      .getallsher()
      .then((data) => {
        if (data.data.success) {
          setAllSher(data.data.data); // Show ALL shers
        } else {
          toast.error(data.data.message);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong");
        setLoading(false);
      });
  }, []);

  // Delete Sher
  const deleteSher = (id) => {
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
          .deleteSher({ _id: id })
          .then((res) => {
            if (res.data.success) {
              setAllSher((prev) => prev.filter((sher) => sher._id !== id));
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

  // Approve Sher (local update)
  const approveSher = (id) => {
    apiServices
      .approveSher({ _id: id })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message || "Sher approved");
          setAllSher((prev) =>
            prev.map((sher) =>
              sher._id === id ? { ...sher, isApproved: true } : sher
            )
          );
        } else {
          toast.error(res.data.message || "Approval failed");
        }
      })
      .catch(() => toast.error("Something went wrong"));
  };

  // Change Status (local update)
  const changeStatus = (id, status) => {
    const upstatus = status ? "0" : "1";
    apiServices
      .updateSherStatus({ _id: id, status: upstatus })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setAllSher((prev) =>
            prev.map((sher) =>
              sher._id === id ? { ...sher, status: !status } : sher
            )
          );
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong!! Try Again Later"));
  };

  const handleClear = () => setFilterText("");

  // Table columns
  const columns = [
    { name: "S.No.", selector: (_, index) => index + 1, width: "80px" },
    { name: "Title", selector: "title", sortable: true },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={BASE_URL_IMG + row.Image}
          className="img-thumbnail"
          style={{
            height: "70px",
            width: "70px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          alt="Sher"
        />
      ),
      width: "90px",
    },
    {
      name: "Category",
      selector: (row) => row.Category_id?.Category_name,
      sortable: true,
    },
    { name: "Sher", selector: (row) => parse(row.sher), wrap: true, grow: 2 },
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
        <span
          className={`badge ${
            row.status ? "bg-primary" : "bg-danger"
          } text-light`}
        >
          {row.status ? "Active" : "Inactive"}
        </span>
      ),
      sortable: true,
    },
    { name: "Tags", selector: "tags", wrap: true, grow: 1 },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex flex-wrap gap-2">
          {/* Edit */}
          <Link to={`/admin/update-sher/${row._id}`}>
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
            onClick={() => deleteSher(row._id)}
            className="btn btn-sm btn-outline-danger"
            title="Delete"
          >
            <FaTrash />
          </button>

          {/* Approve */}
          {!row.isApproved && (
            <button
              onClick={() => approveSher(row._id)}
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

  const filteredShers = allSher.filter((s) => {
  const search = filterText.trim().toLowerCase(); // normalize search text

  // Convert every field to string safely
  const title = (s.title || "").toLowerCase();
  const author = (s.userId?.name || "").toLowerCase();
  const category = (s.Category_id?.Category_name || "").toLowerCase();
  const sherText = (s.sher || "").toLowerCase();
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
    sherText.includes(search) ||
    tags.includes(search)
  );
});


  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  return (
    <>
      <main className="main-container adminbody bg-light py-4">
        <div className="container-fluid">
          <div className="text-center mb-4">
            <h2 className="text-dark fw-bold">Sher List</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search sher..."
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
              <CSVLink data={filteredShers} filename="sher-data.csv">
                <button className="btn btn-primary">Download CSV</button>
              </CSVLink>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="List of Sher"
              columns={columns}
              data={filteredShers}
              selectableRows
              progressPending={loading}
              striped
              highlightOnHover
              pagination
              expandableRows
              expandableRowsComponent={ExpandedComponent}
            />
          </div>
        </div>

        <ToastContainer />
      </main>
    </>
  );
}
