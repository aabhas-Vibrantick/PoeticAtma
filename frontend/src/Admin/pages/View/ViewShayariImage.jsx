import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";

export default function ShayariImageList() {
  const [allSher, setAllSher] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    apiServices
      .getallShayariImage()
      .then((data) => {
        if (data.data.success) {
          setAllSher(data.data.data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  }, []);

  const changeStatus = (id, status) => {
    setLoading(true);
    const upstatus = status ? "0" : "1";
    const data = {
      _id: id,
      status: upstatus,
    };
    apiServices
      .updateShayariImageStatus(data)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          apiServices.getallShayariImage().then((updatedData) => {
            if (updatedData.data.success) {
              setAllSher(updatedData.data.data);
            }
          });
        } else {
          toast.error(response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Something went wrong!! Try Again Later");
        setLoading(false);
      });
  };

  const handleClear = () => {
    if (filterText) {
      setFilterText("");
    }
  };

  const columns = [
    { name: "S.No.", selector: (_, index) => index + 1, width: "80px" },
    { name: "Title", selector: "title", sortable: true },
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
    },
    {
      name: "Status",
      selector: (row) => (row.status ? "Active" : "Inactive"),
      sortable: true,
      cell: (row) => (
        <span
          className={`badge ${
            row.status ? "bg-success" : "bg-secondary"
          } text-light`}
        >
          {row.status ? "Active" : "Inactive"}
        </span>
      ),
    },
    { name: "Tags", selector: "tags", wrap: true, grow: 1 },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex flex-wrap gap-1">
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
      width: "200px",
    },
  ];

  const filteredShers = allSher.filter(
    (shers) =>
      shers.title.toLowerCase().includes(filterText.toLowerCase()) ||
      (shers.Category_id?.Category_name &&
        shers.Category_id?.Category_name
          .toLowerCase()
          .includes(filterText.toLowerCase()))
  );

  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  const handleChange = ({ selectedRows }) => {
    // For future selection logic
  };

  return (
    <>
      <style>{`
        .main-container {
          min-height: 100vh;
        }

        .btn-outline-danger {
          border-width: 2px;
        }

        .btn-primary {
          background-color: #0069d9;
          border: none;
        }

        .btn-primary:hover {
          background-color: #0053b3;
        }
      `}</style>

      <main className="main-container adminbody bg-light py-4">
        <div className="container-fluid">
          <div className="text-center mb-4">
            <h2 className="text-dark fw-bold">Shayari Image List</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search image..."
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
              <CSVLink data={filteredShers} filename="shayari-images.csv">
                <button className="btn btn-primary">Download CSV</button>
              </CSVLink>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="List of Shayari Image"
              columns={columns}
              data={filteredShers}
              selectableRows
              onSelectedRowsChange={handleChange}
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
