import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import { ToastContainer, toast } from "react-toastify";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { Link } from "react-router-dom";

function AllUserList() {
  const [toggleCleared, setToggleCleared] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiServices.getallcustomer();
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const deleteuser = (id) => {
    const data = { _id: id };
    apiServices.deletecustomer(data).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message);
        fetchData();
      } else {
        toast.error(response.data.message);
      }
    }).catch(() => {
      toast.error("Something went wrong");
    });
  };

  const changeStatus = (id, status) => {
    setLoading(true);
    const upstatus = status ? '0' : '1';
    const data = { _id: id, status: upstatus };

    apiServices.changeStatus(data).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
      fetchData();
    }).catch(() => {
      toast.error('Something went wrong!! Try Again Later');
      setLoading(false);
    });
  };

  const handleClear = () => {
    setFilterText("");
  };

  const handleChange = ({ selectedRows }) => {
    // console.log('Selected Rows:', selectedRows);
  };

  const columns = [
    { name: "S.No", selector: (_, index) => index + 1, width: "70px" },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Image",
      width: "100px",
      cell: (row) => (
        <img
          src={BASE_URL_IMG + row.Image}
          alt=""
          className="img-thumbnail"
          style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "8px" }}
        />
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address || "N/A",
    },
    {
      name: "Phone",
      selector: (row) => row.contact,
    },
    {
      name: "Status",
      selector: (row) => (row.userId?.status ? "Active" : "Inactive"),
      cell: (row) => (
        <span className={`badge ${row.userId?.status ? "bg-success" : "bg-secondary"}`}>
          {row.userId?.status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex flex-wrap gap-1">
          <Link to={`/admin/admin-profile/${row.userId?._id}`}>
            <button className="btn btn-sm btn-outline-primary">Edit</button>
          </Link>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => deleteuser(row._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-sm btn-outline-warning"
            onClick={() => changeStatus(row.userId?._id, row.userId?.status)}
          >
            Status
          </button>
        </div>
      ),
      width: "250px",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const search = filterText.toLowerCase();
    return (
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      (user.contact && typeof user.contact === "string" && user.contact.toLowerCase().includes(search)) ||
      user.address?.toLowerCase().includes(search) ||
      user.userId?._id?.toLowerCase().includes(search)
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
            <h2 className="text-dark fw-bold">All Users</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search user..."
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
              <CSVLink data={filteredUsers} filename="user-data.csv">
                <button className="btn btn-primary">Download CSV</button>
              </CSVLink>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="List of Users"
              columns={columns}
              data={filteredUsers}
              progressPending={loading}
              striped
              highlightOnHover
              pagination
              selectableRows
              onSelectedRowsChange={handleChange}
              clearSelectedRows={toggleCleared}
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

export default AllUserList;
