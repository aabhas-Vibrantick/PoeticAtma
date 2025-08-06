import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import apiServices from '../../../ApiServices/ApiServices';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Orderlist() {
  const [allOrder, setAllOrder] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    apiServices.getallorder()
      .then((data) => {
        if (data.data.success) {
          setAllOrder(data.data.data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch(() => {
        toast.error('Something went wrong');
      });
  }, []);

  const deleteOrder = (id) => {
    const data = { _id: id };
    apiServices.deleteOrder(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          apiServices.getallorder().then((updatedData) => {
            if (updatedData.data.success) {
              setAllOrder(updatedData.data.data);
            }
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        toast.error('Something went wrong');
      });
  };

  const changeStatus = (id, status) => {
    setLoading(true);
    const data = {
      _id: id,
      status: status ? '0' : '1',
    };
    apiServices.updateorderStatus(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          apiServices.getallorder().then((updatedData) => {
            if (updatedData.data.success) {
              setAllOrder(updatedData.data.data);
            }
          });
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error('Something went wrong!! Try Again Later');
        setLoading(false);
      });
  };

  const handleClear = () => {
    if (filterText) setFilterText('');
  };

  const columns = [
    { name: 'S.No.', selector: (_, index) => index + 1, width: '80px' },
    { name: 'Order ID', selector: (row) => row._id, sortable: true },
    { name: 'User Name', selector: (row) => row.userId?.name || 'Unknown', sortable: true },
    { name: 'Book Name', selector: (row) => row.bookId?.title || 'N/A', sortable: true },
    { name: 'Price', selector: (row) => row.price_per_item, sortable: true },
    { name: 'Quantity', selector: (row) => row.quantity, sortable: true },
    { name: 'Total', selector: (row) => row.sub_total, sortable: true },
    {
      name: 'Status',
      selector: (row) => row.status ? 'Active' : 'Inactive',
      cell: (row) => (
        <span className={`badge ${row.status ? 'bg-success' : 'bg-secondary'} text-light`}>
          {row.status ? 'Active' : 'Inactive'}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex flex-wrap gap-1">
          <Link to={`/admin/update-order/${row._id}`}>
            <button className="btn btn-sm btn-outline-primary">Edit</button>
          </Link>

          <button
            onClick={() => deleteOrder(row._id)}
            className="btn btn-sm btn-outline-danger"
          >
            Delete
          </button>

          <button
            onClick={() => changeStatus(row._id, row.status)}
            className={`btn btn-sm ${row.status ? 'btn-outline-warning' : 'btn-outline-success'}`}
          >
            {row.status ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      ),
      width: '280px',
    },
  ];

  const filteredOrder = allOrder.filter((order) =>
    (order.userId?.name && order.userId.name.toLowerCase().includes(filterText.toLowerCase())) ||
    (order.bookId?.title && order.bookId.title.toLowerCase().includes(filterText.toLowerCase()))
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
            <h2 className="text-dark fw-bold">Order List</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search order..."
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
              <CSVLink data={filteredOrder} filename="order-data.csv">
                <button className="btn btn-primary">Download CSV</button>
              </CSVLink>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="List of Orders"
              columns={columns}
              data={filteredOrder}
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
                    fontSize: '18px',
                    fontWeight: '600',
                    backgroundColor: '#f8f9fa',
                    padding: '16px',
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
