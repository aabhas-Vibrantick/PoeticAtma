import axios from "axios";

// const BASE_URL = "https://api.poeticatma.com/admin/";
// export const BASE_URL_IMG = "https://api.poeticatma.com/";

// Change this temporarily while developing
const isProduction = window.location.hostname !== "localhost";

const BASE_URL = isProduction
  ? "http://89.116.32.160:8000/admin/"
  : "http://localhost:8000/admin/";

export const BASE_URL_IMG = isProduction
  ? "http://89.116.32.160:8000/"
  : "http://localhost:8000/";


class apiServices {
  register(data) {
    return axios.post(BASE_URL + "register", data);
  }

  adduser(data) {
    return axios.post(BASE_URL + "adduser", data);
  }

  updateCustomerProfile(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateCustomerProfile", data, { headers: header });
  }


  verifyEmail(data) {
    return axios.post(BASE_URL + "verifyMail", data);
  }

  login(data) {
    return axios.post(BASE_URL + "login", data);
  }

  contact(data) {
    return axios.post(BASE_URL + "contact", data);
  }

  getallcontacts(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallcontacts", data, { headers: header });
  }

  forgotPassword(data) {
    return axios.post(BASE_URL + "forgotPassword", data);
  }

  resetPassword(data) {
    return axios.post(BASE_URL + "resetPassword", data);
  }

  usershayariDash(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "usershayariDash", data, { headers: header });
  }

  usersherDash(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "usersherDash", data, { headers: header });
  }

  userproseDash(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "userproseDash", data, { headers: header });
  }

  addBook(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "addBook", data, { headers: header });
  }

  getallBook(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallBook", data, { headers: header });
  }

  getsingleBook(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsingleBook", data, { headers: header });
  }

  updateBook(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateBook", data, { headers: header });
  }

  updatebookStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updatebookStatus", data, { headers: header });
  }

  addTestimonial(data) {
    const header = { 
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "addTestimonial", data, { headers: header });
  }

  getallTestimonial(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallTestimonial", data, {
      headers: header,
    });
  }

  getsingleTestimonial(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsingleTestimonial", data, {
      headers: header,
    });
  }

  updateTestimonial(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateTestimonial", data, {
      headers: header,
    });
  }

  updatetestimonialStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updatetestimonialStatus", data, {
      headers: header,
    });
  }

  placeorder(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "placeorder", data, { headers: header });
  }

  getallorder(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallorder", data, { headers: header });
  }

  getsingleOrder(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsingleOrder", data, { headers: header });
  }

  deleteorder(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "deleteorder", data, { headers: header });
  }

  updateOrderStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateOrderStatus", data, {
      headers: header,
    });
  }

  dashboard(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "dashboard", data, { headers: header });
  }

  changeContactStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "changeContactStatus", data, {
      headers: header,
    });
  }

  changepassword(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "changepassword", data, { headers: header });
  }

  changeStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "changeStatus", data, { headers: header });
  }

  getsinglecustomer(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsinglecustomer", data, {
      headers: header,
    });
  }

  getallcustomer(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallcustomer", data, { headers: header });
  }

  getTop10Customers(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getTop10Customers", data, {
      headers: header,
    });
  }

  getsingleuser(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsingleuser", data, { headers: header });
  }

  deletecustomer(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "deletecustomer", data, { headers: header });
  }

  updateuser(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateuser", data, { headers: header });
  }

  // ------blog---------------
  addcategory(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "addcategory", data, { headers: header });
  }

  getallcategory(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallcategory", data, { headers: header });
  }

  getsingle_category(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsingle_category", data, {
      headers: header,
    }); 
  }

  updatecategory(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updatecategory", data, { headers: header });
  }

  deletecategory(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "deletedata", data, { headers: header });
  }

  updateBlogCategoryStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateBlogCategoryStatus", data, {
      headers: header,
    });
  }

  addblog(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "addblog", data, { headers: header });
  }

  getsingleblog(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsingleblog", data, { headers: header });
  }

  getallblog(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    }; 

    return axios.get(BASE_URL + "getallblog", {
      headers: {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    },
});
;
  }

  getallblogbyUserId(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallblogbyUserId", data, {
      headers: header,
    });
  }

  latestBlog(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "latestBlog", data, { headers: header });
  }

  updateblog(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateblog", data, { headers: header });
  }

  deleteblog(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "deleteblog", data, { headers: header });
  }

  updateBlogStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateBlogStatus", data, { headers: header });
  }

  getFeaturedBlogs(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getFeaturedBlogs", data, { headers: header });
  }

  getFeaturedSher(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getFeaturedSher", data, { headers: header });
  }

  getTopShayari(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getFeaturedShayari", data, {
      headers: header,
    });
  }

  getTopProse(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getFeaturedProse", data, {
      headers: header,
    });
  }

  getBlogsByCategory(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getBlogsByCategory", data, {
      headers: header,
    });
  }

  // ----------blog router end--------
  // ----------prose router start--------
  add_prose_category(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "add_prose_category", data, {
      headers: header,
    });
  }

  getall_prose_category(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getall_prose_category", data, {
      headers: header,
    });
  }

  getsingle_prose_category(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsingle_prose_category", data, {
      headers: header,
    });
  }

  update_prose_category(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "update_prose_category", data, {
      headers: header,
    });
  }

  delete_prose_data(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "delete_prose_data", data, {
      headers: header,
    });
  }

  updateProseCategoryStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateProseCategoryStatus", data, {
      headers: header,
    });
  }

  addprose(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "addprose", data, { headers: header });
  }

  getallprose(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallprose", data, { headers: header });
  }

  getsingleprose(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsingleprose", data, { headers: header });
  }

  getallprosebyUserId(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallprosebyUserId", data, {
      headers: header,
    });
  }

  updateprose(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateprose", data, { headers: header });
  }

  latestProse(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "latestProse", data, { headers: header });
  }

  deleteprose(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "deleteprose", data, { headers: header });
  }

  getPopularProse(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getPopularProse", data, { headers: header });
  }

  getBestProse(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getBestProse", data, { headers: header });
  }

  getProseByCategory(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getProseByCategory", data, {
      headers: header,
    });
  }

  getproseByHindi(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getproseByHindi", data, { headers: header });
  }

  gethindiProseByUserId(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "gethindiProseByUserId", data, {
      headers: header,
    });
  }

  getproseByEnglish(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getproseByEnglish", data, {
      headers: header,
    });
  }

  getenglishProseByUserId(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getenglishProseByUserId", data, {
      headers: header,
    });
  }

  updateProseStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateProseStatus", data, {
      headers: header,
    });
  }

  // ----------prose router end--------
  // ----------Shayari router start--------
  add_shayari_category(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "add_shayari_category", data, {
      headers: header,
    });
  }

  getall_shayari_category(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getall_shayari_category", data, {
      headers: header,
    });
  }

  getsingle_shayari_category(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsingle_shayari_category", data, {
      headers: header,
    });
  }

  update_shayari_category(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "update_shayari_category", data, {
      headers: header,
    });
  }

  delete_shayari_data(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "delete_shayari_data", data, {
      headers: header,
    });
  }

  updateShayariCategoryStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateShayariCategoryStatus", data, {
      headers: header,
    });
  }

  addshayari(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "addshayari", data, { headers: header });
  }

  getallshayari(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallshayari", data, { headers: header });
  }

  getallshayaribyUserId(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallshayaribyUserId", data, {
      headers: header,
    });
  }

  latestShayari(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "latestShayari", data, { headers: header });
  }

  getsingleshayari(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsingleshayari", data, { headers: header });
  }

  updateshayari(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateshayari", data, { headers: header });
  }

  deleteshayari(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "deleteshayari", data, { headers: header });
  }

  getPopularShayari(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getPopularShayari", data, {
      headers: header,
    });
  }

  getBestShayari(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getBestShayari", data, { headers: header });
  }

  getShayariByCategory(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getShayariByCategory", data, {
      headers: header,
    });
  }

  getByLanguage(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getByLanguage", data, { headers: header });
  }

  gethindiShayariByUserId(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "gethindiShayariByUserId", data, {
      headers: header,
    });
  }

  getByEnglish(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getByEnglish", data, { headers: header });
  }

  getenglishShayariByUserId(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getenglishShayariByUserId", data, {
      headers: header,
    });
  }

  updateShayariStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateShayariStatus", data, {
      headers: header,
    });
  }

  // ----------Shayari router end--------
  // ----------sher router start--------
  add_sher_category(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "add_sher_category", data, {
      headers: header,
    });
  }

  getall_sher_category(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getall_sher_category", data, {
      headers: header,
    });
  }

  getsingle_sher_category(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsingle_sher_category", data, {
      headers: header,
    });
  }

  update_sher_category(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "update_sher_category", data, {
      headers: header,
    });
  }

  delete_sher_data(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "delete_sher_data", data, { headers: header });
  }

  updateSherCategoryStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateSherCategoryStatus", data, {
      headers: header,
    });
  }

  addsher(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "addsher", data, { headers: header });
  }

  getallsher(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallsher", data, { headers: header });
  }

  latestSher(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "latestSher", data, { headers: header });
  }

  getsinglesher(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsinglesher", data, { headers: header });
  }

  getallsherbyUserId(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallsherbyUserId", data, {
      headers: header,
    });
  }

  gethindiSherByUserId(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "gethindiSherByUserId", data, {
      headers: header,
    });
  }

  getenglishSherByUserId(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getenglishSherByUserId", data, {
      headers: header,
    });
  }

  updatesher(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updatesher", data, { headers: header });
  }

  deletesher(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "deletesher", data, { headers: header });
  }

  getPopularSher(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getPopularSher", data, { headers: header });
  }

  getBestSher(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getBestSher", data, { headers: header });
  }

  getSherByCategory(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getSherByCategory", data, {
      headers: header,
    });
  }

  getsherByHindi(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsherByHindi", data, { headers: header });
  }

  getsherByEnglish(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getsherByEnglish", data, { headers: header });
  }

  updateSherStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateSherStatus", data, { headers: header });
  }
  // ----------sher router end--------

  // ------------------Only Image router start-------------------
  // -------prose image router start----
  addProseImage(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "addProseImage", data, { headers: header });
  }

  getallProseImage(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallProseImage", data, { headers: header });
  }

  updateProseImageStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateProseImageStatus", data, {
      headers: header,
    });
  }

  // -------sher image router start----
  addSherImage(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "addSherImage", data, { headers: header });
  }

  getallSherImage(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallSherImage", data, { headers: header });
  }

  updateSherImageStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateSherImageStatus", data, {
      headers: header,
    });
  }

  // -------shayari image router start----
  addShayariImage(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "addShayariImage", data, { headers: header });
  }

  getallShayariImage(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getallShayariImage", data, {
      headers: header,
    });
  }

  updateShayariImageStatus(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "updateShayariImageStatus", data, {
      headers: header,
    });
  }

  // ------------------Only Image router end-------------------

  // ---------FOLLOW/UNFOLLOW------------
  followUser(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "followUser", data, { headers: header });
  }

  getFollowersForUser(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getFollowersForUser", data, {
      headers: header,
    });
  }

  unfollowUser(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "unfollowUser", data, { headers: header });
  }

  getFollowingForUser(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getFollowingForUser", data, {
      headers: header,
    });
  }

  getFollowCountsForUser(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getFollowCountsForUser", data, {
      headers: header,
    });
  }

  // ========================Blog Like/Unlike==============================
  BlogLike(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "BlogLike", data, { headers: header });
  }

  BlogUnLike(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "BlogUnLike", data, { headers: header });
  }

  getLikeCountForBlog(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getLikeCountForBlog", data, {
      headers: header,
    });
  }

  // =================prose like/unlike==========

  ProseLike(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "ProseLike", data, { headers: header });
  }

  ProseUnLike(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "ProseUnLike", data, { headers: header });
  }

  getLikeCountForProse(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getLikeCountForProse", data, {
      headers: header,
    });
  }

  // =================shayari like/unlike==========
  ShayariLike(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "ShayariLike", data, { headers: header });
  }

  ShayariUnLike(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "ShayariUnLike", data, { headers: header });
  }

  getLikeCountForShayari(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getLikeCountForShayari", data, {
      headers: header,
    });
  }

  // =================shayari like/unlike==========
  SherLike(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "SherLike", data, { headers: header });
  }

  SherUnLike(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "SherUnLike", data, { headers: header });
  }

  getLikeCountForSher(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getLikeCountForSher", data, {
      headers: header,
    });
  }

  // =================== blog cemment=====================
  createblogComment(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "createblogComment", data, {
      headers: header,
    });
  }

  getAllComments(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getAllComments", data, { headers: header });
  }

  // ======prose comment========
  createproseComment(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "createproseComment", data, {
      headers: header,
    });
  }

  getAllproseComments(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getAllproseComments", data, {
      headers: header,
    });
  }

  // ======shayari comment========
  createshayariComment(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "createshayariComment", data, {
      headers: header,
    });
  }

  getAllshayariComments(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getAllshayariComments", data, {
      headers: header,
    });
  }

  // ======sher comment========
  createsherComment(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "createsherComment", data, {
      headers: header,
    });
  }

  getAllsherComments(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getAllsherComments", data, {
      headers: header,
    });
  }

  // ==================blogreply================
  createReply(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "createReply", data, { headers: header });
  }

  getAllReplies(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getAllReplies", data, { headers: header });
  }

  // ============prosereply==========
  createProseReply(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "createProseReply", data, { headers: header });
  }

  getAllproseReplies(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getAllproseReplies", data, {
      headers: header,
    });
  }

  // ============shayari reply==========
  createShayariReply(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "createShayariReply", data, {
      headers: header,
    });
  }

  getAllshayariReplies(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getAllshayariReplies", data, {
      headers: header,
    });
  }

  // ============sher reply==========
  createSherReply(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "createShayariReply", data, {
      headers: header,
    });
  }

  getAllsherReplies(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "getAllshayariReplies", data, {
      headers: header,
    });
  }

  blogincrementPageView(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "blogincrementPageView", data, {
      headers: header,
    });
  }

  bloggetPageViewCount(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "bloggetPageViewCount", data, {
      headers: header,
    });
  }

  shayariincrementPageView(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "shayariincrementPageView", data, {
      headers: header,
    });
  }

  shayarigetPageViewCount(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "shayarigetPageViewCount", data, {
      headers: header,
    });
  }

  sherincrementPageView(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "sherincrementPageView", data, {
      headers: header,
    });
  }

  shergetPageViewCount(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "shergetPageViewCount", data, {
      headers: header,
    });
  }

  proseincrementPageView(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "proseincrementPageView", data, {
      headers: header,
    });
  }

  prosegetPageViewCount(data) {
    const header = {
      Accept: "application/json",
      Authorization: sessionStorage.getItem("token"),
    };

    return axios.post(BASE_URL + "prosegetPageViewCount", data, {
      headers: header,
    });
  }
}

export default new apiServices();
