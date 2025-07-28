import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function ProseList() {
  const [allProse, setAllProse] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);
  const parse = require("html-react-parser");

  useEffect(() => {
    fetchProse();
  }, []);

  const fetchProse = () => {
    setLoading(true);
    apiServices
      .getallprose()
      .then((res) => {
        if (res.data.success) {
          const filtered = res.data.data.filter((item) => item.status === true);
          setAllProse(filtered);
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

  const deleteProse = (id) => {
    if (!window.confirm("Are you sure you want to delete this prose?")) return;

    apiServices
      .deleteprose({ _id: id })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          fetchProse();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const changeStatus = (id, status) => {
    const updatedStatus = status ? "0" : "1";
    apiServices
      .updateProseStatus({ _id: id, status: updatedStatus })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          fetchProse();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const approveProse = (id) => {
    setLoading(true);
    apiServices
      .approveProse({ _id: id })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message || "Prose approved successfully");
          fetchProse();
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

  const handleClear = () => {
    setFilterText("");
  };

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
          style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "8px" }}
          alt="Prose"
        />
      ),
    },
    {
      name: "Category",
      selector: (row) => row.Category_id?.Category_name || "N/A",
      sortable: true,
    },
    {
      name: "Prose",
      selector: (row) => parse(row.prose),
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
      selector: (row) => (row.isApproved ? "Approved" : "Pending"),
      cell: (row) => (
        <span className={`badge ${row.isApproved ? "bg-success" : "bg-secondary"}`}>
          {row.isApproved ? "Approved" : "Pending"}
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
        <div className="d-flex flex-wrap gap-1">
          <Link to={`/admin/update-prose/${row._id}`}>
            <button className="btn btn-sm btn-outline-primary">Edit</button>
          </Link>

          <button
            onClick={() => changeStatus(row._id, row.status)}
            className={`btn btn-sm ${row.status ? "btn-outline-danger" : "btn-outline-warning"}`}
          >
            {row.status ? "Delete" : "Restore"}
          </button>

          {!row.isApproved && (
            <button
              onClick={() => approveProse(row._id)}
              className="btn btn-sm btn-outline-success"
            >
              Approve
            </button>
          )}
        </div>
      ),
      width: "280px",
    },
  ];

  const filteredProse = allProse.filter((item) => {
    const search = filterText.toLowerCase();
    return (
      item.title?.toLowerCase().includes(search) ||
      item.prose?.toLowerCase().includes(search) ||
      item.tags?.toLowerCase().includes(search) ||
      item.userId?.name?.toLowerCase().includes(search) ||
      item.Category_id?.Category_name?.toLowerCase().includes(search)
    );
  });

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
