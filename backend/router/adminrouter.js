const router = require("express").Router();
const multer = require("multer");

const usercontroller = require("../controllers/UserController");
const contactcontroller = require("../controllers/ContactController");
const blogController = require("../controllers/Blog/BlogController");
const sherController = require("../controllers/Sher/SherController ");
const shayariController = require("../controllers/Shayari/ShayariController");
const proseController = require("../controllers/Prose/ProseController");
const Bcategorycontroller = require("../controllers/Blog/BlogCategoryController");
const shercategorycontroller = require("../controllers/Sher/SherCategoryController");
const shayaricategorycontroller = require("../controllers/Shayari/ShayariCategoryController");
const prosecategorycontroller = require("../controllers/Prose/ProseCategoryController");
const proseImageController = require("../controllers/Prose/ProseImagecontroller");
const commentController = require("../controllers/Blog/CommentController");
const replyController = require("../controllers/Blog/ReplyController");
const sherImageController = require("../controllers/Sher/SherImagecontroller");
const shayariImageController = require("../controllers/Shayari/ShayariImagecontroller");
const followController = require("../controllers/FollowController");
const likeController = require("../controllers/Blog/BLikeController");
const ProselikeController = require("../controllers/Prose/ProseLikeController");
const ShayarilikeController = require("../controllers/Shayari/ShayariLikeController");
const SherlikeController = require("../controllers/Sher/SherLikeController");
const prosecommentController = require("../controllers/Prose/ProseCommentController");
const shayaricommentController = require("../controllers/Shayari/ShayariCommentController");
const shercommentController = require("../controllers/Sher/SherCommentController");
const prosereplyController = require("../controllers/Prose/ProseReplyController");
const shayarireplyController = require("../controllers/Shayari/ShayariReplyController");
const sherreplyController = require("../controllers/Sher/SherReplyController");
const pageViewcontroller = require("../controllers/Blog/BlogCountController");
const shayaripageViewcontroller = require("../controllers/Shayari/ShayariCountController");
const prosepageViewcontroller = require("../controllers/Prose/ProseCountController");
const sherpageViewcontroller = require("../controllers/Sher/SherCountController");
const ordercontroller = require("../controllers/Ordercontroller");
const bookcontroller = require("../controllers/BookController");
const testcontroller = require("../controllers/TestimonialController");
const dashboardcontroller = require("../controllers/Dashboard");

const userstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Customer_photo");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const userupload = multer({ storage: userstorage });

const blogstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/blog_photo");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const blogupload = multer({ storage: blogstorage });

const sherstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/sher_photo");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const sherupload = multer({ storage: sherstorage });

const shayaristorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/shayari_photo");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const shayariupload = multer({ storage: shayaristorage });

const prosestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/prose_photo");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const proseupload = multer({ storage: prosestorage });

const proseImagestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Prose_Image");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const proseImageupload = multer({ storage: proseImagestorage });

const shayariImagestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Shayari_Image");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const shayariImageupload = multer({ storage: shayariImagestorage });

const sherImagestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Sher_Image");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const sherImageupload = multer({ storage: sherImagestorage });

const bookImagestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Book_Image");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const bookImageupload = multer({ storage: bookImagestorage });

const TestImagestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Testimonial_Image");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const TastImageupload = multer({ storage: TestImagestorage });

// router.get("/verifyEmail", (req, res) => {
//   // console.log("Route handler reached");
//   usercontroller.verifyEmail(req, res);
// });

router.get("/verifyEmail/:token", usercontroller.verifyEmail);


router.post("/dashboard", dashboardcontroller.dashboard);
router.post("/usershayariDash", shayariController.usershayariDash);

router.post("/blogincrementPageView", pageViewcontroller.blogincrementPageView);
router.post("/bloggetPageViewCount", pageViewcontroller.bloggetPageViewCount);

router.post(
  "/shayariincrementPageView",
  shayaripageViewcontroller.shayariincrementPageView
);
router.post(
  "/shayarigetPageViewCount",
  shayaripageViewcontroller.shayarigetPageViewCount
);

router.post(
  "/proseincrementPageView",
  prosepageViewcontroller.proseincrementPageView
);
router.post(
  "/prosegetPageViewCount",
  prosepageViewcontroller.prosegetPageViewCount
);

router.post(
  "/sherincrementPageView",
  sherpageViewcontroller.sherincrementPageView
);
router.post(
  "/shergetPageViewCount",
  sherpageViewcontroller.shergetPageViewCount
);
// -------------follow---------unfollow-------

router.post("/getFollowers", followController.getFollowers);
router.post("/getFollowing", followController.getFollowing);
router.post("/getFollowersForUser", followController.getFollowersForUser);
router.post("/getFollowingForUser", followController.getFollowingForUser);
router.post("/getFollowCountsForUser", followController.getFollowCountsForUser);
router.post("/getLikeCountForBlog", likeController.getLikeCountForBlog);
router.post("/getLikeCountForProse", ProselikeController.getLikeCountForProse);
router.post(
  "/getLikeCountForShayari",
  ShayarilikeController.getLikeCountForShayari
);

router.post("/getLikeCountForSher", SherlikeController.getLikeCountForSher);
// ==============count==================

router.post("/blogincrementPageView", pageViewcontroller.blogincrementPageView);
router.post("/bloggetPageViewCount", pageViewcontroller.bloggetPageViewCount);

router.post(
  "/shayariincrementPageView",
  shayaripageViewcontroller.shayariincrementPageView
);
router.post(
  "/shayarigetPageViewCount",
  shayaripageViewcontroller.shayarigetPageViewCount
);

router.post(
  "/proseincrementPageView",
  prosepageViewcontroller.proseincrementPageView
);
router.post(
  "/prosegetPageViewCount",
  prosepageViewcontroller.prosegetPageViewCount
);

router.post(
  "/sherincrementPageView",
  sherpageViewcontroller.sherincrementPageView
);
router.post(
  "/shergetPageViewCount",
  sherpageViewcontroller.shergetPageViewCount
);

// =======get comment==============
router.post("/getAllComments", commentController.getAllComments);
router.post("/getAllsherComments", shercommentController.getAllsherComments);
router.post("/getAllproseComments", prosecommentController.getAllproseComments);
router.post(
  "/getAllshayariComments",
  shayaricommentController.getAllshayariComments
);

router.post("/getAllsherReplies", sherreplyController.getAllsherReplies);
router.post("/getAllReplies", replyController.getAllReplies);
router.post("/getAllproseReplies", prosereplyController.getAllproseReplies);
router.post(
  "/getAllshayariReplies",
  shayarireplyController.getAllshayariReplies
);

router.post("/register", userupload.single("Image"), usercontroller.register);
router.post("/adduser", userupload.single("Image"), usercontroller.adduser);
router.post("/updateCustomerProfile",
  userupload.single("Image"), // this handles profile photo upload
  usercontroller.updateCustomerProfile //  create this in UserController
);

router.post("/verifyMail", usercontroller.verifyEmail);
router.post("/login", usercontroller.login);

router.post("/forgotPassword", usercontroller.forgotPassword);
router.post("/resetPassword", usercontroller.resetPassword);
router.post("/getalluser", usercontroller.getalluser);
router.post("/getTop10Customers", usercontroller.getTop10Customers);
router.post("/getsinglecustomer", usercontroller.getsinglecustomer);
router.post("/getsingleuser", usercontroller.getsingleuser);
router.post("/contact", contactcontroller.contact);
router.get("/getallblog", blogController.getallblog);
router.post("/getsingleblog", blogController.getsingleblog);
router.post("/getallcustomer", usercontroller.getallcustomer);
router.post("/getFeaturedBlogs", blogController.getFeaturedBlogs);
router.post("/getallBook", bookcontroller.getallBook);
router.post("/getallTestimonial", testcontroller.getallTestimonial);
router.post("/getsingleBook", bookcontroller.getsingleBook);
router.post("/getBlogsByCategory", blogController.getBlogsByCategory);
router.post("/getallblogbyUserId", blogController.getallblogbyUserId);
router.post("/latestBlog", blogController.latestBlog);

// ===sher without login========
router.post("/usersherDash", sherController.usersherDash);
router.post("/getallsher", sherController.getallsher);
router.post("/gethindiSherByUserId", sherController.gethindiSherByUserId);
router.post("/getenglishSherByUserId", sherController.getenglishSherByUserId);
router.post("/getBestSher", sherController.getBestSher);
router.post("/getPopularSher", sherController.getPopularSher);
router.post("/getSherByCategory", sherController.getSherByCategory);
router.post("/getsherByHindi", sherController.getsherByHindi);
router.post("/getsherByEnglish", sherController.getsherByEnglish);
router.post("/getallSherImage", sherImageController.getallSherImage);
router.post("/getsinglesher", sherController.getsinglesher);
router.post("/getallsherbyUserId", sherController.getallsherbyUserId);
router.post("/latestSher", sherController.latestSher);
router.post("/getFeaturedSher", sherController.getFeaturedSher);

// ===shayari without login========
router.post("/getPopularShayari", shayariController.getPopularShayari);
router.post("/getByLanguage", shayariController.getByLanguage);
router.post("/getByEnglish", shayariController.getByEnglish);
router.post("/getBestShayari", shayariController.getBestShayari);
router.post("/getallshayari", shayariController.getallshayari);
router.post("/getallShayariImage", shayariImageController.getallShayariImage);
router.post("/getShayariByCategory", shayariController.getShayariByCategory);
router.post("/getsingleshayari", shayariController.getsingleshayari);
router.post("/getAllTags", shayariController.getAllTags);
router.post("/getallshayaribyUserId", shayariController.getallshayaribyUserId);
router.post(
  "/gethindiShayariByUserId",
  shayariController.gethindiShayariByUserId
);
router.post(
  "/getenglishShayariByUserId",
  shayariController.getenglishShayariByUserId
);
router.post("/latestShayari", shayariController.latestShayari);
router.post("/getFeaturedShayari", shayariController.getFeaturedShayari);

// ===prose without login========
router.post("/userproseDash", proseController.userproseDash);
router.post("/getallprose", proseController.getallprose);
router.post("/getProseByCategory", proseController.getProseByCategory);
router.post("/getBestProse", proseController.getBestProse);
router.post("/getPopularProse", proseController.getPopularProse);
router.post("/getproseByEnglish", proseController.getproseByEnglish);
router.post("/getproseByHindi", proseController.getproseByHindi);
router.post("/getallProseImage", proseImageController.getallProseImage);
router.post("/getsingleprose", proseController.getsingleprose);
router.post("/getallprosebyUserId", proseController.getallprosebyUserId);
router.post("/getTrendingproseTags", proseController.getTrendingproseTags);
router.post("/getAllproseTags", proseController.getAllproseTags);
router.post("/gethindiProseByUserId", proseController.gethindiProseByUserId);
router.post(
  "/getenglishProseByUserId",
  proseController.getenglishProseByUserId
);
router.post("/latestProse", proseController.latestProse);
router.post("/getFeaturedProse", proseController.getFeaturedProse);

// --------end without login Router------------

// =====================middleware start===========================
router.use(require("../config/middleware"));
// =====================middleware end===========================

router.post("/getallcontacts", contactcontroller.getallcontacts);
router.post("/changeContactStatus", contactcontroller.changeContactStatus);
// ----------user Authenticated -----------
router.post("/changepassword", usercontroller.changepassword);
router.post("/deleteuser", usercontroller.deleteuser);
router.post("/deletecustomer", usercontroller.deletecustomer);
router.post("/changeStatus", usercontroller.changeStatus);
router.post(
  "/updateuser",
  userupload.single("Image"),
  usercontroller.updateuser
);
// ----------user Authenticated -----------

// ---------blog Category---------
router.post("/addcategory", Bcategorycontroller.addcategory);
router.post("/getallcategory", Bcategorycontroller.getallcategory);
router.post("/getsingle_category", Bcategorycontroller.getsingle_category);
router.post("/updatecategory", Bcategorycontroller.updatecategory);
router.post("/deletedata", Bcategorycontroller.deletedata);
router.post(
  "/updateBlogCategoryStatus",
  Bcategorycontroller.updateBlogCategoryStatus
);
// ---------blog Category---------

// ---------sher Category---------
router.post("/add_sher_category", shercategorycontroller.add_sher_category);
router.post(
  "/getall_sher_category",
  shercategorycontroller.getall_sher_category
);
router.post(
  "/getsingle_sher_category",
  shercategorycontroller.getsingle_sher_category
);
router.post(
  "/update_sher_category",
  shercategorycontroller.update_sher_category
);
router.post("/delete_sher_data", shercategorycontroller.delete_sher_data);
router.post(
  "/updateSherCategoryStatus",
  shercategorycontroller.updateSherCategoryStatus
);
// ---------sher Category---------

// ---------shayari Category---------
router.post(
  "/add_shayari_category",
  shayaricategorycontroller.add_shayari_category
);
router.post(
  "/getall_shayari_category",
  shayaricategorycontroller.getall_shayari_category
);
router.post(
  "/getsingle_shayari_category",
  shayaricategorycontroller.getsingle_shayari_category
);
router.post(
  "/update_shayari_category",
  shayaricategorycontroller.update_shayari_category
);
router.post(
  "/delete_shayari_data",
  shayaricategorycontroller.delete_shayari_data
);
router.post(
  "/updateShayariCategoryStatus",
  shayaricategorycontroller.updateShayariCategoryStatus
);
// ---------shayari Category---------

// ---------prose Category---------
router.post("/add_prose_category", prosecategorycontroller.add_prose_category);
router.post(
  "/getall_prose_category",
  prosecategorycontroller.getall_prose_category
);
router.post(
  "/getsingle_prose_category",
  prosecategorycontroller.getsingle_prose_category
);
router.post(
  "/update_prose_category",
  prosecategorycontroller.update_prose_category
);
router.post("/delete_prose_data", prosecategorycontroller.delete_prose_data);
router.post(
  "/updateProseCategoryStatus",
  prosecategorycontroller.updateProseCategoryStatus
);
// ---------prose Category---------

// ------blog---------
router.post("/addblog", blogupload.single("Image"), blogController.addblog);
// router.get("/getallblog",blogController.getallblog)
router.post("/deleteblog", blogController.deleteblog);
router.post("/searchBlogs", blogController.searchBlogs);
router.post("/getRelatedBlogs", blogController.getRelatedBlogs);
router.post("/getBlogsByCategory", blogController.getBlogsByCategory);
router.post("/updateBlogStatus", blogController.updateBlogStatus);
router.post("/getallblogbyUserId", blogController.getallblogbyUserId);
router.post(
  "/updateblog",
  blogupload.single("Image"),
  blogController.updateblog
);
// ------blog---------

// ------sher---------
router.post("/addsher", sherupload.single("Image"), sherController.addsher);
router.post("/getallsherbyUserId", sherController.getallsherbyUserId);
router.post("/deletesher", sherController.deletesher);
router.post("/getAllsherTags", sherController.getAllsherTags);
router.post("/getTrendingsherTags", sherController.getTrendingsherTags);
router.post("/updateSherStatus", sherController.updateSherStatus);
router.post(
  "/updatesher",
  sherupload.single("Image"),
  sherController.updatesher
);
// ------sher images controller---------
router.post(
  "/addSherImage",
  sherImageupload.single("Image"),
  sherImageController.addSherImage
);
router.post(
  "/updateSherImageStatus",
  sherImageController.updateSherImageStatus
);
// ------sher---------

// ------shayari---------
router.post(
  "/addshayari",
  shayariupload.single("Image"),
  shayariController.addshayari
);
router.post("/deleteshayari", shayariController.deleteshayari);
router.post("/getTrendingTags", shayariController.getTrendingTags);
router.post("/getAllTags", shayariController.getAllTags);
router.post("/getallshayaribyUserId", shayariController.getallshayaribyUserId);
router.post(
  "/gethindiShayariByUserId",
  shayariController.gethindiShayariByUserId
);
router.post(
  "/getenglishShayariByUserId",
  shayariController.getenglishShayariByUserId
);
router.post("/updateShayariStatus", shayariController.updateShayariStatus);
router.post(
  "/updateshayari",
  shayariupload.single("Image"),
  shayariController.updateshayari
);
// ------shayari images controller---------
router.post(
  "/addShayariImage",
  shayariImageupload.single("Image"),
  shayariImageController.addShayariImage
);
router.post(
  "/updateShayariImageStatus",
  shayariImageController.updateShayariImageStatus
);
// ------shayari---------

// ------prose---------
router.post("/addprose", proseupload.single("Image"), proseController.addprose);
router.post("/getallprosebyUserId", proseController.getallprosebyUserId);
router.post("/deleteprose", proseController.deleteprose);
router.post("/updateProseStatus", proseController.updateProseStatus);
router.post("/getTrendingproseTags", proseController.getTrendingproseTags);
router.post("/getAllproseTags", proseController.getAllproseTags);
router.post("/gethindiProseByUserId", proseController.gethindiProseByUserId);
router.post(
  "/getenglishProseByUserId",
  proseController.getenglishProseByUserId
);
router.post("/updateProseStatus", proseController.updateProseStatus);
router.post(
  "/updateprose",
  proseupload.single("Image"),
  proseController.updateprose
);
// ------prose---------
// ------prose images controller---------
router.post(
  "/addProseImage",
  proseImageupload.single("Image"),
  proseImageController.addProseImage
);
router.post(
  "/updateProseImageStatus",
  proseImageController.updateProseImageStatus
);
// ------prose---------
// ------Like/Unlike---------
router.post("/BlogLike", likeController.likeOrUnlikeBlog);
router.post("/BlogUnLike", likeController.likeOrUnlikeBlog);
router.post("/getLikeCountForBlog", likeController.getLikeCountForBlog);

router.post("/ProseLike", ProselikeController.likeOrUnlikeProse);
router.post("/ProseUnLike", ProselikeController.likeOrUnlikeProse);
router.post("/getLikeCountForProse", ProselikeController.getLikeCountForProse);

router.post("/ShayariLike", ShayarilikeController.likeOrUnlikeShayari);
router.post("/ShayariUnLike", ShayarilikeController.likeOrUnlikeShayari);
router.post(
  "/getLikeCountForShayari",
  ShayarilikeController.getLikeCountForShayari
);

router.post("/SherLike", SherlikeController.likeOrUnlikeSher);
router.post("/SherUnLike", SherlikeController.likeOrUnlikeSher);
router.post("/getLikeCountForSher", SherlikeController.getLikeCountForSher);
// ------comment and reply---------
// Comment Routes
router.post("/createblogComment", commentController.createblogComment);
router.post("/getAllComments", commentController.getAllComments);

router.post("/createproseComment", prosecommentController.createproseComment);
router.post("/getAllproseComments", prosecommentController.getAllproseComments);

router.post(
  "/createshayariComment",
  shayaricommentController.createshayariComment
);
router.post(
  "/getAllshayariComments",
  shayaricommentController.getAllshayariComments
);

router.post("/createsherComment", shercommentController.createsherComment);
router.post("/getAllsherComments", shercommentController.getAllsherComments);

// Reply Routes
router.post("/createReply", replyController.createReply);
router.post("/getAllReplies", replyController.getAllReplies);

router.post("/createProseReply", prosereplyController.createProseReply);
router.post("/getAllproseReplies", prosereplyController.getAllproseReplies);

router.post("/createShayariReply", shayarireplyController.createShayariReply);
router.post(
  "/getAllshayariReplies",
  shayarireplyController.getAllshayariReplies
);

router.post("/createSherReply", sherreplyController.createSherReply);
router.post("/getAllsherReplies", sherreplyController.getAllsherReplies);

// -------------follow---------unfollow-------
router.post("/followUser", followController.followUser);
router.post("/getFollowers", followController.getFollowers);
router.post("/getFollowing", followController.getFollowing);
router.post("/unfollowUser", followController.unfollowUser);
router.post("/getFollowersForUser", followController.getFollowersForUser);
router.post("/getFollowingForUser", followController.getFollowingForUser);
router.post("/getFollowCountsForUser", followController.getFollowCountsForUser);

// ==============count==================
router.post("/blogincrementPageView", pageViewcontroller.blogincrementPageView);
router.post("/bloggetPageViewCount", pageViewcontroller.bloggetPageViewCount);

router.post(
  "/shayariincrementPageView",
  shayaripageViewcontroller.shayariincrementPageView
);
router.post(
  "/shayarigetPageViewCount",
  shayaripageViewcontroller.shayarigetPageViewCount
);

router.post(
  "/proseincrementPageView",
  prosepageViewcontroller.proseincrementPageView
);
router.post(
  "/prosegetPageViewCount",
  prosepageViewcontroller.prosegetPageViewCount
);

router.post(
  "/sherincrementPageView",
  sherpageViewcontroller.sherincrementPageView
);
router.post(
  "/shergetPageViewCount",
  sherpageViewcontroller.shergetPageViewCount
);

// ----------------book router-------
// -------Book Router start------------
router.post(
  "/addBook",
  bookImageupload.single("Image"),
  bookcontroller.addBook
);
router.post(
  "/updateBook",
  bookImageupload.single("Image"),
  bookcontroller.updateBook
);
router.post("/deleteBook", bookcontroller.deleteBook);
router.post("/updatebookStatus", bookcontroller.updatebookStatus);
// -------Book Router End------------

// -------testimonial Router start------------
router.post(
  "/addTestimonial",
  TastImageupload.single("Image"),
  testcontroller.addTestimonial
);
router.post(
  "/updateTestimonial",
  TastImageupload.single("Image"),
  testcontroller.updateTestimonial
);
router.post("/getsingleTestimonial", testcontroller.getsingleTestimonial);
router.post("/deleteTestimonial", testcontroller.deleteTestimonial);
router.post("/updatetestimonialStatus", testcontroller.updatetestimonialStatus);
// -------testimonial Router End------------

// ----------------order router-------
router.post("/placeorder", ordercontroller.placeorder);
router.post("/getallorder", ordercontroller.getallorder);
router.post("/getsingleorder", ordercontroller.getsingleOrder);
router.post("/deleteorder", ordercontroller.deleteorder);
router.post("/updateOrderStatus", ordercontroller.updateOrderStatus);
// ----------------order router-------

// New Routers

module.exports = router;
