const router = require("express").Router();
const {
  fetchAllUsers,
  fetchUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
  addUserFriend,
  removeUserFriend,
} = require("../../controllers/user-controller");

router.route("/").get(fetchAllUsers).post(createNewUser);

router.route("/:id").get(fetchUserById).put(updateUserById).delete(deleteUserById);

router.route("/:userId/friends/:friendId").post(addUserFriend).delete(removeUserFriend);

module.exports = router;
