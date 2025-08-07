import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function BlogList() {
  const parse = require('html-react-parser');
  const [allBlog, setAllBlog] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    apiServices.getallblog().then(data => {
      if (data.data.success) {
        const filteredBlogs = data.data.data.filter((blog) => blog.status === true);
        setAllBlog(filteredBlogs);
      } else {
        toast.error(data.data.message);
      }
    }).catch(err => {
      toast.error('Something went wrong');
    });
  }, []);

  const deleteBlog = (id) => {
    let data = {
      _id: id
    };
    apiServices.deleteblog(data).then(data => {
      if (data.data.success) {
        toast.success(data.data.message);
        apiServices.getallblog().then(updatedData => {
          if (updatedData.data.success) {
            const filteredBlogs = updatedData.data.data.filter((blog) => blog.status === true);
            setAllBlog(filteredBlogs);
          }
        });
      } else {
        toast.error(data.data.message);
      }
    }).catch(err => {
      toast.error('Something went wrong');
    });
  };

  const changeStatus = (id, status) => {
    setLoading(true);
    const upstatus = status ? '0' : '1';
    const data = {
      _id: id,
      status: upstatus,
    };
    apiServices.updateBlogStatus(data).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message);
        apiServices.getallblog().then(updatedData => {
          if (updatedData.data.success) {
            const filteredBlogs = updatedData.data.data.filter((blog) => blog.status === true);
            setAllBlog(filteredBlogs);
          }
        });
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    }).catch((error) => {
      toast.error('Something went wrong!! Try Again Later');
      setLoading(false);
    });
  };

  const handleClear = () => {
    if (filterText) {
      setFilterText('');
    }
  };

  const columns = [
    { name: 'S.No.', selector: (_, index) => index + 1, width: '80px' },
    { name: 'Title', selector: 'title', sortable: true, width: '300px' },
    { 
      name: 'Description', 
      selector: 'description', 
      sortable: true, 
      wrap: true, 
      width: '300px' 
    },
    {
      name: 'Image',
      cell: row => (
        <img
          src={BASE_URL_IMG + row.Image}
          className="img-thumbnail"
          style={{
            height: '70px',
            width: '70px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
          alt="Blog"
        />
      ),
      width: '90px',
    },
    { 
      name: 'Category', 
      selector: row => row.Category_id?.Category_name, 
      sortable: true, 
      width: '150px' 
    },
    { 
      name: 'Author', 
      selector: row => row.userId?.name || 'Unknown', 
      sortable: true, 
      width: '150px' 
    },
    { 
      name: 'Status', 
      selector: row => row.status ? 'Active' : 'In-active', 
      sortable: true,
      cell: row => (
        <span
          className={`badge ${row.status ? 'bg-success' : 'bg-secondary'} text-light`}
        >
          {row.status ? 'Active' : 'In-active'}
        </span>
      ),
      width: '120px' 
    },
    { 
      name: 'Is Featured', 
      selector: row => row.isFeatured ? 'Yes' : 'No', 
      sortable: true,
      cell: row => (
        <span
          className={`badge ${row.isFeatured ? 'bg-success' : 'bg-secondary'} text-light`}
        >
          {row.isFeatured ? 'Yes' : 'No'}
        </span>
      ),
      width: '120px' 
    },
    // { 
    //   name: 'Tags', 
    //   selector: 'tags', 
    //   sortable: true, 
    //   wrap: true, 
    //   width: '150px' 
    // },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex flex-wrap gap-1">
          <Link to={`/admin/update-blog/${row._id}`}>
            <button className="btn btn-sm btn-outline-primary">Edit</button>
          </Link>
          <button
            onClick={() => deleteBlog(row._id)}
            className="btn btn-sm btn-outline-danger"
          >
            Delete
          </button>
          <button
            onClick={() => changeStatus(row._id, row.status)}
            className={`btn btn-sm ${row.status ? 'btn-outline-danger' : 'btn-outline-warning'}`}
          >
            {row.status ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      ),
      width: '280px',
    }
  ];

  const filteredBlog = allBlog.filter(
    blog =>
      blog.title.toLowerCase().includes(filterText.toLowerCase()) ||
      (blog.userId?.name &&
        blog.userId?.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (blog.Category_id?.Category_name &&
        blog.Category_id.Category_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (blog.description &&
        blog.description.toLowerCase().includes(filterText.toLowerCase()))
  );

  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  const handleChange = ({ selectedRows }) => {
    // console.log('Selected Rows: ', selectedRows);
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
            <h2 className="text-dark fw-bold">Blog List</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search blog..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
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
              <CSVLink data={filteredBlog} filename="blog-data.csv">
                <button className="btn btn-primary">Download CSV</button>
              </CSVLink>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="List of Blogs"
              columns={columns}
              data={filteredBlog}
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