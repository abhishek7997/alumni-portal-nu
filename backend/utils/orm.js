require("dotenv").config()
const tedious = require("tedious")
const { Sequelize } = require("sequelize")
const { User, GeneralUser } = require("../users/users.model")

const dbName = process.env.DATABASE
const dbConfig = {
  dbName: dbName,
  dbConfig: {
    server: process.env.SERVER,
    options: {
      port: parseInt(process.env.DB_PORT),
      trustServerCertificate: true,
    },
    authentication: {
      type: "default",
      options: {
        userName: process.env.USER,
        password: process.env.PASSWORD,
      },
    },
  },
}

module.exports = db = {}

initialize()

async function initialize() {
  const dialect = "mssql"
  const host = "localhost"
  const { userName, password } = dbConfig.dbConfig.authentication.options

  // create db if it doesn't already exist
  await ensureDbExists(dbName)

  // connect to db
  const sequelize = new Sequelize(dbName, userName, password, {
    host: host,
    dialect: dialect,
  })

  // init models and add them to the exported db object
  db.User = User(sequelize)
  db.GeneralUser = GeneralUser(sequelize)
  db.sequelize = sequelize

  db.User.hasOne(db.GeneralUser, {
    onDelete: "CASCADE",
    foreignKey: "gu_user_id",
  })
  db.GeneralUser.belongsTo(db.User, {
    foreignKey: "gu_user_id",
  })

  // test connection
  testConnection(sequelize)

  // sync all models with database
  await sequelize.sync()
}

async function ensureDbExists(dbName) {
  return new Promise((resolve, reject) => {
    const connection = new tedious.Connection(dbConfig.dbConfig)
    connection.connect((err) => {
      if (err) {
        console.error(err)
        reject(`Connection Failed: ${err.message}`)
      }

      const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`
      const request = new tedious.Request(createDbQuery, (err) => {
        if (err) {
          console.error(err)
          reject(`Create DB Query Failed: ${err.message}`)
        }

        // query executed successfully
        resolve()
      })

      connection.execSql(request)
    })
  })
}

async function testConnection(sequelize) {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}
