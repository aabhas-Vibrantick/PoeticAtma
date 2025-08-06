import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import { ToastContainer, toast } from "react-toastify";
import apiServices from "../../ApiServices/ApiServices";

export default function Messages() {
  const [toggleCleared, setToggleCleared] = useState(false);
  const [allMessage, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiServices.getallcontacts();
      if (response.data.success) {
        setMessage(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const changeStatus = (id, status) => {
    setLoading(true);
    const upstatus = status ? "0" : "1";
    const data = {
      _id: id,
      status: upstatus,
    };
    apiServices
      .changeContactStatus(data)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        setLoading(false);
        fetchData();
      })
      .catch(() => {
        toast.error("Something went wrong!! Try Again Later");
        setLoading(false);
      });
  };

  const columns = [
    {
      name: "S.No.",
      selector: (_, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    { name: "Name", selector: "name", sortable: true },
    { name: "Email", selector: "email", sortable: true, width: "200px" },
    { name: "Subject", selector: "subject", sortable: true, width: "200px" },
    { name: "Phone", selector: "contact", sortable: true },
    {
      name: "Message",
      selector: "message",
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Status",
      selector: (row) => (row.status ? "Active" : "Inactive"),
      cell: (row) => (
        <span
          className={`badge ${
            row.status ? "bg-success" : "bg-secondary"
          } text-light`}
        >
          {row.status ? "Active" : "Inactive"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => changeStatus(row._id, row.status)}
          className={`btn btn-xs px-2 py-1 ${
            row.status ? "btn-outline-danger" : "btn-outline-warning"
          }`}
          style={{ fontSize: "12px", width: "70px" }}
        >
          {row.status ? "Off" : "On"}
        </button>
      ),
    },
  ];

  const filteredMessages = allMessage.filter(
    (msg) =>
      msg.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      msg.email?.toLowerCase().includes(filterText.toLowerCase()) ||
      msg.contact?.toLowerCase().includes(filterText.toLowerCase()) ||
      msg.message?.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setFilterText("");
    }
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
            <h2 className="text-dark fw-bold">Messages</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search messages..."
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
              <CSVLink data={filteredMessages} filename="messages.csv">
                <button className="btn btn-primary">Download CSV</button>
              </CSVLink>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="Contact Messages"
              columns={columns}
              data={filteredMessages}
              selectableRows
              onSelectedRowsChange={() => {}}
              progressPending={loading}
              striped
              highlightOnHover
              pagination
              fixedHeader
              fixedHeaderScrollHeight="600px"
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
