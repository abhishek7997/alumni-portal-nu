const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
// const path = require("path")
const cors = require("cors")
const user = require("./users/users.controller")
const post = require("./posts/posts.controller")
const document = require("./documents/documents.controller")

app.use(express.json()) // inbuilt Application-level middleware. express.json parses incoming requests with JSON payloads
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

require("./utils/orm")

app.use("/api/v1", user)
app.use("/api/v1", post)
app.use("/api/v1", document)

app.get("*", function (req, res) {
  res.status(404).send("URL not valid!")
})

module.exports = app
