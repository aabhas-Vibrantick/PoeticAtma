const User = require("../models/UserModel");
const Blog = require("../models/Blog/BlogModel");
const Shayari = require("../models/Shayari/ShayariModel.js");
const Sher = require("../models/Sher/SherModel");
const Prose = require("../models/Prose/ProseModel");

dashboard = async (req, res) => {
  let totalpenddingBlog;
  let totalpenddingShayari;
  let totalpenddingSher;
  let totalpenddingProse;

  await User.countDocuments().then((authorcount) => {
    totalauthor = authorcount;
  });
  await Blog.countDocuments().then((blogcount) => {
    totalblog = blogcount;
  });
  await Shayari.countDocuments().then((shayaricount) => {
    totalshayari = shayaricount;
  });
  await Sher.countDocuments().then((shercount) => {
    totalsher = shercount;
  });
  await Prose.countDocuments().then((prosecount) => {
    totalprose = prosecount;
  });

  // ================
  await Blog.countDocuments({ userId: req.body.userId }).then(
    (userblogcount) => {
      usertotalblog = userblogcount;
    }
  );
  await Shayari.countDocuments({ userId: req.body.userId }).then(
    (usershayaricount) => {
      usertotalshayari = usershayaricount;
    }
  );
  await Sher.countDocuments({ userId: req.body.userId }).then(
    (usershercount) => {
      usertotalsher = usershercount;
    }
  );
  await Prose.countDocuments({ userId: req.body.userId }).then(
    (userprosecount) => {
      usertotalprose = userprosecount;
    }
  );
  // ================

  await Shayari.countDocuments(req.body).then((allshayaricount) => {
    alltotalshayari = allshayaricount;
  });
  await Sher.countDocuments(req.body).then((allshercount) => {
    alltotalsher = allshercount;
  });
  await Prose.countDocuments(req.body).then((allprosecount) => {
    alltotalprose = allprosecount;
  });
  
  // -----------in active--------------
  await Blog.countDocuments({ status: false }).then((blogpenddingcount) => {
    totalpenddingblog = blogpenddingcount;
  });
  await Shayari.countDocuments({ status: false }).then(
    (shayaripenddingcount) => {
      totalpenddingshayari = shayaripenddingcount;
    }
  );
  await Sher.countDocuments({ status: false }).then((sherpenddingcount) => {
    totalpenddingsher = sherpenddingcount;
  });
  await Prose.countDocuments({ status: false }).then((prosependdingcount) => {
    totalpenddingprose = prosependdingcount;
  });

  // await Order.countDocuments().then(ordercount =>{
  //     totalorder = ordercount
  // })

  res.json({
    status: 200,
    success: true,
    total_author: totalauthor,
    total_blog: totalblog,
    total_shayari: totalshayari,
    total_sher: totalsher,
    total_prose: totalprose,

    usertotal_blog: usertotalblog,
    usertotal_shayari: usertotalshayari,
    usertotal_sher: usertotalsher,
    usertotal_prose: usertotalprose,

    alltotal_shayari: alltotalshayari,
    alltotal_sher: alltotalsher,
    alltotal_prose: alltotalprose,

    total_penddingblog: totalpenddingblog,
    total_penddingshayari: totalpenddingshayari,
    total_penddingsher: totalpenddingsher,
    total_penddingprose: totalpenddingprose,
    // total_order : totalorder,
  });
};

module.exports = {
  dashboard,
};
