import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import apiServices from '../../../ApiServices/ApiServices'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function UserOrderlist() {
  const [allOrder, setAllOrder] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [id, setId] = useState(sessionStorage.getItem("_id"));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setId(sessionStorage.getItem("_id"));
    let data = {
      userId: id,
    };
    apiServices.getallorder(data).then(data => {
      if (data.data.success) {
        // console.log("order>>>>>>>>>>>>",data);
        // const filteredShayas = data.data.data.filter((order) => order.status === true);
        // setAllOrder(filteredOrders);
        setAllOrder(data.data.data);
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
    apiServices.updateorderStatus(data).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message);
        apiServices.getallOrder().then(updatedData => {
          if (updatedData.data.success) {
            // const filteredOrders = updatedData.data.data.filter((order) => order.status === true);
            // setAllOrder(filteredOrders);
            setAllOrder(updatedData.data.data);
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
    { name: 'Order Id',  selector: '_id', sortable: true, },
    // { name: 'Book Name', selector: row => row.bookId?.title, sortable: true, },
    // { name: 'Status', selector: row => row.status ? 'Active' : 'In-active', sortable: true, }, 
    { name: 'Status', selector: 'order_status' }, 
    { name: 'Order Price', selector: 'price_per_item', sortable: true, }, 
    { name: 'Order Quantity', selector: 'quantity', sortable: true, }, 
    { name: 'Total', selector: 'sub_total', sortable: true, }, 
    
    {
      name: 'Actions',
      cell: row => (
        <div>
          {/* <Link to={"/admin/update-order/" + row._id}>
            <button className='btn btn-outline-success mx-1 my-1' style={{width:"100px",height:"40px"}} >Edit</button>
          </Link> */}
          
          <button
                className="btn btn-outline-danger mx-1 my-1"
                  onClick={() => changeStatus(row._id, row.status)}
                style={{width:"100px",height:"40px"}}
              >
                delete
              </button>
        </div>
      )
    }
  ];

  const filteredOrder = allOrder.filter(
    order =>
      (order.userId?.name &&
        order.userId?.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (order.bookId?.title &&
        order.bookId.title.toLowerCase().includes(filterText.toLowerCase())) 
     
  );


   // expended function-----
  //  const ExpandedComponent = ({ data }) => (
  //   <pre>{JSON.stringify(data, null, 2)}</pre>
  // );

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
        <h1 className='text-dark'>Order List</h1>
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
              <CSVLink data={filteredOrder} filename="order-data.csv">
                <button className="btn btn-outline-primary float-end">
                  Download CSV
                </button>
              </CSVLink>
            </div> */}
          </div>

          <DataTable
            title="List of Order"
            columns={columns}
            data={filteredOrder}
            selectableRows
            onSelectedRowsChange={handleChange}
            progressPending={loading}
            // clearSelectedRows={toggleCleared}
            striped
            highlightOnHover
            pagination
            // expandableRows
            // expandableRowsComponent={ExpandedComponent}
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

