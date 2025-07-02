import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import { ToastContainer, toast } from "react-toastify";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { Link } from "react-router-dom";

function AllUserList() {
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");

//   ---------get data Api-----------
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiServices.getallcustomer();
      if (response.data.success) {
        setUsers(response.data.data);
        // console.log(response.data.data)
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // console.error(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  // const data = { _id: id };
  
 
// -------------delete api--------
  const deleteuser = (id) => {
    const data = { _id: id };
    apiServices.deletecustomer(data).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message);
        fetchData();
      } else {
        toast.error(response.data.message);
      }
    }).catch((error) => {
      // console.error(error);
    });
  };

  // -------------change Status api--------
  const changeStatus = (id, status) => {
    setLoading(true);
    const upstatus = status ? '0' : '1';
    const data = {
      _id: id ,
      status: upstatus,
    };
   
    apiServices.changeStatus(data).then((response) => {
      if (response.data.success) {
        
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
      fetchData();
    }).catch((error) => {
   
      toast.error('Something went wrong!! Try Again Later');
      setLoading(false);
    });
  };


  // --------toast selection function----
  const handleChange = ({ selectedRows }) => {
   
    // console.log('Selected Rows: ', selectedRows);
  };

  // -----colom data-----
  const columns = [
    { name: "Sr No.", selector: (_, index) => index + 1, sortable: true },
    // {
    //   name: "User Id",
    //   selector: (row) => row.userId._id,
    //   sortable: true,
    // },
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={BASE_URL_IMG + row.Image}
          alt=""
          style={{ height: "150px", width: "150px" }}
        />
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.contact,
      sortable: true,
    },
    { name: 'Status', selector: row => row.userId?.status ? 'Active' : 'In-active' },
    {
      name: "Action",
      cell: (row) => (
        <>
          <div className="d-flex flex-column">
            <div>
              <Link to={`/admin/admin-profile/${row.userId?._id}`}>
                <button className="btn btn-outline-success mx-1 my-1" 
                style={{width:"100px",height:"40px"}}>
                  Edit
                </button>
              </Link>
            </div>
            <div>
              <button
                className="btn btn-outline-danger mx-1 my-1"
                onClick={() => deleteuser(row._id)}
                style={{width:"100px",height:"40px"}}
              >
                Delete
              </button>
            </div>
            <div>
              <button
                className="btn btn-outline-danger mx-1 my-1"
                  onClick={() => changeStatus(row.userId._id, row.userId.status)}
                style={{width:"100px",height:"40px"}}
              >
                Status
              </button>
            </div>
          </div>
        </>
      ),
    },
  ];

  // expended function-----
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  //  filter function--
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filterText.toLowerCase()) ||
      (user.email &&
        user.email.toLowerCase().includes(filterText.toLowerCase())) ||
      (user.contact &&
        typeof user.contact === "string" &&
        user.contact.toLowerCase().includes(filterText.toLowerCase())) ||
      (user.address &&
        user.address.toLowerCase().includes(filterText.toLowerCase())) ||
      (user.userId &&
        user.userId._id &&
        user.userId._id.toLowerCase().includes(filterText.toLowerCase()))
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
        <div className="container  table-responsive py-5">
      <div className="row my-3 ">
        <div className="col-5 d-flex justify-center items-center gap-1 ">
          <input
            type="text"
            className="form-control "
            placeholder="Search"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
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
        <div className="col-7 ">
          <CSVLink data={filteredUsers} filename="user-data.csv">
            <button className="btn btn-outline-primary float-end">Download CSV</button>
          </CSVLink>
        </div>
      </div>

      <DataTable
      title="Desserts"
        columns={columns}
        data={filteredUsers}
        progressPending={loading}
        defaultSortFieldId={3}
        selectableRows
        onSelectedRowsChange={handleChange}
        clearSelectedRows={toggleCleared}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
        fixedHeader
        customStyles={{
          header: {
            style: headerStyle,
          },
        }}
        // fixedHeaderScrollHeight="700px"
      />
</div>
      </main>
      {/* </div> */}
      <ToastContainer />
    </>
  );
}

export default AllUserList;
