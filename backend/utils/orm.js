require("dotenv").config()
const tedious = require("tedious")
const { Sequelize } = require("sequelize")
const { User, GeneralUser, Admin } = require("../users/users.model")
const { UserPost, GeneralPost, PostComment } = require("../posts/posts.model")

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
  db.Admin = Admin(sequelize)
  db.UserPost = UserPost(sequelize)
  db.GeneralPost = GeneralPost(sequelize)
  db.PostComment = PostComment(sequelize)
  db.sequelize = sequelize

  db.User.hasOne(db.GeneralUser, {
    foreignKey: "gu_user_id",
  })

  db.User.hasOne(db.Admin, {
    foreignKey: "adm_user_id",
  })

  db.GeneralUser.belongsTo(db.User, {
    foreignKey: "gu_user_id",
    onDelete: "CASCADE",
  })

  db.Admin.belongsTo(db.User, {
    foreignKey: "adm_user_id",
    onDelete: "CASCADE",
  })

  db.UserPost.belongsTo(db.User, {
    foreignKey: "post_user_id",
    onDelete: "CASCADE",
  })

  db.User.hasMany(db.UserPost, { foreignKey: "post_user_id" })
  db.UserPost.belongsTo(db.User, {
    foreignKey: "post_user_id",
    onDelete: "CASCADE",
  })

  db.UserPost.hasOne(db.GeneralPost, { foreignKey: "post_id" })
  db.GeneralPost.belongsTo(db.UserPost, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
  })

  db.UserPost.hasMany(db.PostComment, { foreignKey: "post_id" })
  db.PostComment.belongsTo(db.UserPost, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
  })

  // db.User.hasMany(db.PostComment, { foreignKey: "pc_user_id" })
  db.PostComment.belongsTo(db.User, {
    foreignKey: "pc_user_id",
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
