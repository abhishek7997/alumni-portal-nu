const {
  createEventPost,
  getAllEventPosts,
  getEventPostsByUserId,
  createAlumniPost,
  getAlumniPostsByUserId,
  getAllAlumniPosts,
  addPostComment,
  getAllPostComments,
  getPostCommentsOfPostById,
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
  .route("/posts/alumni_posts/create")
  .post(isAuthenticatedUser, createAlumniPost)
router.route("/posts/alumni_posts").get(getAllAlumniPosts)
router.route("/posts/alumni_posts/:user_id").get(getAlumniPostsByUserId)

router
  .route("/posts/post_comments/create")
  .post(isAuthenticatedUser, addPostComment)
router.route("/posts/post_comments").get(getAllPostComments)
router.route("/posts/post_comments/:post_id").get(getPostCommentsOfPostById)

module.exports = router
