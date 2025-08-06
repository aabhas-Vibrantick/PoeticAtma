import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Testimoniallist() {
  const [allTestimonial, setAllTestimonial] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    apiServices.getallTestimonial().then((data) => {
      if (data.data.success) {
        setAllTestimonial(data.data.data);
      } else {
        toast.error(data.data.message);
      }
    }).catch(() => toast.error("Something went wrong"));
  }, []);

  const deleteTestimonial = (id) => {
    apiServices.deleteTestimonial({ _id: id }).then((data) => {
      if (data.data.success) {
        toast.success(data.data.message);
        apiServices.getallTestimonial().then((updatedData) => {
          if (updatedData.data.success) {
            setAllTestimonial(updatedData.data.data);
          }
        });
      } else {
        toast.error(data.data.message);
      }
    }).catch(() => toast.error("Something went wrong"));
  };

  const changeStatus = (id, status) => {
    setLoading(true);
    const data = { _id: id, status: status ? '0' : '1' };
    apiServices.updatetestimonialStatus(data).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message);
        apiServices.getallTestimonial().then((updatedData) => {
          if (updatedData.data.success) {
            setAllTestimonial(updatedData.data.data);
          }
        });
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    }).catch(() => {
      toast.error('Something went wrong!! Try Again Later');
      setLoading(false);
    });
  };

  const handleClear = () => setFilterText('');

  const columns = [
    { name: 'SNo.', selector: (_, index) => index + 1 },
    {
      name: 'Image',
      cell: row => (
        <img
          src={BASE_URL_IMG + row.Image}
          className="img-fluid"
          style={{ height: "80px", width: "80px", objectFit: "cover", borderRadius: "5px" }}
          alt=""
        />
      )
    },
    { name: 'User Name', selector: 'UserName', sortable: true },
    { name: 'Status', selector: row => row.status ? 'Active' : 'In-active', sortable: true },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex flex-wrap gap-1">
          <Link to={`/admin/update-testimonial/${row._id}`}>
            <button className="btn btn-sm btn-outline-primary">Edit</button>
          </Link>
          <button onClick={() => deleteTestimonial(row._id)} className="btn btn-sm btn-outline-dark">Delete</button>
          <button onClick={() => changeStatus(row._id, row.status)} className="btn btn-sm btn-outline-danger">
            Status
          </button>
        </div>
      )
    }
  ];

  const filteredTestimonial = allTestimonial.filter((testimonial) =>
    testimonial.UserName?.toLowerCase().includes(filterText.toLowerCase()) ||
    testimonial.description?.toLowerCase().includes(filterText.toLowerCase())
  );

  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  const handleChange = ({ selectedRows }) => {
    // console.log('Selected Rows: ', selectedRows);
  };

  const headerStyle = {
    backgroundColor: '#f8f9fa',
    fontSize: '18px',
    fontWeight: '600',
    padding: '16px',
  };

  return (
    <>
      <main className="main-container adminbody bg-light py-4">
        <h2 className="text-dark fw-bold text-center">Testimonial List</h2>
        <hr className="w-25 mx-auto" />
        <div className="container py-4">
          <div className="bg-white shadow-sm rounded p-3">
            <div className="row mb-3">
              <div className="col-md-6 d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={filterText}
                  onChange={e => setFilterText(e.target.value)}
                />
                <button
                  className="btn btn-outline-danger"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
              <div className="col-md-6 text-end">
                <CSVLink data={filteredTestimonial} filename="testimonial-data.csv">
                  <button className="btn btn-primary">Download CSV</button>
                </CSVLink>
              </div>
            </div>

            <DataTable
              title="List of Testimonials"
              columns={columns}
              data={filteredTestimonial}
              selectableRows
              onSelectedRowsChange={handleChange}
              progressPending={loading}
              striped
              highlightOnHover
              pagination
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              customStyles={{ header: { style: headerStyle } }}
            />
          </div>
        </div>
      </main>
      <ToastContainer />

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
    </>
  );
}
