
const SherPageView= require("../../models/Sher/sherCountModel")
// incrementPageView 
exports.sherincrementPageView = async (req, res) => {
    try {
      const { postId } = req.body;
      let pageView = await SherPageView.findOne({ postId });
      if (!pageView) {
        pageView = new SherPageView({ postId, count: 1 });
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
  exports.shergetPageViewCount = async (req, res) => {
    try {
      const { postId } = req.body;
      const pageView = await SherPageView.findOne({ postId });
      if (!pageView) {
        return res.status(404).json({ message: 'Page view not found' });
      }
      return res.json({ count: pageView.count });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  