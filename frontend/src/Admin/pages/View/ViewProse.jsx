import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
const parse = require("html-react-parser");

export default function ProseList() {
  const [allProse, setAllProse] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProse();
  }, []);

  const fetchProse = () => {
    setLoading(true);
    apiServices
      .getallprose()
      .then((res) => {
        if (res.data.success) {
          setAllProse(res.data.data); // keep all records
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

  // Delete Prose
  const deleteProse = (id) => {
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
          .deleteProse({ _id: id })
          .then((res) => {
            if (res.data.success) {
              setAllProse((prev) => prev.filter((prose) => prose._id !== id));
              Swal.fire("Deleted!", "The record has been deleted.", "success");
            } else {
              Swal.fire("Error!", res.data.message || "Failed to delete", "error");
            }
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

  // Approve Prose
  const approveProse = (id) => {
    apiServices
      .approveProse({ _id: id })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message || "Prose approved");
          setAllProse((prev) =>
            prev.map((prose) =>
              prose._id === id ? { ...prose, isApproved: true } : prose
            )
          );
        } else {
          toast.error(res.data.message || "Approval failed");
        }
      })
      .catch(() => toast.error("Something went wrong"));
  };

  // Change Status
  const changeStatus = (id, status) => {
    const upstatus = status ? "0" : "1";
    apiServices
      .updateProseStatus({ _id: id, status: upstatus })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setAllProse((prev) =>
            prev.map((prose) =>
              prose._id === id ? { ...prose, status: !status } : prose
            )
          );
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong!! Try Again Later"));
  };

  const handleClear = () => setFilterText("");

  // Table Columns
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
          alt="Prose"
        />
      ),
      width: "90px",
    },
    {
      name: "Category",
      selector: (row) => row.Category_id?.Category_name || "N/A",
      sortable: true,
    },
    { name: "Prose", selector: (row) => parse(row.prose), wrap: true, grow: 2 },
    {
      name: "Author",
      selector: (row) => row.userId?.name || "Unknown",
      sortable: true,
    },
    {
      name: "Approved",
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
          <Link to={`/admin/update-prose/${row._id}`}>
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
            onClick={() => deleteProse(row._id)}
            className="btn btn-sm btn-outline-danger"
            title="Delete"
          >
            <FaTrash />
          </button>

          {/* Approve */}
          {!row.isApproved && (
            <button
              onClick={() => approveProse(row._id)}
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

  const filteredProse = allProse.filter(
    (p) =>
      p.title?.toLowerCase().includes(filterText.toLowerCase()) ||
      p.userId?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      p.Category_id?.Category_name?.toLowerCase().includes(filterText.toLowerCase()) ||
      p.prose?.toLowerCase().includes(filterText.toLowerCase()) ||
      p.tags?.toLowerCase().includes(filterText.toLowerCase())
  );

  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  return (
    <>
      <main className="main-container adminbody bg-light py-4">
        <div className="container-fluid">
          <div className="text-center mb-4">
            <h2 className="text-dark fw-bold">Prose List</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search prose..."
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
              <CSVLink data={filteredProse} filename="prose-data.csv">
                <button className="btn btn-primary">Download CSV</button>
              </CSVLink>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="List of Prose"
              columns={columns}
              data={filteredProse}
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
