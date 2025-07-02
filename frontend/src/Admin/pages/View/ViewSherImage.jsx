import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices'
import { toast, ToastContainer } from 'react-toastify'

export default function SherImageList() {
  const [allSher, setAllSher] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    apiServices.getallSherImage().then(data => {
      if (data.data.success) {
     
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
    apiServices.updateSherImageStatus(data).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message);
        apiServices.getallSherImage().then(updatedData => {
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
    { name: 'Title', selector: 'title', sortable: true, },
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
    { name: 'Category', selector: row => row.Category_id?.Category_name, sortable: true, },

    { name: 'Status', selector: row => row.status ? 'Active' : 'In-active', sortable: true, }, 
    { name: 'Tag', selector: 'tags', sortable: true,width: '300px' }, 
    {
      name: 'Actions',
      width: '200px',
      cell: row => (
        <div>
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



  const filteredShers = allSher.filter(
    (shers) =>
    shers.title.toLowerCase().includes(filterText.toLowerCase()) ||
      (shers.userId?.name &&
        shers.userId?.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (shers.Category_id?.Category_name &&
        shers.Category_id?.Category_name.toLowerCase().includes(filterText.toLowerCase())) 
     
      
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
              <CSVLink data={filteredShers} filename="sher-data.csv">
                <button className="btn btn-outline-primary float-end">
                  Download CSV
                </button>
              </CSVLink>
            </div>
          </div>

          <DataTable
            title="List of Sher Image"
            columns={columns}
            data={filteredShers}
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

