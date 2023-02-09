const router = require("express").Router();
const {
  getThoughts,
  getById,
  newThought,
  editThought,
  deleteThought,
  newreaction,
  deleteReaction,
} = require("../../controllers/thoughtControl");

// /api/thoughts
router.route("/").get(getThoughts).post(newThought);

// /api/thoughts/:id
router
  .route("/:id")
  .get(getById)
  .put(editThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/ReactionSch
router.route("/:thoughtId/ReactionSch").post(newreaction);

// /api/thoughts/:thoughtId/ReactionSch/:reactionId
router.route("/:thoughtId/ReactionSch/:reactionId").delete(deleteReaction);

module.exports = router;