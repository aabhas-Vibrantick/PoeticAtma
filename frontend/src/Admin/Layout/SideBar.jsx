import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser,FaUserPlus, FaBook } from "react-icons/fa";
import { MdMessage, MdRateReview } from "react-icons/md";
import {  BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import {  AiTwotoneFileExclamation } from "react-icons/ai";
import { GiNotebook, GiBookshelf } from "react-icons/gi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    class:"activeadmin",
    path: "/admin",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    class:"activeadmin",
    path: "/admin/order-list",
    name: "Order List",
    icon: <AiTwotoneFileExclamation />,
  },
  {
    name: "Users",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "/admin/add-user",
        name: "Add  User ",
        icon: <FaUserPlus />,
      },
      {
        path: "/admin/all-users",
        name: "Manage Users",
        icon: <FaUser />,
      },
    ],
  },
  {
    name: "Books",
    icon: <FaBook />,
    subRoutes: [
      {
        path: "/admin/add-book",
        name: "Add Book ",
        icon: <GiNotebook />,
      },
      {
        path: "/admin/book-list",
        name: "Manage Book",
        icon: <GiBookshelf />,
      },
    ],
  },
  {
    name: "Testimonials",
    icon: <MdRateReview />,
    subRoutes: [
      {
        path: "/admin/add-testimonial",
        name: "Add Testimonial ",
        icon: <GiNotebook />,
      },
      {
        path: "/admin/testimonial-list",
        name: "Manage Testimonial",
        icon: <GiBookshelf />,
      },
    ],
  },
 
  {
    path: "/file-manager",
    name: "Pending",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/admin/pendding-viewblog",
        name: "Blog ",
        icon: <AiTwotoneFileExclamation />,
      },
      {
        path: "/admin/pendding-viewshayari",
        name: "Shayari ",
        icon: <AiTwotoneFileExclamation />,
      },
      {
        path: "/admin/pendding-viewsher",
        name: "Sher",
        icon: <AiTwotoneFileExclamation />,
      },
      {
        path: "/admin/pendding-viewprose",
        name: "prose",
        icon: <AiTwotoneFileExclamation />,
      },
    ],
  },
 
  {
    name: "Shayari Image",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      
      {
        path: "/admin/add-shayariImage",
        name: "Upload  Image",
        icon: <FaMoneyBill />,
      },
      {
        path: "/admin/view-shayariImage",
        name: "Manage Image",
        icon: <FaMoneyBill />,
      },
     
    ],
  },
  {
    name: "Sher Image",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      
      {
        path: "/admin/add-sherImage",
        name: "Upload  Image",
        icon: <FaMoneyBill />,
      },
      {
        path: "/admin/view-sherImage",
        name: "Manage Image",
        icon: <FaMoneyBill />,
      },
     
    ],
  },
  {
    name: "Prose Image",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      
      {
        path: "/admin/add-proseImage",
        name: "Upload  Image",
        icon: <FaMoneyBill />,
      },
      {
        path: "/admin/view-proseImage",
        name: "Manage Image",
        icon: <FaMoneyBill />,
      },
     
    ],
  },

  {
    name: "Blog Category",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/admin/add-blogcategory",
        name: "Add  Category ",
        icon: <FaUser />,
      },
      {
        path: "/admin/view-blogcategory",
        name: "Manage  Category ",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    name: "Shayari Category",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/admin/add-shayaricategory",
        name: "Add  Category ",
        icon: <FaUser />,
      },
      {
        path: "/admin/view-shayaricategory",
        name: "Manage  Category",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    name: "Sher Category",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/admin/add-shercategory",
        name: "Add  Category ",
        icon: <FaUser />,
      },
      {
        path: "/admin/view-shercategory",
        name: "Manage  Category",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    name: "Prose Category",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/admin/add-prosecategory",
        name: "Add  Category ",
        icon: <FaUser />,
      },
      {
        path: "/admin/view-prosecategory",
        name: "Manage  Category",
        icon: <FaMoneyBill />,
      },
    ],
  },
  
  {
    name: "Blog",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
     
      {
        path: "/admin/add-blog",
        name: "Add Blog",
        icon: <FaMoneyBill />,
      },
      {
        path: "/admin/view-blog",
        name: "Manage Blog  ",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    name: "Shayari",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
     
      {
        path: "/admin/add-shayari",
        name: "Add Shayari",
        icon: <FaMoneyBill />,
      },
      {
        path: "/admin/view-shayari",
        name: "Manage Shayari ",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    name: "Sher",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
     
      {
        path: "/admin/add-sher",
        name: "Add Sher",
        icon: <FaMoneyBill />,
      },
      {
        path: "/admin/view-sher",
        name: "Manage Sher ",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    name: "Prose",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
     
      {
        path: "/admin/add-prose",
        name: "Add Prose",
        icon: <FaMoneyBill />,
      },
      {
        path: "/admin/view-prose",
        name: "Manage Prose ",
        icon: <FaMoneyBill />,
      },
    ],
  },
 
  {
    path: "/admin/all-message",
    name: "Messages",
    icon: <MdMessage />,
  },
 
  // {
  //   path: "/settings",
  //   name: "Settings",
  //   icon: <BiCog />,
  //   exact: true,
  //   subRoutes: [
  //     {
  //       path: "/settings/profile",
  //       name: "Profile ",
  //       icon: <FaUser />,
  //     },
  //     {
  //       path: "/settings/2fa",
  //       name: "2FA",
  //       icon: <FaLock />,
  //     },
  //     {
  //       path: "/settings/billing",
  //       name: "Billing",
  //       icon: <FaMoneyBill />,
  //     },
  //   ],
  // },

];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="admin_main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`admin_sidebar `}
        >
          <div className="admin_top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="admin_logo"
                >
                  POETIC ATMA
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="admin_bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="admin_search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="admin_routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="admin_link"
                  activeClassName="admin_active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="admin_link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
