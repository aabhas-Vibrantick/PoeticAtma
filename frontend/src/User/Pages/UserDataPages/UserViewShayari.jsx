import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import { CSVLink } from "react-csv";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function UserShayariList() {
  const [allShayari, setAllShayari] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [id, setId] = useState(sessionStorage.getItem("_id"));
  const [loading, setLoading] = useState(true);
  const parse = require("html-react-parser");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    const data = { userId: id };
    apiServices
      .getallshayari(data)
      .then((res) => {
        if (res.data.success) {
          setAllShayari(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  }, [id]);

  const changeStatus = (id, status) => {
    setLoading(true);
    const data = {
      _id: id,
      status: status ? "0" : "1",
    };
    apiServices
      .updateShayariStatus(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          apiServices.getallshayari({ userId: id }).then((updatedData) => {
            if (updatedData.data.success) {
              setAllShayari(updatedData.data.data);
            }
          });
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong!! Try Again Later");
        setLoading(false);
      });
  };

  const handleClear = () => {
    if (filterText) setFilterText("");
  };

  const columns = [
    { name: "S.No.", selector: (_, index) => index + 1, width: "80px" },
    { name: "Title", selector: "title", sortable: true },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={BASE_URL_IMG + row.Image}
          className="img-thumbnail"
          alt="Shayari"
          style={{
            height: "70px",
            width: "70px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default_image.jpg";
          }}
        />
      ),
      width: "90px",
    },
    {
      name: "Category",
      selector: (row) => row.Category_id?.Category_name,
      sortable: true,
    },
    {
      name: "Shayari",
      selector: (row) => parse(row.shayari),
      wrap: true,
      grow: 2,
    },
    {
      name: "Tags",
      selector: "tags",
      wrap: true,
      grow: 1,
    },
    {
      name: "Status",
      selector: (row) => (row.status ? "Active" : "In-active"),
      sortable: true,
      cell: (row) => (
        <span
          className={`badge ${row.status ? "bg-success" : "bg-secondary"} text-light`}
        >
          {row.status ? "Active" : "In-active"}
        </span>
      ),
    },
    {
      name: "Approved",
      selector: (row) => (row.isApproved ? "Approved" : "Pending"),
      sortable: true,
      cell: (row) => (
        <span
          className={`badge ${
            row.isApproved ? "bg-success" : "bg-warning"
          } text-light`}
        >
          {row.isApproved ? "Approved" : "Pending"}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex flex-wrap gap-1">
          <Link to={`/update-shayari/${row._id}`}>
            <button className="btn btn-sm btn-outline-primary">Edit</button>
          </Link>
          <button
            onClick={() => changeStatus(row._id, row.status)}
            className={`btn btn-sm ${
              row.status ? "btn-outline-danger" : "btn-outline-warning"
            }`}
          >
            {row.status ? "Delete" : "Restore"}
          </button>
        </div>
      ),
      width: "240px",
    },
  ];

  const filteredShayari = allShayari.filter(
    (shayari) =>
      shayari.title?.toLowerCase().includes(filterText.toLowerCase()) ||
      shayari.shayari?.toLowerCase().includes(filterText.toLowerCase()) ||
      (shayari.Category_id?.Category_name &&
        shayari.Category_id.Category_name.toLowerCase().includes(filterText.toLowerCase()))
  );

  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  return (
    <>
      <style>{`
        .btn-outline-danger { border-width: 2px; }
        .btn-primary { background-color: #0069d9; border: none; }
        .btn-primary:hover { background-color: #0053b3; }
      `}</style>

      <main className="main-container adminbody bg-light py-4">
        <div className="container-fluid">
          <div className="text-center mb-4">
            <h2 className="text-dark fw-bold">My Shayari List</h2>
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
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="List of Shayari"
              columns={columns}
              data={filteredShayari}
              selectableRows
              onSelectedRowsChange={({ selectedRows }) => {}}
              progressPending={loading}
              striped
              highlightOnHover
              pagination
              expandableRows
              expandableRowsComponent={ExpandedComponent}
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
