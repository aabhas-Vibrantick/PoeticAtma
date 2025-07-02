const ProsePageView = require("../../models/Prose/proseCountModel");
// incrementPageView
exports.proseincrementPageView = async (req, res) => {
  try {
    const { postId } = req.body;
    let pageView = await ProsePageView.findOne({ postId });
    if (!pageView) {
      pageView = new ProsePageView({ postId, count: 1 });
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
exports.prosegetPageViewCount = async (req, res) => {
  try {
    const { postId } = req.body;
    const pageView = await ProsePageView.findOne({ postId });
    if (!pageView) {
      return res.status(404).json({ message: "Page view not found" });
    }
    return res.json({ count: pageView.count });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
