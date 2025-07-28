import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Poets() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Totaldashboard, setDashboard] = useState(null);
  const [Totaldashboardtwo, setDashboardtwo] = useState(null);
  const [Totaldashboardthree, setDashboardthree] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeBtn, setActiveBtn] = useState("");

  const override = {
    display: "block",
    position: "absolute",
    top: "25%",
    left: "48%",
    zIndex: "1",
  };

  const fetchData = async () => {
    try {
      const response = await apiServices.getallcustomer();
      if (response.data.success) {
        const filteredUsers = response.data.data.filter(
          (user) => user.userId !== null
        );
        setUsers(filteredUsers);

        const userIds = filteredUsers.map((user) => user.userId._id);

        apiServices.usershayariDash({ userIds }).then((x) => {
          setDashboard(x.data.shayariCounts);
        });

        apiServices.userproseDash({ userIds }).then((x) => {
          setDashboardtwo(x.data.proseCounts);
        });

        apiServices.usersherDash({ userIds }).then((x) => {
          setDashboardthree(x.data.sherCounts);
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 3500);
    fetchData();
  }, []);

  const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);

  const performSearch = (query, isAlpha = false) => {
    const filteredResults = users.filter((user) => {
      const fullName = (user.name + user.penname).toLowerCase();
      return isAlpha
        ? fullName.startsWith(query.toLowerCase()) // For A-Z buttons
        : fullName.includes(query.toLowerCase()); // For full-text search
    });

    setSearchResults(filteredResults);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery === "") setSearchResults(users);
    else performSearch(searchQuery);
  };

  const handleAlphabeticalSearch = (alphabet) => {
    setSearchQuery("");
    setActiveBtn(alphabet);

    if (alphabet === "All") {
      setSearchResults(users); // Show all users
    } else {
      performSearch(alphabet, true); // Filter by first letter
    }
  };

  const renderUserCard = (data) => (
  <div className="col-sm-6 col-md-4 col-lg-3 poetwraper mb-4" key={data._id}>
    <Link
      to={`/poets-profile/${data.userId._id}`}
      className="text-decoration-none text-dark"
    >
      <div className="card poetcard shadow-sm border-0 rounded-4 h-100 card-hover">
        <div className="card-body text-center px-4 py-3">
          <div className="poet-img-wrapper mx-auto mb-3">
            <img
              src={BASE_URL_IMG + (data.Image || "/assets/images/avtar.png")}
              onError={(e) => (e.target.src = "/assets/images/avtar.png")}
              className="rounded-circle img-fluid poet-avatar"
              alt={data.name}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
            <span className="fw-semibold text-capitalize fs-5">{data.name}</span>
            {data.bedgeverify && (
              <img
                src="/quality.png"
                alt="Verified"
                className="badge-icon"
              />
            )}
          </div>
        </div>
        <div className="poetcard-footer d-flex justify-content-around bg-light border-top py-2">
          <div className="text-center">
            <h6 className="mb-1 fw-semibold text-muted">Sher</h6>
            <div className="fw-bold">
              {Totaldashboardthree?.[data.userId._id] || 0}
            </div>
          </div>
          <div className="text-center">
            <h6 className="mb-1 fw-semibold text-muted">Ghazal</h6>
            <div className="fw-bold">
              {Totaldashboard?.[data.userId._id] || 0}
            </div>
          </div>
          <div className="text-center">
            <h6 className="mb-1 fw-semibold text-muted">Prose</h6>
            <div className="fw-bold">
              {Totaldashboardtwo?.[data.userId._id] || 0}
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);


  return (
    <>
      <style>{`.alphabet-btn {
  border-radius: 50px;
  padding: 6px 14px;
  font-size: 14px;
  background: #f7f7f7;
  border: 1px solid #ddd;
  color: #333;
  transition: all 0.25s ease;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.1);
}

.alphabet-btn:hover {
  background: linear-gradient(to right, #ff416c, #ff4b2b);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 65, 108, 0.4);
  transform: translateY(-2px);
}

.active-btn {
  background: linear-gradient(to right, #ff416c, #ff4b2b);
  color: white !important;
  border: none;
  box-shadow: 0 4px 10px rgba(255, 65, 108, 0.4);
}

.inactive-btn {
  background: white;
  color: #333;
  border: 1px solid #ddd;
}

.poet-card {
  background-color: #fff;
  transition: box-shadow 0.3s ease;
  border: 1px solid #eaeaea;
}
.poet-card:hover {
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  text-decoration: none;
}

.poet-avatar {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 2px solid #ddd;
}

.poet-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.poet-bio {
  font-size: 0.9rem;
  line-height: 1.4;
}

.badge-icon {
  width: 20px;
  height: 20px;
}

.poet-card-link {
  text-decoration: none;
  color: inherit;
}

.alphabet-btn {
  border-radius: 50px;
  padding: 6px 16px;
  font-size: 14px;
  background: #f8f9fa;
  border: 1px solid #ccc;
  color: #333;
  transition: all 0.25s ease-in-out;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.05);
}

.alphabet-btn:hover,
.active-btn {
  background: linear-gradient(to right, #ff416c, #ff4b2b);
  color: #fff;
  box-shadow: 0 6px 12px rgba(255, 65, 108, 0.4);
  border: none;
  transform: translateY(-1px);
}

.poetcard {
  background-color: #ffffff;
  transition: all 0.3s ease;
  border-radius: 1rem;
}

.card-hover:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

.card-body {
  background: linear-gradient(to bottom, #6d6b63, #f7f9fb);
  border-radius: 12px 12px 0 0;
}


.poet-avatar {
  width: 170px;
  height: 185px;
  object-fit: cover;
  border: 4px solid #f8d44c;
}

.badge-icon {
  width: 20px;
  height: 20px;
}

.poetcard-footer {
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
  padding: 12px 0;
}

.poetcard-footer h6 {
  font-size: 0.85rem;
  margin-bottom: 4px;
  color: #666;
}

.poetcard-footer .fw-bold {
  font-size: 1rem;
  color: #222; /* Dark enough for visibility */
}
.poetcard-footer {
  opacity: 10.5; /* 0 to 1 scale */
}
  

@media (max-width: 576px) {
  .poet-avatar {
    width: 90px;
    height: 90px;
  }

  .poetcard-footer h6 {
    font-size: 0.75rem;
  }
}


`}</style>
      <ScaleLoader loading={loading} cssOverride={override} size={70} />
      <div className={loading ? "disable-full-screen" : ""}>
        <section className="waviy-body">
          <div className="waviy">
            <h1>
              OUR<span className="px-3">POETS</span>
            </h1>
            <hr className="headinghr" />
          </div>
        </section>

        <section className="searchBar">
          <div className="search-1 ">
            <form onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                required
              />
              <input type="submit" value="." />
            </form>
          </div>
        </section>

        {/* Alphabetical Search UI here */}
        <section className="alphabet-filter d-flex flex-wrap justify-content-center gap-2 my-0 px-3">
          {["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((letter) => (
            <button
              key={letter}
              title={`Show poets starting with "${letter}"`}
              className={`alphabet-btn btn btn-sm fw-semibold ${
                activeBtn === letter ? "active-btn" : "inactive-btn"
              }`}
              onClick={() => handleAlphabeticalSearch(letter)}
            >
              {letter}
            </button>
          ))}
        </section>

        <div className="container my-5">
          <div className="row">
            <div className="col m-3">
              <div className="row">
                {(searchQuery || activeBtn ? searchResults : users).length >
                0 ? (
                  (searchQuery || activeBtn ? searchResults : users).map(
                    renderUserCard
                  )
                ) : (
                  <div className="text-center w-100">
                    <h4 className="text-muted mt-5">No poets found</h4>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
