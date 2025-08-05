import { useEffect, useState } from "react";
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserViewDashboard from "../User/Pages/UserDashboard/UserViewDashboard";
import UserAddSher from "../User/Pages/UserAddPages/UserAddSher";
import UserAddShayari from "../User/Pages/UserAddPages/userAddShayari";
import UserAddProse from "../User/Pages/UserAddPages/UserAddProse";
import UserAddBlog from "../User/Pages/UserAddPages/UserAddBlog";
import UserBlogList from "../User/Pages/UserDataPages/UserViewBlog";
import UserSherList from "../User/Pages/UserDataPages/UserViewSher";
import UserProseList from "../User/Pages/UserDataPages/UserViewProse";
import UserShayariList from "../User/Pages/UserDataPages/UserViewShayari";
import UserOrderlist from "../User/Pages/UserDataPages/UVieworders";
import Clock from "../Admin/pages/Clock";
import { FaBars, FaBlogger, FaFileAlt, FaUser, FaList } from "react-icons/fa";
import { motion } from "framer-motion";
import UserProfileTab from "../Components/UserProfileTab";

const routes = [
  { tab: 1, name: "Dashboard", icon: <FaList /> },
  { tab: 2, name: "Publish Blog", icon: <FaBlogger /> },
  { tab: 3, name: "Publish Sher", icon: <FaFileAlt /> },
  { tab: 4, name: "Publish Shayari", icon: <FaFileAlt /> },
  { tab: 5, name: "Publish Prose", icon: <FaFileAlt /> },
  { tab: 6, name: "My Blog", icon: <FaBlogger /> },
  { tab: 7, name: "My Sher", icon: <FaFileAlt /> },
  { tab: 8, name: "My Shayari", icon: <FaFileAlt /> },
  { tab: 9, name: "My Prose", icon: <FaFileAlt /> },
  { tab: 10, name: "My Orders", icon: <FaList /> },
  { tab: 11, name: "Profile", icon: <FaUser /> },
];

export default function UserDashboard() {
  const [id, setId] = useState(sessionStorage.getItem("_id"));
  const [customerData, setCustomerData] = useState({});
  const [viewtab, setTabview] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const [totals, setTotals] = useState({
    shayari: 0,
    sher: 0,
    prose: 0,
    blog: 0,
    approvedSher: 0,
    pendingSher: 0,
    approvedShayari: 0,
    pendingShayari: 0,
    approvedProse: 0,
    pendingProse: 0,
    approvedBlog: 0,
    pendingBlog: 0,
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    window.scrollTo(0, 0);
    setId(sessionStorage.getItem("_id"));

    const data = { userId: sessionStorage.getItem("_id") };

    apiServices
      .getsinglecustomer(data)
      .then((res) => {
        if (res.data.success) {
          setCustomerData(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Something went wrong"));

    apiServices
      .dashboard(data)
      .then((res) => {
        const d = res.data;
        setTotals({
          shayari: d.usertotal_shayari || 0,
          sher: d.usertotal_sher || 0,
          prose: d.usertotal_prose || 0,
          blog: d.usertotal_blog || 0,

          approvedSher: (d.usertotal_sher || 0) - (d.total_penddingsher || 0),
          pendingSher: d.total_penddingsher || 0,

          approvedShayari: (d.usertotal_shayari || 0) - (d.total_penddingshayari || 0),
          pendingShayari: d.total_penddingshayari || 0,

          approvedProse: (d.usertotal_prose || 0) - (d.total_penddingprose || 0),
          pendingProse: d.total_penddingprose || 0,

          approvedBlog: (d.usertotal_blog || 0) - (d.total_penddingblog || 0),
          pendingBlog: d.total_penddingblog || 0,
        });
      })
      .catch(() => toast.error("Something went wrong"));
  }, []);

  const renderTab = () => {
    switch (viewtab) {
      case 1:
        return (
          <UserViewDashboard
            totals={totals}
            customerData={customerData}
            setTabview={setTabview}
          />
        );
      case 2:
        return <UserAddBlog />;
      case 3:
        return <UserAddSher />;
      case 4:
        return <UserAddShayari />;
      case 5:
        return <UserAddProse />;
      case 6:
        return <UserBlogList />;
      case 7:
        return <UserSherList />;
      case 8:
        return <UserShayariList />;
      case 9:
        return <UserProseList />;
      case 10:
        return <UserOrderlist />;
      case 11:
        return <UserProfileTab customerData={customerData} />;
      default:
        return <div>Invalid Tab</div>;
    }
  };

 return (
  <>
    <style>{`
      .admin_main-container {
        font-family: 'Segoe UI', sans-serif;
        background-color: #f4f5f7;
        min-height: 100vh;
      }

      .admin_sidebar {
        width: 240px;
        background-color: #000000ff;
        color: white;
        padding: 20px 10px;
      }

      .admin_top_section {
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 20px;
        border-bottom: 1px solid #374151;
        text-align: center;
        color: white;
      }

      .sidebar-item {
        margin: 10px 0;
        border-radius: 6px;
        transition: background-color 0.3s;
      }

      .sidebar-item:hover {
        background-color: #374151;
      }

      .sidebar-item button {
        border: none;
        background: none;
        color: white;
        text-align: left;
        width: 100%;
        padding: 10px 15px;
        font-size: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .active-tab {
        background-color: #2563eb;
      }

      .active-tab button {
        font-weight: bold;
      }

      @media (max-width: 768px) {
        .admin_sidebar {
          width: 100%;
          display: flex;
          flex-direction: row;
          overflow-x: auto;
          padding: 10px;
        }

        .admin_top_section {
          display: none;
        }

        .sidebar-item button {
          font-size: 14px;
          justify-content: center;
          padding: 8px;
        }
      }
    `}</style>

    <div className="admin_main-container d-flex">
      {/* Sidebar */}
      <div className="admin_sidebar">
        <div className="admin_top_section">User Panel</div>
        <ul className="nav flex-column mt-3">
          {routes.map((item, index) => (
            <li
              key={index}
              className={`nav-item sidebar-item ${
                viewtab === item.tab ? "active-tab" : ""
              }`}
            >
              <button
                className="nav-link btn text-white"
                onClick={() => setTabview(item.tab)}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-3 bg-light w-100">
        {renderTab()}
      </div>

      <ToastContainer />
    </div>
  </>
);

}
