const BlogPageView = require("../../models/Blog/BlogCountModel");
// incrementPageView
exports.blogincrementPageView = async (req, res) => {
  try {
    const { postId } = req.body;
    let pageView = await BlogPageView.findOne({ postId });
    if (!pageView) {
      pageView = new BlogPageView({ postId, count: 1 });
    } else {
      pageView.count++;
    }
    await pageView.save();
    return res.json({ count: pageView.count });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// getPageViewCount
exports.bloggetPageViewCount = async (req, res) => {
  try {
    const { postId } = req.body;
    const pageView = await BlogPageView.findOne({ postId });
    if (!pageView) {
      return res.status(404).json({ message: "Page view not found" });
    }
    return res.json({ count: pageView.count });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
