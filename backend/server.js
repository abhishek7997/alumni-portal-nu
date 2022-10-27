const app = require("./app")

// Handling uncaught exception
process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p)
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown")
    process.exit(1)
  })

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`)
  console.log("Shutting down the server due to unhandled promise rejection")
  server.close(() => {
    process.exit(1)
  })
})
