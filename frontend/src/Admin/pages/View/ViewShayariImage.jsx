import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

export default function ShayariImageList() {
  const [allSher, setAllSher] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiServices
      .getallShayariImage()
      .then((data) => {
        if (data.data.success) {
          setAllSher(data.data.data);
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

  const changeStatus = (id, status) => {
    setLoading(true);
    const upstatus = status ? "0" : "1";
    apiServices
      .updateShayariImageStatus({ _id: id, status: upstatus })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setAllSher((prev) =>
            prev.map((item) =>
              item._id === id ? { ...item, status: !status } : item
            )
          );
        } else {
          toast.error(response.data.message);
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
    { name: "Title", selector: "title", sortable: true, grow: 2 },
    {
      name: "Image",
      width: "150px",
      cell: (row) => (
        <img
          src={BASE_URL_IMG + row.Image}
          className="img-thumbnail"
          style={{
            height: "100px",
            width: "100px",
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
      grow: 1,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`badge ${row.status ? "bg-primary" : "bg-danger"} text-light`}
          style={{ minWidth: "70px", textAlign: "center", display: "inline-block" }}
        >
          {row.status ? "Active" : "Inactive"}
        </span>
      ),
      width: "100px",
    },
    { name: "Tags", selector: "tags", wrap: true, grow: 1 },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2 flex-wrap">
          <button
            onClick={() => changeStatus(row._id, row.status)}
            className={`btn btn-sm ${
              row.status ? "btn-outline-danger" : "btn-outline-success"
            }`}
            title={row.status ? "Set Inactive" : "Set Active"}
            style={{ minWidth: "90px" }}
          >
            {row.status ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
          </button>
        </div>
      ),
      width: "150px",
    },
  ];

  const filteredShers = allSher.filter(
    (shers) =>
      shers.title.toLowerCase().includes(filterText.toLowerCase()) ||
      (shers.Category_id?.Category_name &&
        shers.Category_id.Category_name
          .toLowerCase()
          .includes(filterText.toLowerCase()))
  );

  const headerStyle = {
    backgroundColor: "#ffcc00",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <>
      <main className="main-container adminbody bg-light py-4">
        <div className="container-fluid col-10">
          <div className="text-center mb-4">
            <h2 className="text-dark fw-bold">Shayari Image List</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search images..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={handleClear}
                style={{ minWidth: "90px" }}
              >
                Clear
              </button>
            </div>
            <div className="col-md-6 text-end">
              <CSVLink data={filteredShers} filename="shayari-images.csv">
                <button className="btn btn-primary">Download CSV</button>
              </CSVLink>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="List of Shayari Images"
              columns={columns}
              data={filteredShers}
              progressPending={loading}
              striped
              highlightOnHover
              pagination
              selectableRows
              customStyles={{ header: { style: headerStyle } }}
            />
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
