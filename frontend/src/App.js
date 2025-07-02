import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import HomeMaster from "./Layouts/HomeMaster";
import Login from "./Authentication/Login";
import Contact from "./Components/Contact";
import Register from "./Authentication/Register";
import PrivateRoute from "./Components/PrivateRoute";
import BlogCategoryList from "./Admin/pages/View/BlogCategory";
import ProseCategoryList from "./Admin/pages/View/ProseCtegory";
import ShayariCategoryList from "./Admin/pages/View/ShayariCategory";
import SherCategoryList from "./Admin/pages/View/SherCategory";

import BlogList from "./Admin/pages/View/ViewBlog";
import SherList from "./Admin/pages/View/ViewSher";
import ShayariList from "./Admin/pages/View/ViewShayari";
import ProseList from "./Admin/pages/View/ViewProse";

import AllUserList from "./Admin/pages/View/AllUser";
import Poets from "./User/Pages/Poet/Poets";
import AdminHome from "./Admin/pages/AdminHome";
import AdminMaster from "./Admin/Layout/AdminMaster";
import Blog from "./User/Pages/Blog/Blog";
import Singleblog from "./User/Pages/Blog/Single-blog";
import Porfile from "./Components/Profile";
import Useruprofile from "./Layouts/UserProfile";
import ProseImage from "./User/Pages/Prose/ProseImage";
import ShayariImage from "./User/Pages/Shayari/ShayariImage";
import Sher from "./User/Pages/Sher/Sher";
import Shayari from "./User/Pages/Shayari/Shayari";
import Prose from "./User/Pages/Prose/Prose";
import SherImage from "./User/Pages/Sher/SherImage";
import AddShayari from "./Admin/pages/Add/AddShayari";
import AddProse from "./Admin/pages/Add/AddProse";
import AddBlog from "./Admin/pages/Add/AddBlog";
import AddSher from "./Admin/pages/Add/AddSher";
import UpBlogCategory from "./Admin/pages/Update/blogCategoryUp";
import UpProseCategory from "./Admin/pages/Update/ProseCategoryUp";
import UpShayariCategory from "./Admin/pages/Update/ShayariCategoryUp";
import UpSherCategory from "./Admin/pages/Update/SherCategoryUp";
import UpBlog from "./Admin/pages/Update/BlogUp";
import UpProse from "./Admin/pages/Update/ProseUp";
import UpShayari from "./Admin/pages/Update/ShayariUp";
import UpSher from "./Admin/pages/Update/SherUp";
import Hindisher from "./User/Pages/Sher/HindiSher";
import Englishsher from "./User/Pages/Sher/EnglishSher";
import Top20sher from "./User/Pages/Sher/Top20sher";
import Occasionsher from "./User/Pages/Sher/Occasion";
import Bestsher from "./User/Pages/Sher/Bestsher";
import Hindishayari from "./User/Pages/Shayari/HindiShayari";
import Englishshayari from "./User/Pages/Shayari/EnglishShayari";
import Top20shayari from "./User/Pages/Shayari/Top20shayari";
import Occasionshayari from "./User/Pages/Shayari/OccasionShayari";
import Bestshayari from "./User/Pages/Shayari/Bestshayari";
import Hindiprose from "./User/Pages/Prose/HindiProse";
import Englishprose from "./User/Pages/Prose/EnglishProse";
import Top20prose from "./User/Pages/Prose/Top20prose";
import Occasionprose from "./User/Pages/Prose/OccasionProse";
import Bestprose from "./User/Pages/Prose/Bestprose";
import Singleprose from "./User/Pages/Prose/Single prose";
import SingleShayari from "./User/Pages/Shayari/SingleShayari";
import SingleSher from "./User/Pages/Sher/SingleSher";
import Messages from "./Admin/pages/Messages";
import UserSetting from "./Admin/pages/Update/UserSetting";
import PenddingBlogList from "./Admin/pages/View/PenddingViewBlog";
import PenddingSherList from "./Admin/pages/View/PenddingViewSher";
import PenddingShayriList from "./Admin/pages/View/PenddingViewShayari";
import PenddingProseList from "./Admin/pages/View/PenddingViewProse";
import AddBlogCAtegory from "./Admin/pages/Add/AddBlogCategory";
import AddShayariCAtegory from "./Admin/pages/Add/AddShayariCategory";
import AddSherCAtegory from "./Admin/pages/Add/AddSherCategory";
import AddProseCAtegory from "./Admin/pages/Add/AddproseCategory";
import AddUser from "./Admin/pages/Add/AddUser";
import Addbook from "./Admin/pages/Add/Addbook";
import Booklist from "./Admin/pages/View/Viewbook";
import Updatebook from "./Admin/pages/Update/Updatebook";
import Addtestimonial from "./Admin/pages/Add/AddTestimonial";
import Testimoniallist from "./Admin/pages/View/ViewTestimonial";
import Updatetestimonial from "./Admin/pages/Update/Updatetestimonial";
import PaymentForm from "./Components/PaymentForm";
import Orderlist from "./Admin/pages/View/Vieworders";
import UpdateBlog from "./User/Pages/UserDataPages/BlogUpdate";
import UpdateProse from "./User/Pages/UserDataPages/ProseUpdate";
import UpdateSher from "./User/Pages/UserDataPages/SherUpdate";
import UpdateShayari from "./User/Pages/UserDataPages/ShayariUpdate";
import UserHome from "./Components/UserHome";
import SingleBook from "./Components/SingleBook";
import ForgetPass from "./Authentication/ForgetPass";
import PasswordReset from "./Authentication/Resetpassword";
import Error from "./Components/Error";
import EmailVerified from "./Authentication/emailVerified";
import AddSherImage from "./Admin/pages/Add/AddSherImage";
import AddShayariImage from "./Admin/pages/Add/AddShayariImage";
import AddProseImage from "./Admin/pages/Add/AddproseImage";
import SherImageList from "./Admin/pages/View/ViewSherImage";
import ShayriImageList from "./Admin/pages/View/ViewShayariImage";
import ProseImageList from "./Admin/pages/View/ViewProseImage";
import About from "./Pages/About";
import HelpDesk from "./Pages/HelpDesk";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import FAQs from "./Pages/FAQs";

function App() {
  return (
    <div className="App ">
      <Router>
        <Routes>
          <Route path="/" element={<HomeMaster />}>
            <Route path="/" element={<UserHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPass />} />
            <Route path="/verify/:token" element={<EmailVerified />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/helpdesk" element={<HelpDesk />} />

            <Route path="/register" element={<Register />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/poets" element={<Poets />} />
            <Route path="/single-blog/:_id" element={<Singleblog />} />
            <Route path="/poets-profile/:userId" element={<Porfile />} />
            <Route path="/user-profile" element={<Useruprofile />} />
            <Route path="/prose-Image" element={<ProseImage />} />
            <Route path="/sher-Image" element={<SherImage />} />
            <Route path="/shayari-Image" element={<ShayariImage />} />
            <Route path="/single-book/:_id" element={<SingleBook />} />
            <Route path="/payment-form/:_id" element={<PaymentForm />} />

            <Route path="/shers" element={<Sher />} />
            <Route path="/hindi-sher" element={<Hindisher />} />
            <Route path="/english-sher" element={<Englishsher />} />
            <Route path="/top20-sher" element={<Top20sher />} />
            <Route path="/occasion-sher" element={<Occasionsher />} />
            <Route path="/best-sher" element={<Bestsher />} />
            <Route path="/single-sher/:_id" element={<SingleSher />} />

            <Route path="/shayari" element={<Shayari />} />
            <Route path="/hindi-shayari" element={<Hindishayari />} />
            <Route path="/english-shayari" element={<Englishshayari />} />
            <Route path="/top20-shayari" element={<Top20shayari />} />
            <Route path="/occasion-shayari" element={<Occasionshayari />} />
            <Route path="/best-shayari" element={<Bestshayari />} />
            <Route path="/single-shayari/:_id" element={<SingleShayari />} />

            <Route path="/prose" element={<Prose />} />
            <Route path="/hindi-prose" element={<Hindiprose />} />
            <Route path="/english-prose" element={<Englishprose />} />
            <Route path="/top20-prose" element={<Top20prose />} />
            <Route path="/occasion-prose" element={<Occasionprose />} />
            <Route path="/best-prose" element={<Bestprose />} />
            <Route path="/single-prose/:_id" element={<Singleprose />} />

            <Route path="/update-blog/:_id" element={<UpdateBlog />} />
            <Route path="/update-prose/:_id" element={<UpdateProse />} />
            <Route path="/update-sher/:_id" element={<UpdateSher />} />
            <Route path="/update-shayari/:_id" element={<UpdateShayari />} />
            <Route path="*" element={<Error />} />
          </Route>

          <Route path="/admin" element={
              <PrivateRoute>
                <AdminMaster />
              </PrivateRoute>
            }>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/all-message" element={<Messages />} />
            <Route path="/admin/add-user" element={<AddUser />} />

            <Route path="/admin/add-book" element={<Addbook />} />
            <Route path="/admin/book-list" element={<Booklist />} />
            <Route path="/admin/order-list" element={<Orderlist />} />
            <Route path="/admin/update-book/:_id" element={<Updatebook />} />

            <Route path="/admin/add-testimonial" element={<Addtestimonial />} />
            <Route
              path="/admin/testimonial-list"
              element={<Testimoniallist />}
            />
            <Route
              path="/admin/update-testimonial/:_id"
              element={<Updatetestimonial />}
            />

            <Route path="/admin/add-blog" element={<AddBlog />} />
            <Route path="/admin/add-sher" element={<AddSher />} />
            <Route path="/admin/add-shayari" element={<AddShayari />} />
            <Route path="/admin/add-prose" element={<AddProse />} />

            <Route path="/admin/add-sherImage" element={<AddSherImage />} />
            <Route
              path="/admin/add-shayariImage"
              element={<AddShayariImage />}
            />
            <Route path="/admin/add-proseImage" element={<AddProseImage />} />

            <Route
              path="/admin/view-blogcategory"
              element={<BlogCategoryList />}
            />
            <Route
              path="/admin/view-shayaricategory"
              element={<ShayariCategoryList />}
            />
            <Route
              path="/admin/view-shercategory"
              element={<SherCategoryList />}
            />
            <Route
              path="/admin/view-prosecategory"
              element={<ProseCategoryList />}
            />

            <Route path="/admin/view-blog" element={<BlogList />} />
            <Route path="/admin/view-sher" element={<SherList />} />
            <Route path="/admin/view-shayari" element={<ShayariList />} />
            <Route path="/admin/view-prose" element={<ProseList />} />

            <Route path="/admin/view-sherImage" element={<SherImageList />} />
            <Route
              path="/admin/view-shayariImage"
              element={<ShayriImageList />}
            />
            <Route path="/admin/view-proseImage" element={<ProseImageList />} />

            <Route
              path="/admin/pendding-viewblog"
              element={<PenddingBlogList />}
            />
            <Route
              path="/admin/pendding-viewsher"
              element={<PenddingSherList />}
            />
            <Route
              path="/admin/pendding-viewshayari"
              element={<PenddingShayriList />}
            />
            <Route
              path="/admin/pendding-viewprose"
              element={<PenddingProseList />}
            />

            <Route
              path="/admin/add-blogcategory"
              element={<AddBlogCAtegory />}
            />
            <Route
              path="/admin/add-shayaricategory"
              element={<AddShayariCAtegory />}
            />
            <Route
              path="/admin/add-shercategory"
              element={<AddSherCAtegory />}
            />
            <Route
              path="/admin/add-prosecategory"
              element={<AddProseCAtegory />}
            />

            <Route path="/admin/update-blog/:_id" element={<UpBlog />} />
            <Route path="/admin/update-prose/:_id" element={<UpProse />} />
            <Route path="/admin/update-sher/:_id" element={<UpSher />} />
            <Route path="/admin/update-shayari/:_id" element={<UpShayari />} />

            <Route
              path="/admin/up-blogcategory/:_id"
              element={<UpBlogCategory />}
            />
            <Route
              path="/admin/up-shercategory/:_id"
              element={<UpSherCategory />}
            />
            <Route
              path="/admin/up-shayaricategory/:_id"
              element={<UpShayariCategory />}
            />
            <Route
              path="/admin/up-prosecategory/:_id"
              element={<UpProseCategory />}
            />

            <Route path="/admin/all-users" element={<AllUserList />} />
            <Route path="/admin/admin-profile/:_id" element={<UserSetting />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
