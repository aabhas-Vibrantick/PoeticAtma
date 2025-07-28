import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function SherList() {
  const [allSher, setAllSher] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);
  const parse = require("html-react-parser");
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    apiServices
      .getallsher()
      .then((data) => {
        if (data.data.success) {
          const filteredShers = data.data.data.filter(
            (sher) => sher.status === true
          );
          setAllSher(filteredShers);
          // setAllSher(data.data.data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        // // console.log(err);
        toast.error("Something went wrong");
      });
  }, []);

  const deleteSher = (id) => {
    let data = {
      _id: id,
    };
    apiServices
      .deletesher(data)
      .then((data) => {
        if (data.data.success) {
          toast.success(data.data.message);
          apiServices.getallsher().then((updatedData) => {
            if (updatedData.data.success) {
              const filteredShers = updatedData.data.data.filter(
                (sher) => sher.status === true
              );
              setAllSher(filteredShers);
              // setAllSher(updatedData.data.data);
            }
          });
        } else {
          toast.error(data.data.message);
        }
      })
      .catch((err) => {
        // // console.log(err);
      });
  };

  const approveSher = (id) => {
    setLoading(true);
    const data = {
      _id: id,
    };

    console.log("Approving sher with ID:", id); // 🐛 Debug

    apiServices
      .approveSher(data)
      .then((response) => {
        console.log("Approve Sher Response:", response.data); // 🐛 Debug

        if (response.data.success) {
          toast.success(response.data.message || "Sher approved");

          // Reload all shers
          apiServices.getallsher().then((res) => {
            console.log("Fetched all shers:", res.data); // 🐛 Debug

            if (res.data.success) {
              setAllSher(res.data.data);
            } else {
              toast.error("Failed to reload shers");
            }
          });
        } else {
          toast.error(response.data.message || "Approval failed");
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error while approving sher:", error); // 🐛 Debug
        toast.error("Something went wrong");
        setLoading(false);
      });
  };

  const changeStatus = (id, status) => {
    setLoading(true);
    const upstatus = status ? "0" : "1";
    const data = {
      _id: id,
      status: upstatus,
    };
    apiServices
      .updateSherStatus(data)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          apiServices.getallsher().then((updatedData) => {
            if (updatedData.data.success) {
              const filteredShers = updatedData.data.data.filter(
                (sher) => sher.status === true
              );
              setAllSher(filteredShers);
              // setAllSher(updatedData.data.data);
            }
          });
        } else {
          toast.error(response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        // console.error(error);
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
    {
      name: "Sher",
      selector: (row) => parse(row.sher),
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
      sortable: true,
      cell: (row) => (
        <span
          className={`badge ${
            row.status ? "bg-success" : "bg-secondary"
          } text-light`}
        >
          {row.isApproved ? "Approved" : "Pending"}
        </span>
      ),
    },
    {
      name: "Tags",
      selector: "tags",
      wrap: true,
      grow: 1,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex flex-wrap gap-1">
          {/* Edit Button */}
          <Link to={`/admin/update-sher/${row._id}`}>
            <button className="btn btn-sm btn-outline-primary">Edit</button>
          </Link>

          {/* Delete or Restore based on status */}
          <button
            onClick={() => changeStatus(row._id, row.status)}
            className={`btn btn-sm ${
              row.status ? "btn-outline-danger" : "btn-outline-warning"
            }`}
          >
            {row.status ? "Delete" : "Restore"}
          </button>

          {/* Show Approve button only if not already approved */}
          {!row.isApproved && (
            <button
              onClick={() => approveSher(row._id)}
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

  const filteredShers = allSher.filter(
    (shers) =>
      shers.title.toLowerCase().includes(filterText.toLowerCase()) ||
      (shers.userId?.name &&
        shers.userId?.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (shers.Category_id?.Category_name &&
        shers.Category_id?.Category_name.toLowerCase().includes(
          filterText.toLowerCase()
        )) ||
      (shers.index &&
        typeof shers.index === "string" &&
        shers.contact.toLowerCase().includes(filterText.toLowerCase())) ||
      (shers.sher &&
        shers.sher.toLowerCase().includes(filterText.toLowerCase())) ||
      (shers.status &&
        shers.status.toLowerCase().includes(filterText.toLowerCase()))
  );

  // expended function-----
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  // --------toast selection function----
  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    // console.log('Selected Rows: ', selectedRows);
  };

  const headerStyle = {
    backgroundColor: "#ffcc00",
    color: "white",
    fontWeight: "bold",
  };
  return (
    <>
      <style>{`.main-container {
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
