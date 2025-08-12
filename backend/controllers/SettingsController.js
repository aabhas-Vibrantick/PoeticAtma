// controllers/settingsController.js
const Settings = require("../models/Setting");

// Public endpoint to check if captcha is enabled
const getCaptchaStatus = async (req, res) => {
  try {
    const setting = await Settings.findOne({ setting_key: "is_captcha_enabled" });
    const isEnabled = setting ? setting.setting_value : true; // default to true
    res.status(200).json({ showCaptcha: isEnabled });
  } catch (error) {
    console.error("Error fetching CAPTCHA status:", error);
    res.status(500).json({ showCaptcha: true });
  }
};

// Admin GET
const getAdminCaptchaSettings = async (req, res) => {
  try {
    let setting = await Settings.findOne({ setting_key: "is_captcha_enabled" });

    if (!setting) {
      setting = await Settings.create({}); // Defaults kick in here
    }

    res.status(200).json({ setting_value: setting.setting_value });
  } catch (error) {
    console.error("Error fetching admin CAPTCHA settings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Admin PUT
const updateCaptchaSettings = async (req, res) => {
  const { enabled } = req.body;

  if (typeof enabled !== "boolean") {
    return res.status(400).json({ message: "Invalid 'enabled' value. Must be a boolean." });
  }

  try {
    const updatedSetting = await Settings.findOneAndUpdate(
      { setting_key: "is_captcha_enabled" },
      { setting_value: enabled },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "CAPTCHA setting updated successfully.",
      setting_value: updatedSetting.setting_value,
    });
  } catch (error) {
    console.error("Error updating CAPTCHA settings:", error);
    res.status(500).json({ message: "Failed to update setting." });
  }
};

module.exports = {
  getCaptchaStatus,
  getAdminCaptchaSettings,
  updateCaptchaSettings,
};
