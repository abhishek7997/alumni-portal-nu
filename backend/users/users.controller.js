const {
  getAllAlumniDetails,
  getAllUsers,
  registerAlumnus,
  loginAlumnus,
  logoutAlumnus,
  getAlumnusById,
  deleteAlumnus,
} = require("./users.service")
const { isAuthenticatedUser } = require("../middleware/auth")
const express = require("express")
const router = express.Router()

router.route("/users").get(getAllUsers)
router.route("/users/alumni").get(getAllAlumniDetails)
router.route("/users/alumnus/login").post(loginAlumnus)
router.route("/users/alumnus/logout").post(isAuthenticatedUser, logoutAlumnus)
router.route("/users/alumnus/register").post(registerAlumnus)
router
  .route("/users/alumnus/delete")
  .delete(isAuthenticatedUser, deleteAlumnus, logoutAlumnus)
router.route("/users/alumnus/:user_id").get(getAlumnusById)

module.exports = router
