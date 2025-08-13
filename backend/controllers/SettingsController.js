const Setting = require("../models/Setting");


const getCaptchaSettings = async (req, res) => {
  try {
    
    const settings = await Setting.find();
    res.status(200).json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching captcha settings" });
  }
};

const updateCaptchaSettings = async (req, res) => {
  
  const { type, sitekey, secretkey, status } = req.body;

  if (!type || !sitekey || !secretkey) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedSetting = await Setting.findOneAndUpdate(
      { type }, // Find setting by its type (e.g., "google")
      { sitekey, secretkey, status }, 
      { upsert: true, new: true } 
    );

    res.status(200).json({ message: "Captcha updated successfully", setting: updatedSetting });
  } catch (err) {
    console.error("Error updating captcha:", err);
    res.status(500).json({ message: "Failed to update setting" });
  }
};

module.exports = { getCaptchaSettings, updateCaptchaSettings };