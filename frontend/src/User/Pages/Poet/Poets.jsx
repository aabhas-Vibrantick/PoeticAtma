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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeBtn, setActiveBtn] = useState('');

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
        const filteredUsers = response.data.data.filter(user => user.userId !== null);
        setUsers(filteredUsers);

        const userIds = filteredUsers.map(user => user.userId._id);

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

  const performSearch = (query) => {
    const filteredResults = users.filter((user) => {
      const fullName = user.name + user.penname;
      return fullName.toLowerCase().includes(query.toLowerCase());
    });
    setSearchResults(filteredResults);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery === '') setSearchResults(users);
    else performSearch(searchQuery);
  };

  const handleAlphabeticalSearch = (alphabet) => {
    setActiveBtn(alphabet);
    performSearch(alphabet);
  };

  const renderUserCard = (data) => {
    if (!data.userId || !data.userId._id) return null;

    return (
      <div className="col-lg-3 poetwraper" key={data._id}>
        <Link to={`/poets-profile/${data.userId._id}`}>
          <div className="card poetcard poetbg-primary card-hover poetmb-9">
            <div className="card-body text-center px-md-5 px-lg-5 my-2">
              <div className="card-icon-border-large poetborder-primary mtn-80">
                <img
                  src={BASE_URL_IMG + (data.Image || "/assets/images/avtar.png")}
                  className=" img-fluid imgz"
                  alt="img..."
                  onError={(e) => { e.target.src = "/assets/images/avtar.png"; }}
                />
              </div>
            </div>
            <div className="blockquote pt-2 d-flex justify-content-center">
              <div className="text-center poetcard-name fw-bold text-capitalize">
                @{data.name}
                {data.bedgeverify && (
                  <img
                    src="/quality.png"
                    alt="Verified Badge"
                    className="badgeimagz"
                  />
                )}
              </div>
            </div>
            <div className="poetcard-footer d-flex justify-content-around">
              {Totaldashboardthree && (
                <div className="text-center"><h5>Sher</h5>{Totaldashboardthree[data.userId._id] || 0}</div>
              )}
              <div className="poetcard-footer-border"></div>
              {Totaldashboard && (
                <div className="text-center"><h5>Ghazal</h5>{Totaldashboard[data.userId._id] || 0}</div>
              )}
              <div className="poetcard-footer-border"></div>
              {Totaldashboardtwo && (
                <div className="text-center"><h5>Prose</h5>{Totaldashboardtwo[data.userId._id] || 0}</div>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <>
      <ScaleLoader loading={loading} cssOverride={override} size={70} />
      <div className={loading ? "disable-full-screen" : ""}>
        <section className="waviy-body">
          <div className="waviy">
            <h1>OUR<span className="px-3">POETS</span></h1>
            <hr className="headinghr" />
          </div>
        </section>

        <section className="searchBar">
          <div className="search-1 ">
            <form onSubmit={handleSearch}>
              <input type="search" placeholder="Search" value={searchQuery} onChange={handleSearchQueryChange} required />
              <input type="submit" value="." />
            </form>
          </div>
        </section>

        {/* Alphabetical Search UI here */}

        <div className="container my-5">
          <div className="row">
            <div className="col m-3">
              <div className="row">
                {(searchResults.length > 0 ? searchResults : users).map(renderUserCard)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
