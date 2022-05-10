const router = require("express").Router();
const {
  fetchAllThoughts,
  fetchThoughtById,
  createNewThought,
  updateThoughtById,
  deleteThoughtById,
  addNewReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(fetchAllThoughts);

router.route("/:thoughtId").get(fetchThoughtById).put(updateThoughtById);

router.route("/:userId").post(createNewThought);

router.route("/:userId/:thoughtId").delete(deleteThoughtById);

router.route("/:thoughtId/reactions").post(addNewReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
