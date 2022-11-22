const { addDocument, getAllDocuments } = require("./documents.service")
const { isAuthenticatedUser } = require("../middleware/auth")
const express = require("express")
const router = express.Router()

router.route("/documents").get(isAuthenticatedUser, getAllDocuments)
router.route("/documents/create").post(isAuthenticatedUser, addDocument)

module.exports = router
