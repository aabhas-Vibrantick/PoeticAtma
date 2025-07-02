const Contact = require("../models/ContactModel");

contact = (req, res) => {
  let validation = "";

  if (req.body.name == "") {
    validation += "Enter Name";
  }
  if (req.body.email == "") {
    validation += "Enter Email";
  }
  if (req.body.subject == "") {
    validation += "Enter Subject";
  }
  if (req.body.contact == "") {
    validation += "Enter Contact";
  }
  if (req.body.message == "") {
    validation += "Enter Message";
  }
  if (req.body.subject == "") {
    validation += "Enter Subject";
  }
  if (!!validation) {
    res.json({
      status: 400,
      success: false,
      message: validation,
    });
  } else {
    let contactobj = new Contact();

    contactobj.name = req.body.name;
    contactobj.subject = req.body.subject;
    contactobj.email = req.body.email;
    contactobj.message = req.body.message;
    contactobj.contact = req.body.contact;
    contactobj.user_type = 2;
    contactobj.save();

    res.json({
      status: 200,
      success: true,
      message: "Message Delivered!",
      data: req.body,
    });
  }
};

getallcontacts = (req, res) => {
  Contact.find(req.body)
    .exec()
    .then((contactdata) => {
      res.json({
        status: 200,
        success: true,
        message: "data Loaded!",
        data: contactdata,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: "Error Occured!",
        error: String(err),
      });
    });
};

const changeContactStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const contact = await Contact.findOne({ _id: formData._id });

    if (!contact) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No contact Found",
      });
    }

    contact.status = formData.status;
    await contact.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Contact Status Changed Successfully!",
      data: contact,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: err.message || "Internal Server Error",
    });
  }
};

module.exports = {
  contact,
  getallcontacts,
  changeContactStatus,
};
