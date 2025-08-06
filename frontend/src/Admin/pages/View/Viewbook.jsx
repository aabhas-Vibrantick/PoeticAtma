import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import apiServices, { BASE_URL_IMG } from '../../../ApiServices/ApiServices';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Booklist() {
  const [allBook, setAllBook] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    apiServices.getallBook()
      .then(data => {
        if (data.data.success) {
          setAllBook(data.data.data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong"));
  }, []);

  const deleteBook = (id) => {
    apiServices.deleteBook({ _id: id })
      .then(data => {
        if (data.data.success) {
          toast.success(data.data.message);
          apiServices.getallBook().then(updated => {
            if (updated.data.success) setAllBook(updated.data.data);
          });
        } else {
          toast.error(data.data.message);
        }
      });
  };

  const changeStatus = (id, status) => {
    setLoading(true);
    const data = { _id: id, status: status ? '0' : '1' };
    apiServices.updatebookStatus(data)
      .then(res => {
        if (res.data.success) {
          toast.success(res.data.message);
          apiServices.getallBook().then(updated => {
            if (updated.data.success) setAllBook(updated.data.data);
          });
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error('Something went wrong!! Try Again Later');
        setLoading(false);
      });
  };

  const handleClear = () => filterText && setFilterText('');

  const filteredBook = allBook.filter(book =>
    book.title.toLowerCase().includes(filterText.toLowerCase()) ||
    (book.author && book.author.toLowerCase().includes(filterText.toLowerCase())) ||
    (book.bookcategory && book.bookcategory.toLowerCase().includes(filterText.toLowerCase())) ||
    (book.Book_Price && book.Book_Price.toLowerCase().includes(filterText.toLowerCase()))
  );

  const columns = [
    { name: 'S.No.', selector: (_, index) => index + 1, width: '80px' },
    { name: 'Title', selector: 'title', sortable: true },
    {
      name: 'Image',
      cell: row => (
        <img
          src={BASE_URL_IMG + row.Image}
          className="img-thumbnail"
          style={{
            height: "70px",
            width: "70px",
            objectFit: "cover",
            borderRadius: "8px"
          }}
          alt="Book"
        />
      ),
      width: "90px"
    },
    { name: 'Category', selector: row => row.bookcategory, sortable: true },
    { name: 'Author', selector: row => row.author, sortable: true },
    {
      name: 'Status',
      cell: row => (
        <span className={`badge ${row.status ? "bg-success" : "bg-secondary"} text-light`}>
          {row.status ? "Active" : "Inactive"}
        </span>
      ),
      sortable: true
    },
    { name: 'Price', selector: 'Book_Price', sortable: true },
    { name: 'Quantity', selector: 'Book_Quantity', sortable: true },
    { name: 'Payment Option', selector: 'Payment_option', sortable: true },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex flex-wrap gap-1">
          <Link to={`/admin/update-book/${row._id}`}>
            <button className="btn btn-sm btn-outline-primary">Edit</button>
          </Link>
          <button
            onClick={() => deleteBook(row._id)}
            className="btn btn-sm btn-outline-danger"
          >
            Delete
          </button>
          <button
            onClick={() => changeStatus(row._id, row.status)}
            className="btn btn-sm btn-outline-warning"
          >
            {row.status ? "Deactivate" : "Activate"}
          </button>
        </div>
      ),
      width: "280px"
    }
  ];

  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

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
            <h2 className="text-dark fw-bold">Book List</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search book..."
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
              <CSVLink data={filteredBook} filename="book-data.csv">
                <button className="btn btn-primary">Download CSV</button>
              </CSVLink>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="List of Books"
              columns={columns}
              data={filteredBook}
              selectableRows
              onSelectedRowsChange={({ selectedRows }) => {}}
              progressPending={loading}
              striped
              highlightOnHover
              pagination
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              customStyles={{
                header: {
                  style: {
                    fontSize: "18px",
                    fontWeight: "600",
                    backgroundColor: "#f8f9fa",
                    padding: "16px",
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
