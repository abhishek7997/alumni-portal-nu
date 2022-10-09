const express = require("express")
const getAlumniAccounts = require("./db/db_operation")
const cors = require("cors")

const PORT = process.env.PORT
const app = express()

app.use(cors())

app.get("/", async (req, res) => {
  let details = await getAlumniAccounts()
  try {
    console.log("Details: ", details)
    res.send(details)
  } catch (err) {
    res.send(err)
  }
})

app.get("/api", (req, res) => {
  console.log("called")
  res.send({
    result: "go away",
  })
})

app.get("/hello", (req, res) => {
  console.log("Hello")
  res.send({
    result: "HI!",
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
