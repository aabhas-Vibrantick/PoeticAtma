const Order = require("../models/Ordermodel");

placeorder = (req, res) => {
  validation = "";
  
  if (req.body.userId == "") validation += " user Id  is Required";
  if (req.body.price_per_item == "")
    validation += " price_per_item is Required";
  if (req.body.quantity == "") validation += " quantity is Required";

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    //insert
    let orderobject = new Order();
    // orderobject.Ticket_type = req.body.Ticket_type
    orderobject.userId = req.decoded;
    orderobject.bookId = req.body.bookId;
    orderobject.price_per_item = req.body.price_per_item;
    orderobject.quantity = req.body.quantity;
    orderobject.sub_total = req.body.quantity * req.body.price_per_item;
    orderobject.save();

    res.json({
      success: true,
      status: 200,
      message: "Order Placed placed successfully wait for confirmation",
      data: orderobject,
    });
  }
};
// -----------all order----------
getallorder = (req, res) => {
  Order.find(req.body)
    .populate("userId")
    .populate("bookId")
    .then((orderdata) => {
      res.json({
        status: 200,
        success: true,
        message: "data loaded",
        data: orderdata,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: "Error",
        error: String(err),
      });
    });
};

// ---------get single Order-----------
getsingleOrder = (req, res) => {
  var validate = "";
  if (req.body._id == "") {
    validate += "_id is required";
  }

  if (!!validate) {
    res.json({
      status: 409,
      success: false,
      message: validate,
    });
  } else {
    Order.findOne({ _id: req.body._id })
      .populate("userId")
      .populate("bookId")
      .then((Orderdata) => {
        res.json({
          status: 200,
          success: true,
          message: "data loaded",
          data: Orderdata,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: "Error Occur",
          error: String(err),
        });
      });
  }
};

// --------delete order-------
deleteorder = (req, res) => {
  var validation = "";
  if (req.body._id == "") {
    validation += "ID is required \n";
  }
  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    //check whether data exists or not wrt particular id
    Order.findOne({ _id: req.body._id })
      .then((Orderdata) => {
        if (Orderdata == null) {
          res.json({
            status: 409,
            success: false,
            message: "Data not found",
          });
        } else {
          //Delete
          Order.deleteOne({ _id: req.body._id })
            .then((data) => {
              res.json({
                status: 200,
                success: true,
                message: "Record Deleted",
              });
            })
            .catch((err) => {
              res.json({
                status: 500,
                success: false,
                message: "Error",
                error: String(err),
              });
            });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: "Error",
          error: String(err),
        });
      });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData._id || !formData.status) {
      return res.status(422).json({
        success: false,
        status: 422,
        message: "Both _id and status are required",
      });
    }

    const order = await Order.findOne({ _id: formData._id });

    if (!order) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No order Found",
      });
    }

    order.status = formData.status;
    await order.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "order Status Changed Successfully",
      data: order,
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
  placeorder,
  getallorder,
  getsingleOrder,
  deleteorder,
  updateOrderStatus,
};
