const {
  createEventPost,
  getAllEventPosts,
  getEventPostsByUserId,
  createGeneralPost,
  getGeneralPostsByUserId,
  getAllGeneralPosts,
  addPostComment,
  getAllPostComments,
  getPostCommentsOfPostById,
  deleteGeneralPost,
  updateGeneralPost,
  getGeneralPostDetails,
} = require("./posts.service")
const { isAuthenticatedUser } = require("../middleware/auth")
const express = require("express")
const router = express.Router()

router
  .route("/posts/event_posts/create")
  .post(isAuthenticatedUser, createEventPost)
router.route("/posts/event_posts").get(getAllEventPosts)
router.route("/posts/event_posts/:user_id").get(getEventPostsByUserId)

router
  .route("/posts/general_posts/create")
  .post(isAuthenticatedUser, createGeneralPost)
router.route("/posts/general_posts").get(getAllGeneralPosts)
router.route("/posts/general_posts/user/:user_id").get(getGeneralPostsByUserId)
router
  .route("/posts/general_posts/:post_id")
  .get(isAuthenticatedUser, getGeneralPostDetails)
router
  .route("/posts/general_posts/:post_id")
  .delete(isAuthenticatedUser, deleteGeneralPost)
router
  .route("/posts/general_posts/:post_id")
  .patch(isAuthenticatedUser, updateGeneralPost)

router
  .route("/posts/post_comments/create")
  .post(isAuthenticatedUser, addPostComment)
router.route("/posts/post_comments").get(getAllPostComments)
router.route("/posts/post_comments/:post_id").get(getPostCommentsOfPostById)

module.exports = router
