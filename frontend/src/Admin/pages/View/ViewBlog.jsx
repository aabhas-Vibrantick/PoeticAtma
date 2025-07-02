import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function BlogList() {
  const parse = require("html-react-parser");
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
        // setAllBlog(data.data.data);
      } else {
        toast.error(data.data.message);
      }
    }).catch(err => {
      // // console.log(err);
      toast.error("Something went wrong");
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
            // setAllBlog(updatedData.data.data);
          }
        });
      } else {
        toast.error(data.data.message);
      }
    }).catch(err => {
      // // console.log(err);
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
            // setAllBlog(updatedData.data.data);
          }
        });
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    }).catch((error) => {
      // console.error(error);
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
    { name: 'SNo.', selector: (_, index) => index + 1 ,width: '100px'},
    { name: 'Title', selector: 'title', sortable: true,width: '400px',height:"400px" },
    { name: 'Description', selector: 'description', sortable: true,width: '400px',height:"400px" },
    {
      name: 'Image',
      width: '300px',
      cell: row => (
        <img
          src={BASE_URL_IMG + row.Image}
          className="img-fluid"
          style={{ height: "150px", width: "150px" }}
          alt=""
        />
        
      )
    },
    { name: 'Category', selector: row => row.Category_id?.Category_name, sortable: true,width: '200px' },
    // {
    //   name: 'Blog',
    //   selector: row => parse(row.blog), // Replace row.blog with your actual function logic
    //   wrap: true,
    //   width: '900px',
    //   height:"200px"
    // },
    { name: 'Author', selector: row => row.userId?.name, sortable: true,width: '200px' }, // Add User ID column
    { name: 'Status', selector: row => row.status ? 'Active' : 'In-active', sortable: true,width: '200px' }, 
    { name: 'Is Future Blog', selector: row => row.isFeatured ? 'Active' : 'In-active' , sortable: true,width: '200px' }, 
    { name: 'Tag', selector: 'tags', sortable: true,width: '300px' }, 
    {
      name: 'Actions',
      width: '200px',
      cell: row => (
        <div className="d-flex flex-column">
            <div>
            <Link to={"/admin/update-blog/" + row._id}>
            <button className='btn btn-outline-success mx-1 my-1' style={{width:"100px",height:"40px"}}>Edit</button>
          </Link>
            </div>
            <div>
            <button onClick={() => deleteBlog(row._id)} className='btn btn-outline-dark mx-1 my-1' style={{width:"100px",height:"40px"}}>Delete</button>
            </div>
            <div>
            <button
                className="btn btn-outline-danger mx-1 my-1"
                  onClick={() => changeStatus(row._id, row.status)}
                style={{width:"100px",height:"40px"}}
              >
                Status
              </button>
            </div>
          </div>
      )
    }
  ];

  const filteredBlog = allBlog.filter(
    blog =>
      blog.title.toLowerCase().includes(filterText.toLowerCase()) ||
      (blog.userId?.name &&
        blog.userId?.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (blog.Category_id?.Category_name &&
        blog.Category_id.Category_name.toLowerCase().includes(filterText.toLowerCase())) ||
      blog.blog.toLowerCase().includes(filterText.toLowerCase())
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
    backgroundColor: '#ffcc00',
    color: 'white', 
    fontWeight: 'bold',
  };
  return (
    <>
      <main className="main-container adminbody">
        <h1 className='text-dark'>Blog List</h1>
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
            <div className="col-7">
              <CSVLink data={filteredBlog} filename="blog-data.csv">
                <button className="btn btn-outline-primary float-end">
                  Download CSV
                </button>
              </CSVLink>
            </div>
          </div>

          <DataTable
            title="List of Blog"
            columns={columns}
            data={filteredBlog}
            selectableRows
            onSelectedRowsChange={handleChange}
            progressPending={loading}
            // clearSelectedRows={toggleCleared}
            striped
            highlightOnHover
            pagination
            expandableRows
            expandableRowsComponent={ExpandedComponent}
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

