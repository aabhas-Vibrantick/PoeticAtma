import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
// import { CSVLink } from 'react-csv';
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function UserSherList() {
  const [allSher, setAllSher] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [id, setId] = useState(sessionStorage.getItem("_id"));
  const [loading, setLoading] = useState(true);
  const parse = require("html-react-parser");
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
    setId(sessionStorage.getItem("_id"));
    let data = {
      userId: id,
    };
    apiServices.getallsher(data).then(data => {
      if (data.data.success) {
        // const filteredShers = data.data.data.filter((sher) => sher.status === true);
        // setAllSher(filteredShers);
        setAllSher(data.data.data);
      } else {
        toast.error(data.data.message);
      }
    }).catch(err => {
      // // console.log(err);
      toast.error("Something went wrong");
    });
  }, []);

  const changeStatus = (id, status) => {
    setLoading(true);
    const upstatus = status ? '0' : '1';
    const data = {
      _id: id,
      status: upstatus,
    };
    apiServices.updateSherStatus(data).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message);
        apiServices.getallsher().then(updatedData => {
          if (updatedData.data.success) {
            setAllSher(updatedData.data.data);
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
    { name: 'Title', selector: 'title' },
    {
      name: 'Image',
      selector: row => (
        <img
          src={BASE_URL_IMG + row.Image}
          className="img-fluid"
          style={{ height: "150px", width: "200px" }}
          alt=""
        />
      ),width: '300px'
    },
    { name: 'Category', selector: row => row.Category_id?.Category_name,width: '300px' },
    // { name: 'Sher', selector: 'sher', wrap: true },
    { name: 'Sher', selector: row => parse(row.sher), width: '400px', wrap: true},
    { name: 'Tags', selector: 'tags', wrap: true,width: '300px' },
    { name: 'Status', selector: row => row.status ? 'Active' : 'In-active', sortable: true,width: '200px' }, 
    {
      name: 'Actions',
      cell: row => (
        <div>
          <Link to={"/update-sher/" + row._id}>
            <button className='btn btn-outline-success mx-1 my-1' style={{width:"100px",height:"40px"}}>Edit</button>
          </Link>
          <button
                className="btn btn-outline-danger mx-1 my-1"
                  onClick={() => changeStatus(row._id, row.status)}
                style={{width:"100px",height:"40px"}}
              >
                Delete
              </button>
        </div>
      )
    }
  ];

  const filteredSher = allSher.filter(
    sher =>
    sher.title.toLowerCase().includes(filterText.toLowerCase()) ||
      (sher.Category_id?.Category_name &&
        sher.Category_id.Category_name.toLowerCase().includes(filterText.toLowerCase())) ||
        sher.sher.toLowerCase().includes(filterText.toLowerCase())
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
              <CSVLink data={filteredSher} filename="sher-data.csv">
                <button className="btn btn-outline-primary float-end">
                  Download CSV
                </button>
              </CSVLink>
            </div> */}
          </div>

          <DataTable
            title="List of Sher"
            columns={columns}
            data={filteredSher}
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

