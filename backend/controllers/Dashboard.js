const User = require("../models/UserModel");
const Blog = require("../models/Blog/BlogModel");
const Shayari = require("../models/Shayari/ShayariModel.js");
const Sher = require("../models/Sher/SherModel");
const Prose = require("../models/Prose/ProseModel");

dashboard = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Global Totals
    const totalAuthors = await User.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    const totalShayaris = await Shayari.countDocuments();
    const totalShers = await Sher.countDocuments();
    const totalProses = await Prose.countDocuments();

    // User-specific Totals
    const userTotalBlogs = await Blog.countDocuments({ userId });
    const userTotalShayaris = await Shayari.countDocuments({ userId });
    const userTotalShers = await Sher.countDocuments({ userId });
    const userTotalProses = await Prose.countDocuments({ userId });

    // User-specific Approved/Pending (optional if needed)
    const approvedBlog = await Blog.countDocuments({ userId, status: true });
    const pendingBlog = await Blog.countDocuments({ userId, status: false });

    const approvedShayari = await Shayari.countDocuments({ userId, status: true });
    const pendingShayari = await Shayari.countDocuments({ userId, status: false });

    const approvedSher = await Sher.countDocuments({ userId, status: true });
    const pendingSher = await Sher.countDocuments({ userId, status: false });

    const approvedProse = await Prose.countDocuments({ userId, status: true });
    const pendingProse = await Prose.countDocuments({ userId, status: false });

    // Global Pending Counts
    const totalPendingBlogs = await Blog.countDocuments({ status: false });
    const totalPendingShayaris = await Shayari.countDocuments({ status: false });
    const totalPendingShers = await Sher.countDocuments({ status: false });
    const totalPendingProses = await Prose.countDocuments({ status: false });

    return res.json({
      status: 200,
      success: true,

      // 🔹 Global Totals
      total_author: totalAuthors,
      total_blog: totalBlogs,
      total_shayari: totalShayaris,
      total_sher: totalShers,
      total_prose: totalProses,

      // 🔹 User Totals
      usertotal_blog: userTotalBlogs,
      usertotal_shayari: userTotalShayaris,
      usertotal_sher: userTotalShers,
      usertotal_prose: userTotalProses,

      // 🔹 User Approved/Pending
      approvedBlog,
      pendingBlog,
      approvedShayari,
      pendingShayari,
      approvedSher,
      pendingSher,
      approvedProse,
      pendingProse,

      // 🔹 Global Pending
      total_penddingblog: totalPendingBlogs,
      total_penddingshayari: totalPendingShayaris,
      total_penddingsher: totalPendingShers,
      total_penddingprose: totalPendingProses,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  dashboard,
};
