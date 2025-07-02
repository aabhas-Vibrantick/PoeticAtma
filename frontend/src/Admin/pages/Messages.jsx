import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import { ToastContainer, toast } from "react-toastify";
import apiServices from "../../ApiServices/ApiServices";


function Messages() {
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [allmessage, setMessage] = useState([]);
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
      const response = await apiServices.getallcontacts();
      if (response.data.success) {
        setMessage(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // console.error(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
  };




  // -------------change Status api--------
  const changeStatus = (id, status) => {
    setLoading(true);
    const upstatus = status ? '0' : '1';
    const data = {
      _id: id,
      status: upstatus,
    };
    apiServices.changeContactStatus(data).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
      fetchData();
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

  // -----colom data-----
  const columns = [
    { name: "Sr No.", selector: (_, index) => index + 1, sortable: true },
    
    {
      name: "Name",
      selector:"name",
      sortable: true,
    },
   
    {
      name: "Email",
      width:"200px",
      selector: "email",
      sortable: true,
    },
    {
      name: "Subject",
      width:"200px",
      selector: (row) => row.subject,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.contact,
      sortable: true,
    },
    {
      name: "Message",
      width:"auto",
      selector: (row) => row.message,
      sortable: true,
    },
    { name: 'Status', selector: row => row.status ? 'Active' : 'In-active' , sortable: true,}, 
    {
      name: "Action",
      cell: (row) => (
        <>
          <div className="d-flex flex-column">
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
        </>
      ),
    },
  ];

 

  //  filter function--
  const filteredMessages = allmessage.filter(
    (msg) =>
    msg.name.toLowerCase().includes(filterText.toLowerCase()) ||
      (msg.email &&
        msg.email.toLowerCase().includes(filterText.toLowerCase())) ||
      (msg.contact &&
        typeof msg.contact === "string" &&
        msg.contact.toLowerCase().includes(filterText.toLowerCase())) ||
      (msg.message &&
        msg.message.toLowerCase().includes(filterText.toLowerCase())) 
      
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
          <CSVLink data={filteredMessages} filename="msg-data.csv">
            <button className="btn btn-outline-primary float-end">Download CSV</button>
          </CSVLink>
        </div>
      </div>

      <DataTable
      title="Desserts"
        columns={columns}
        data={filteredMessages}
        progressPending={loading}
        defaultSortFieldId={3}
        selectableRows
        onSelectedRowsChange={handleChange}
        clearSelectedRows={toggleCleared}
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

export default Messages;

