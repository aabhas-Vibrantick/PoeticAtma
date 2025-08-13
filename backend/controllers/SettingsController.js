const Setting = require("../models/Setting");

/**
 * @desc GET all captcha settings, with status dynamically adjusted by domain
 * @route GET /api/admin/captcha
 * @access Private
 */
const getCaptchaSettings = async (req, res) => {
  try {
    const settings = await Setting.find();

    // Use req.hostname for a more reliable domain check (e.g., "localhost" or "poeticatma.com")
    const host = req.hostname;

    const updatedSettings = settings.map(s => {
      // Only modify the google captcha setting
      if (s.type === "google") {
        // Check if the domain from the request matches the one in the database
        const domainMatches = s.allowedDomain === host;
        
        return {
          ...s.toObject(),
          // If domains don't match, send status as false so the frontend can hide the CAPTCHA
          // If they do match, send the original status from the database
          status: domainMatches ? s.status : false,
        };
      }
      // Return other settings (like cloudflare) unmodified
      return s;
    });

    res.status(200).json(updatedSettings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching captcha settings" });
  }
};

/**
 * @desc PUT update or create captcha setting
 * @route PUT /api/admin/captcha
 * @access Private
 */
const updateCaptchaSettings = async (req, res) => {
  const { type, sitekey, secretkey, status, allowedDomain } = req.body;

  if (!type || !sitekey || !secretkey || !allowedDomain) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedSetting = await Setting.findOneAndUpdate(
      { type }, // Find setting by its type (e.g., "google")
      { sitekey, secretkey, status, allowedDomain }, // Data to update with
      { upsert: true, new: true } // Options: create if it doesn't exist, and return the new document
    );

    res.status(200).json({ message: "Captcha updated successfully", setting: updatedSetting });
  } catch (err) {
    console.error("Error updating captcha:", err);
    res.status(500).json({ message: "Failed to update setting" });
  }
};

module.exports = { getCaptchaSettings, updateCaptchaSettings };