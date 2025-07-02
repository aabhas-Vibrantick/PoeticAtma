import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
// import { CSVLink } from 'react-csv';
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function UserBlogList() {
  const [allBlog, setAllBlog] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [id, setId] = useState(sessionStorage.getItem("_id"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
    setId(sessionStorage.getItem("_id"));
    let data = {
      userId: id,
    };
    apiServices.getallblog(data).then(data => {
      if (data.data.success) {
        // const filteredBlogs = data.data.data.filter((blog) => blog.status === true);
        // setAllBlog(filteredBlogs);
        setAllBlog(data.data.data)
      } else {
        toast.error(data.data.message);
      }
    }).catch(err => {
      toast.error("Something went wrong");
    });
  }, [allBlog]);

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
            // setAllBlog(updatedData.data.data);
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
    { name: 'SNo.', selector: (_, index) => index + 1 },
    {
      name: 'Title',
      selector: 'title',

    },
    {
      name: 'Image',
      cell: row => (
        <img
          src={BASE_URL_IMG + row.Image}
          className="img-fluid"
          style={{ height: "150px", width: "150px" }}
          alt=""
        />
      )
    },
    { name: 'Category', selector: row => row.Category_id?.Category_name, width: '264px' },
    { name: 'Description', selector: 'description', wrap: true, width: '384px' },
    { name: 'Tags', selector: 'tags', wrap: true, width: '300px' },
    { name: 'Status', selector: row => row.status ? 'Active' : 'In-active', sortable: true, width: '164px' },
    // { name: 'User ID', selector: 'userId' }, // Add User ID column
    // { name: 'Status', selector: 'status' }, 
    {
      name: 'Actions',
      cell: row => (
        <div>
          <Link to={"/update-blog/" + row._id}>
            <button className='btn btn-outline-success mx-0 my-1' style={{ width: "80px", height: "40px" }}>Edit</button>
          </Link>
          <button
            className="btn btn-outline-danger mx-0 my-1"
            onClick={() => changeStatus(row._id, row.status)}
            style={{ width: "80px", height: "40px" }}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  const filteredBlog = allBlog.filter(
    blog =>
      blog.title.toLowerCase().includes(filterText.toLowerCase()) ||
      (blog.Category_id?.Category_name &&
        blog.Category_id.Category_name.toLowerCase().includes(filterText.toLowerCase())) ||
      blog.blog.toLowerCase().includes(filterText.toLowerCase())
  );

  // --------toast selection function----
  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    // console.log('Selected Rows: ', selectedRows);
  };

  const headerStyle = {
    backgroundColor: '#ffcc00',
    color: 'white',
    fontWeight: 'bold',
  };


  return (
    <>
      <main className="main-container adminbody">
        <div className="container table-responsive py-5">
          <div className="row my-3">
            <div className="col-5 d-flex justify-center items-center gap-1">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
              />
              <button
                className="btn btn-danger"
                type="button"
                style={{ width: "100px", height: "38px" }}
                onClick={handleClear}
              >
                X
              </button>
            </div>
            {/* <div className="col-7">
              <CSVLink data={filteredBlog} filename="blog-data.csv">
                <button className="btn btn-outline-primary float-end">
                  Download CSV
                </button>
              </CSVLink>
            </div> */}
          </div>

          <DataTable
            title="List of Blog"
            columns={columns}
            data={filteredBlog}
            selectableRows
            progressPending={loading}
            onSelectedRowsChange={handleChange}
            // clearSelectedRows={toggleCleared}
            striped
            highlightOnHover
            pagination
            customStyles={{
              header: {
                style: headerStyle,
              },
            }}
          />
        </div>
      </main>
      <ToastContainer />
    </>
  )
}

