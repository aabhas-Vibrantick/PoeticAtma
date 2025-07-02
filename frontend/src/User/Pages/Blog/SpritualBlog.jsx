import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import apiServices, { BASE_URL_IMG } from "../../../ApiServices/ApiServices";
import { toast, ToastContainer } from "react-toastify";
import { format } from 'date-fns';
export default function SpritualBlog() {
  const [byCategory, setByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

      const categoryId = '685d26044ff4fafd36c38024'; 
      apiServices.getBlogsByCategory({ Category_id: categoryId })
      .then(data => {
        // // console.log("...........", data)
        if (data.data.success) {
          
          const filteredBlogs = data.data.data.filter((blog) => blog.status === true);
          setByCategory(filteredBlogs);
          // // console.log(data);
        } else {
          toast.error(data.data.message);
        }
      })
      .catch(error => {
        // console.error('Error:', error);
      });
  }, [loading]);


  return (
    <>
          <div  className="row" >
                {byCategory.map((data, index) => (
                <div className="col-lg-6 main-blogcard">
            <div className="homeblog-card">
            <Link to={"/single-blog/" + `${data?._id}`}> <img src={BASE_URL_IMG + data?.Image} alt="Blog Image 1" /></Link>
              <div className="homeblog-info">
        <Link to={"/single-blog/" + `${data?._id}`}>  <h2 className="text-start">{data?.title}</h2>
                <p className="blog-content-box">{data?.description}</p>
                <div className="homedate-time">
                  {/* <span className="date">{format(new Date(data.created_at), 'MMMM d, yyyy')}</span> */}
                  {/* <span className="time">10:00 AM</span> */}
                </div>
                </Link>
                <div className="homesocial-icons">
                  <a href="#"><i className="fab fa-facebook"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
              
              </div>
            </div>
          </div>
           ))}
          </div>

      <ToastContainer />
    </>
  );
}
