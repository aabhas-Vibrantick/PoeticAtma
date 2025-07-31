import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function UserBlogList() {
  const [allBlog, setAllBlog] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [id, setId] = useState(sessionStorage.getItem("_id"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    setId(sessionStorage.getItem("_id"));
    const data = { userId: id };
    apiServices
      .getallblog(data)
      .then((res) => {
        if (res.data.success) {
          setAllBlog(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong"));
  }, [id]);

  const changeStatus = (blogId, currentStatus) => {
    setLoading(true);
    const data = { _id: blogId, status: currentStatus ? "0" : "1" };
    apiServices
      .updateBlogStatus(data)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          apiServices.getallblog({ userId: id }).then((updated) => {
            if (updated.data.success) setAllBlog(updated.data.data);
          });
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong!! Try Again Later");
        setLoading(false);
      });
  };

  const handleClear = () => {
    if (filterText) setFilterText("");
  };

  const filteredBlog = allBlog.filter(
    (blog) =>
      blog.title?.toLowerCase().includes(filterText.toLowerCase()) ||
      blog.blog?.toLowerCase().includes(filterText.toLowerCase()) ||
      blog.Category_id?.Category_name?.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    { name: "S.No.", selector: (_, index) => index + 1, width: "80px" },
    { name: "Title", selector: "title", sortable: true },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={BASE_URL_IMG + row.Image}
          alt="Blog"
          className="img-thumbnail"
          style={{
            height: "70px",
            width: "70px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default_image.jpg";
          }}
        />
      ),
      width: "90px",
    },
    {
      name: "Category",
      selector: (row) => row.Category_id?.Category_name,
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      wrap: true,
      grow: 2,
    },
    {
      name: "Tags",
      selector: "tags",
      wrap: true,
      grow: 1,
    },
    {
      name: "Status",
      selector: (row) => (row.status ? "Active" : "In-active"),
      sortable: true,
      cell: (row) => (
        <span
          className={`badge ${row.status ? "bg-success" : "bg-secondary"} text-light`}
        >
          {row.status ? "Active" : "In-active"}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex flex-wrap gap-1">
          <Link to={`/update-blog/${row._id}`}>
            <button className="btn btn-sm btn-outline-primary">Edit</button>
          </Link>
          <button
            onClick={() => changeStatus(row._id, row.status)}
            className={`btn btn-sm ${
              row.status ? "btn-outline-danger" : "btn-outline-warning"
            }`}
          >
            {row.status ? "Delete" : "Restore"}
          </button>
        </div>
      ),
      width: "240px",
    },
  ];

  return (
    <>
      <style>{`
        .btn-outline-danger { border-width: 2px; }
        .btn-primary { background-color: #0069d9; border: none; }
        .btn-primary:hover { background-color: #0053b3; }
      `}</style>

      <main className="main-container adminbody bg-light py-4">
        <div className="container-fluid">
          <div className="text-center mb-4">
            <h2 className="text-dark fw-bold">My Blog List</h2>
            <hr className="w-25 mx-auto" />
          </div>

          <div className="row align-items-center mb-4">
            <div className="col-md-6 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search blog..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded p-3">
            <DataTable
              title="List of Blog"
              columns={columns}
              data={filteredBlog}
              selectableRows
              progressPending={loading}
              striped
              highlightOnHover
              pagination
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
