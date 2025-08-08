import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import apiServices from '../../../ApiServices/ApiServices';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function ShayariCategoryList() {
  const [allCategory, setAllCategory] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiServices.getall_shayari_category()
      .then(data => {
        if (data.data.success) {
          setAllCategory(data.data.data);
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

  const deleteCategory = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This category will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        apiServices.delete_shayari_data({ _id: id })
          .then(data => {
            if (data.data.success) {
              toast.success(data.data.message);
              setAllCategory(prev => prev.filter(cat => cat._id !== id));
              Swal.fire('Deleted!', 'The category has been deleted.', 'success');
            } else {
              Swal.fire('Error!', data.data.message || 'Failed to delete', 'error');
            }
          })
          .catch(() => {
            Swal.fire('Error!', 'Failed to delete category', 'error');
          });
      }
    });
  };

  const changeStatus = (id, status) => {
    setLoading(true);
    const upstatus = status ? '0' : '1';
    apiServices.updateShayariCategoryStatus({ _id: id, status: upstatus })
      .then(response => {
        if (response.data.success) {
          toast.success(response.data.message);
          setAllCategory(prev =>
            prev.map(cat =>
              cat._id === id ? { ...cat, status: !status } : cat
            )
          );
        } else {
          toast.error(response.data.message);
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
    { name: 'Category Name', selector: 'Category_name', sortable: true, grow: 2 },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: (row) => (
        <span className={`badge ${row.status ? 'bg-primary' : 'bg-danger'} text-light`}>
          {row.status ? 'Active' : 'Inactive'}
        </span>
      ),
      width: '100px',
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex flex-wrap gap-2">
          <Link to={`/admin/up-shayaricategory/${row._id}`}>
            <button
              className="btn btn-sm btn-outline-warning"
              title="Edit"
              style={{ minWidth: '90px' }}
            >
              <FaEdit />
            </button>
          </Link>

          <button
            onClick={() => changeStatus(row._id, row.status)}
            className={`btn btn-sm ${row.status ? 'btn-outline-warning' : 'btn-outline-success'}`}
            title={row.status ? 'Set Inactive' : 'Set Active'}
            style={{ minWidth: '90px' }}
          >
            {row.status ? <FaToggleOn /> : <FaToggleOff />}
          </button>

          <button
            onClick={() => deleteCategory(row._id)}
            className="btn btn-sm btn-outline-danger"
            title="Delete"
            style={{ minWidth: '90px' }}
          >
            <FaTrash />
          </button>
        </div>
      ),
      width: '400px',
    },
  ];

  const filteredCategory = allCategory.filter(category =>
    category.Category_name.toLowerCase().includes(filterText.toLowerCase())
  );

  const headerStyle = {
    backgroundColor: '#ffcc00',
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <>
      <main className="main-container adminbody bg-light py-4">
        <div className="container-fluid col-10">
          <div className="text-center mb-4">
            <h2 className="text-dark fw-bold">Shayari Category List</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search categories..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
              />
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={handleClear}
                style={{ minWidth: '90px' }}
              >
                Clear
              </button>
            </div>
            <div className="col-md-6 text-end">
              <CSVLink data={filteredCategory} filename="shayari-category-data.csv">
                <button className="btn btn-primary">Download CSV</button>
              </CSVLink>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="List of Shayari Categories"
              columns={columns}
              data={filteredCategory}
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
