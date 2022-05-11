const router = require("express").Router();
const {
  fetchAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
  addUserFriend,
  removeUserFriend,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(fetchAllUsers).post(createNewUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(addUserFriend)
  .delete(removeUserFriend);

module.exports = router;
