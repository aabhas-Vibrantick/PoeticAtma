import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

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
          const filtered = res.data.data.filter((item) => item.status === true);
          setAllShayari(filtered);
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

  const deleteShayari = (id) => {
    apiServices
      .deleteshayari({ _id: id })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          fetchShayari();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const changeStatus = (id, status) => {
    const updatedStatus = status ? "0" : "1";
    apiServices
      .updateShayariStatus({ _id: id, status: updatedStatus })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          fetchShayari();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const approveShayari = (id) => {
  setLoading(true); // Set loading state

  const data = {
    _id: id,
  };

  console.log("Approving Shayari with ID:", id); // 🐛 Debug

  apiServices
    .approveShayari(data)
    .then((response) => {
      ///console.log("Approve Shayari Response:", response.data); // 🐛 Debug

      if (response.data.success) {
        toast.success(response.data.message || "Shayari approved successfully");

        // Refresh all Shayari
        fetchShayari();
      } else {
        toast.error(response.data.message || "Approval failed");
      }

      setLoading(false);
    })
    .catch((error) => {
      //console.error("Error while approving Shayari:", error); // 🐛 Debug
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
          <Link to={`/admin/update-shayari/${row._id}`}>
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
              onClick={() => approveShayari(row._id)}
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

  const filteredShayari = allShayari.filter((item) => {
    const search = filterText.toLowerCase();
    return (
      item.title?.toLowerCase().includes(search) ||
      item.shayari?.toLowerCase().includes(search) ||
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
