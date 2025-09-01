const BlogPageView = require("../../models/Blog/BlogCountModel");

// incrementPageView 
exports.blogincrementPageView = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    let pageView = await BlogPageView.findOne({ postId });
    if (!pageView) {
      pageView = new BlogPageView({ postId, count: 1 });
    } else {
      pageView.count++;
    }

    await pageView.save();
    return res.json({
      success: true,
      message: "Page view incremented",
      count: pageView.count,
    });
  } catch (error) {
    console.error("Error in blogincrementPageView:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// getPageViewCount 
exports.bloggetPageViewCount = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    const pageView = await BlogPageView.findOne({ postId });
    if (!pageView) {
      return res.status(404).json({ message: "Page view not found" });
    }

    return res.json({
      success: true,
      message: "Page view count fetched",
      count: pageView.count,
    });
  } catch (error) {
    console.error("Error in bloggetPageViewCount:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
