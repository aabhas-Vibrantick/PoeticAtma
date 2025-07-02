import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Testimoniallist() {
  const [allTestimonial, setAllTestimonial] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    apiServices.getallTestimonial().then(data => {
      if (data.data.success) {
        // const filteredShayas = data.data.data.filter((testimonial) => testimonial.status === true);
        // setAllTestimonial(filteredTestimonials);
        setAllTestimonial(data.data.data);
      } else {
        toast.error(data.data.message);
      }
    }).catch(err => {
      // // console.log(err);
      toast.error("Something went wrong");
    });
  }, []);

  const deleteTestimonial = (id) => {
    let data = {
      _id: id
    };
    apiServices.deleteTestimonial(data).then(data => {
      if (data.data.success) {
        toast.success(data.data.message);
        apiServices.getallTestimonial().then(updatedData => {
          if (updatedData.data.success) {
            // const filteredTestimonials = updatedData.data.data.filter((testimonial) => testimonial.status === true);
            // setAllTestimonial(filteredTestimonials);
            setAllTestimonial(updatedData.data.data);
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
    apiServices.updatetestimonialStatus(data).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message);
        apiServices.getallTestimonial().then(updatedData => {
          if (updatedData.data.success) {
            // const filteredTestimonials = updatedData.data.data.filter((testimonial) => testimonial.status === true);
            // setAllTestimonial(filteredTestimonials);
            setAllTestimonial(updatedData.data.data);
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
    { name: 'SNo.', selector: (_, index) => index + 1 },
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
     { name: 'User Name', selector: 'UserName', sortable: true, }, 
    //  { name: 'Description', selector: 'description' }, 
    { name: 'Status', selector: row => row.status ? 'Active' : 'In-active', sortable: true,
   }, 
   
    {
      name: 'Actions',
      cell: row => (
        <div>
          <Link to={"/admin/update-testimonial/" + row._id}>
            <button className='btn btn-outline-success mx-1 my-1' style={{width:"100px",height:"40px"}} >Edit</button>
          </Link>
          <button onClick={() => deleteTestimonial(row._id)} className='btn btn-outline-dark mx-1 my-1' style={{width:"100px",height:"40px"}}>Delete</button>
          <button
                className="btn btn-outline-danger mx-1 my-1"
                  onClick={() => changeStatus(row._id, row.status)}
                style={{width:"100px",height:"40px"}}
              >
                Status
              </button>
        </div>
      )
    }
  ];

  const filteredTestimonial = allTestimonial.filter(
    testimonial =>
    testimonial.UserName.toLowerCase().includes(filterText.toLowerCase()) ||
        testimonial.description.toLowerCase().includes(filterText.toLowerCase())
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
        <h1 className='text-dark'>Testimonial List</h1>
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
              <CSVLink data={filteredTestimonial} filename="testimonial-data.csv">
                <button className="btn btn-outline-primary float-end">
                  Download CSV
                </button>
              </CSVLink>
            </div>
          </div>

          <DataTable
            title="List of Testimonial"
            columns={columns}
            data={filteredTestimonial}
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

