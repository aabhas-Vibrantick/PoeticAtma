import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import apiServices from '../../../ApiServices/ApiServices'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function SherCategoryList() {
  const [allCategory, setAllCategory] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
    apiServices.getall_sher_category().then(data => {
      if (data.data.success) {
        setAllCategory(data.data.data);
      } else {
        toast.error(data.data.message);
      }
    }).catch(err => {
      // // console.log(err);
      toast.error("Something went wrong");
    });
  }, []);

  const deleteCategory = (id) => {
    let data = {
      _id: id
    };
    apiServices.delete_sher_data(data).then(data => {
      if (data.data.success) {
        toast.success(data.data.message);
        apiServices.getall_sher_category().then(updatedData => {
          if (updatedData.data.success) {
            setAllCategory(updatedData.data.data);
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
    apiServices.updateSherCategoryStatus(data).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message);
        apiServices.getall_sher_category().then(updatedData => {
          if (updatedData.data.success) {
            setAllCategory(updatedData.data.data);
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
  // --------toast selection function----
  const handleChange = ({ selectedRows }) => {
   
    // console.log('Selected Rows: ', selectedRows);
  };

  const columns = [
    { name: 'SNo.', selector: (_, index) => index + 1 },
    { name: 'Category Name', selector: 'Category_name', sortable: true, },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex flex-column">
          <Link to={"/admin/up-shercategory/" + row._id}>
            <button className='btn btn-outline-success mx-1 my-1'  style={{width:"100px",height:"40px"}}>Edit</button>
          </Link>
          <button onClick={() => deleteCategory(row._id)} className='btn btn-outline-dark mx-1 my-1'  style={{width:"100px",height:"40px"}}>Delete</button>
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

  const filteredCategory = allCategory.filter(
    category => category.Category_name.toLowerCase().includes(filterText.toLowerCase())
  );

   // clear filter function
   const handleClear = () => {
    if (filterText) {
      setFilterText("");
    }
  };

  const headerStyle = {
    backgroundColor: '#ffcc00',
    color: 'white', 
    fontWeight: 'bold',
  };
  return (
    <>
      <main className="main-container adminbody">
        <h1>Sher Category List</h1>
        <div className="container col-10 table-responsive py-5">
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
              <CSVLink data={filteredCategory} filename="sher-category-data.csv">
                <button className="btn btn-outline-primary float-end">
                  Download CSV
                </button>
              </CSVLink>
            </div>
          </div>

          <DataTable
            title="Sher Category List"
            columns={columns}
            data={filteredCategory}
            progressPending={loading}
            striped
            highlightOnHover
            pagination
            selectableRows
            onSelectedRowsChange={handleChange}
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
