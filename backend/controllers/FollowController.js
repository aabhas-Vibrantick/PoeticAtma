const Follow = require("../models/FollowModel");

// -------------- follower-----------------------
followUser = (req, res) => {
  var validator = "";

  if (req.body.followerId == "") {
    validator += "followerId is required";
  }
  if (req.body.followingId == "") {
    validator += "followingId is required";
  }
  if (!!validator) {
    res.json({
      status: 409,
      success: false,
      message: validator,
    });
  } else {
    //duplicacy
    Follow.findOne({ followerId: req.body.followerId })
      .then((udata) => {
        if (udata == null) {
          let followobj = new Follow();

          followobj.followerId = req.body.followerId;
          followobj.followingId = req.decoded;

          followobj.save();

          res.json({
            status: 200,
            success: true,
            message: "Followed Successfully!",
            data: followobj,
          });
        } else {
          res.json({
            status: 409,
            success: false,
            message: "You already follow the user!",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 409,
          success: false,
          message: "Internal Error!",
          error: err,
        });
      });
  }
};

// -------------- unfollowe-----------------------
unfollowUser = (req, res) => {
  var validation = "";
  if (req.body.followerId == "") {
    validation += "followerId is required ";
  }

  if (!!validation) {
    res.json({
      status: 409,
      success: false,
      message: validation,
    });
  } else {
    //check whether data exists or not wrt particular id
    Follow.findOne({ followerId: req.body.followerId }).then((unfollowdata) => {
      if (unfollowdata == null) {
        res.json({
          status: 409,
          success: false,
          message: "Data not found",
        });
      } else {
        //Delete
        Follow.findOneAndDelete({ followerId: req.body.followerId })
          .then((data) => {
            res.json({
              status: 200,
              success: true,
              message: "Unfollow success fully",
              data: data,
            });
          })
          .catch((err) => {
            res.json({
              status: 500,
              success: false,
              message: "Failed to unfollow user",
              error: String(err),
            });
          });
      }
    });
  }
};

// --------------get followe-----------------------
getFollowers = (req, res) => {
  Follow.find(req.body)
    // .populate("userId")
    .then((udata) => {
      res.json({
        status: 200,
        success: true,
        message: "data loaded",
        data: udata,
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
};

async function getFollowersForUser(req, res) {
  const userId = req.body.followingId;

  try {
    const followers = await Follow.find({ followingId: userId }).populate(
      "followerId"
    );

    res.json({
      status: 200,
      success: true,
      message: "Followers fetched successfully",
      data: followers,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Error Occurred",
      error: String(err),
    });
  }
}

// ---------------get following-------------

const getFollowing = async (req, res) => {
  const userId = req.params.userId;

  try {
    const following = await Follow.find({ followerId: userId })
      .populate("followingId")
      .select("followingId");
    res.json({ success: true, following });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch following users" });
  }
};

// -------------unfollow-----------
// const unfollowUser = async (req, res) => {
//   const { followerId, followingId } = req.decoded;

//   try {
//     await Follow.findOneAndDelete({ followerId, followingId });
//     res.json({ success: true, message: "User unfollowed successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to unfollow user" });
//   }
// };

// ----------
async function getFollowingForUser(req, res) {
  const userId = req.body.followerId;
  try {
    const following = await Follow.find({ followerId: userId }).populate(
      "followingId"
    );

    res.json({
      status: 200,
      success: true,
      message: "Following fetched successfully",
      data: following,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Error Occurred",
      error: String(err),
    });
  }
}

const getFollowCountsForUser = async (req, res) => {
  const userId = req.body.userId;

  try {
    const followerCount = await Follow.countDocuments({ followingId: userId });
    const followingCount = await Follow.countDocuments({ followerId: userId });

    res.json({
      status: 200,
      success: true,
      message: "Follower and Following counts fetched successfully",
      data: {
        followerCount,
        followingCount,
      },
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Error Occurred",
      error: String(error),
    });
  }
};

module.exports = {
  followUser,
  getFollowers,
  unfollowUser,
  getFollowing,
  getFollowersForUser,
  getFollowingForUser,
  getFollowCountsForUser,
};
