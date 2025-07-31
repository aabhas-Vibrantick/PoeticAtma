import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import apiServices from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function UserOrderlist() {
  const [allOrder, setAllOrder] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [id, setId] = useState(sessionStorage.getItem("_id"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    setId(sessionStorage.getItem("_id"));
    const data = { userId: id };
    apiServices
      .getallorder(data)
      .then((res) => {
        if (res.data.success) {
          setAllOrder(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong"));
  }, [id]);

  const changeStatus = (orderId, currentStatus) => {
    setLoading(true);
    const data = { _id: orderId, status: currentStatus ? "0" : "1" };
    apiServices
      .updateorderStatus(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          apiServices.getallorder({ userId: id }).then((updated) => {
            if (updated.data.success) setAllOrder(updated.data.data);
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

  const filteredOrder = allOrder.filter(
    (order) =>
      order.userId?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      order.bookId?.title?.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    { name: "S.No.", selector: (_, index) => index + 1, width: "80px" },
    { name: "Order ID", selector: "_id", sortable: true },
    {
      name: "Status",
      selector: (row) => row.order_status,
      cell: (row) => (
        <span
          className={`badge ${row.order_status === "Delivered" ? "bg-success" : "bg-warning"} text-dark`}
        >
          {row.order_status}
        </span>
      ),
    },
    { name: "Price", selector: "price_per_item", sortable: true },
    { name: "Qty", selector: "quantity", sortable: true },
    { name: "Total", selector: "sub_total", sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => changeStatus(row._id, row.status)}
          >
            Delete
          </button>
        </div>
      ),
      width: "160px",
    },
  ];

  return (
    <>
      <main className="main-container adminbody bg-light py-4">
        <div className="container-fluid">
          <div className="text-center mb-4">
            <h2 className="text-dark fw-bold">My Order List</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search orders..."
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
              title="List of Orders"
              columns={columns}
              data={filteredOrder}
              selectableRows
              onSelectedRowsChange={() => {}}
              progressPending={loading}
              striped
              highlightOnHover
              pagination
            />
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}
