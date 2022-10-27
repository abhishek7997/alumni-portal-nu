require("dotenv").config()

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
    instancename: process.env.SERVERNAME,
  },
  port: parseInt(process.env.DB_PORT, 10),
}

module.exports = config
