import { useEffect, useState } from "react";
import apiServices, { BASE_URL_IMG } from "../ApiServices/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { FaBars, FaBlogger, FaFileAlt, FaUser, FaLock, FaList } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

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
  const [totals, setTotals] = useState({ shayari: 0, sher: 0, prose: 0, blog: 0 });
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    window.scrollTo(0, 0);
    setId(sessionStorage.getItem("_id"));

    const data = { userId: id };

    apiServices.getsinglecustomer(data).then((res) => {
      if (res.data.success) {
        setCustomerData(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    }).catch(() => toast.error("Something went wrong"));

    apiServices.dashboard(data).then((res) => {
      setTotals({
        shayari: res.data.usertotal_shayari,
        sher: res.data.usertotal_sher,
        prose: res.data.usertotal_prose,
        blog: res.data.usertotal_blog
      });
    }).catch(() => toast.error("Something went wrong"));
  }, [id]);

  const renderTab = () => {
    switch (viewtab) {
      case 1:
        return (
          <div className="container-fluid">
            <div className="row mt-3">
              <Clock className="col text-start" />
              <h1 className="col text-end">Welcome, <span className="upnametext">{customerData.name}</span></h1>
            </div>
            <div className="row py-3">
              {[
                { title: "Total Sher", count: totals.sher, color: "primary", tab: 7 },
                { title: "Total Shayari", count: totals.shayari, color: "success", tab: 8 },
                { title: "Total Prose", count: totals.prose, color: "danger", tab: 9 },
                { title: "Total Blog", count: totals.blog, color: "warning", tab: 6 }
              ].map((item, i) => (
                <div className="col-md-3 mb-3" key={i}>
                  <div className={`card border-${item.color}`}>
                    <div className={`card-header bg-${item.color} text-white`}>{item.title}</div>
                    <div className="card-body">
                      <h3 className="card-title">{item.count}</h3>
                      <button className={`btn btn-${item.color}`} onClick={() => setTabview(item.tab)}>View {item.title}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 2: return <UserAddBlog />;
      case 3: return <UserAddSher />;
      case 4: return <UserAddShayari />;
      case 5: return <UserAddProse />;
      case 6: return <UserBlogList />;
      case 7: return <UserSherList />;
      case 8: return <UserShayariList />;
      case 9: return <UserProseList />;
      case 10: return <UserOrderlist />;
      case 11:
        return (
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-4 text-center">
                <img src={BASE_URL_IMG + customerData.Image} alt="Profile" className="img-fluid rounded-circle mb-3" />
                <h4>{customerData.name}</h4>
                <p>{customerData.bio}</p>
              </div>
              <div className="col-md-8">
                <h5>Profile Info</h5>
                <ul className="list-group"> 
                  {[
                    { label: "Full Name", value: customerData.name },
                    { label: "Pen Name", value: customerData.penname },
                    { label: "Email", value: customerData.email },
                    { label: "Contact", value: customerData.contact },
                    { label: "Address", value: customerData.address },
                    { label: "Facebook", value: customerData.facebook },
                    { label: "Instagram", value: customerData.instagram },
                    { label: "LinkedIn", value: customerData.linkdin },
                    { label: "Twitter", value: customerData.twiter },
                  ].map((item, i) => (
                    <li key={i} className="list-group-item d-flex justify-content-between">
                      <strong>{item.label}</strong><span>{item.value || "-"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      default: return <div>Invalid Tab</div>;
    }
  };

  return (
    <div className="admin_main-container d-flex">
      <motion.div
        animate={{ width: isOpen ? "200px" : "60px" }}
        className="admin_sidebar bg-light text-white p-2 vh-100"
      >
        <div className="admin_top_section d-flex justify-content-between align-items-center">
          {isOpen && <h5 className="admin_logo">User Panel</h5>}
          <FaBars onClick={toggleSidebar} className="cursor-pointer" />
        </div>
        <ul className="nav flex-column mt-4">
          {routes.map((item, index) => (
            <li key={index} className={`nav-item ${viewtab === item.tab ? "bg-secondary" : ""}`}> 
              <button
                className="nav-link btn text-start text-black w-100 d-flex align-items-center"
                onClick={() => setTabview(item.tab)}
                style = {{ fontSize : "15px" }}
              >
                <span className="me-2">{item.icon}</span>
                {isOpen && item.name}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
      <div className="flex-grow-1 p-3">
        {renderTab()}
      </div>
      <ToastContainer />
    </div>
  );
}
