const { User, Thought } = require("../models");

const userController = {
  fetchAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  fetchUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate([
        {
          path: "thoughts",
          select: "-__v",
        },
        {
          path: "friends",
          select: "-__v",
        },
      ])
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user exists with this Id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createNewUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  updateUserById({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      runValidators: true,
      new: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user exists with this Id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteUserById({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((deletedUser) => {
        if (!deletedUser) {
          res.status(404).json({ message: "No user exists with this Id" });
          return;
        }
        User.updateMany(
          { _id: { $in: deletedUser.friends } },
          { $pull: { friends: params.id } }
        )
          .then(() => {
            Thought.deleteMany({ username: deletedUser.username })
              .then(() => {
                res.json({ message: "User has been deleted" });
              })
              .catch((err) => res.status(400).json(err));
          })
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  },

  addUserFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user exists with this Id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  removeUserFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
