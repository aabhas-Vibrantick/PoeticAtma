
const ShayariPageView= require("../../models/Shayari/shayariCountModel")
// incrementPageView 
exports.shayariincrementPageView = async (req, res) => {
    try {
      const { postId } = req.body;
      let pageView = await ShayariPageView.findOne({ postId });
      if (!pageView) {
        pageView = new ShayariPageView({ postId, count: 1 });
      } else {
        pageView.count++;
      }
      await pageView.save();
      return res.json({ count: pageView.count });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // getPageViewCount 
  exports.shayarigetPageViewCount = async (req, res) => {
    try {
      const { postId } = req.body;
      const pageView = await ShayariPageView.findOne({ postId });
      if (!pageView) {
        return res.status(404).json({ message: 'Page view not found' });
      }
      return res.json({ count: pageView.count });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  