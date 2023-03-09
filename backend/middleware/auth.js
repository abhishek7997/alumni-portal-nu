const jwt = require("jsonwebtoken")
const sql = require("mssql")
const config = require("../config/config")
const db = require("../utils/orm")

exports.isAuthenticatedUser = async (req, res, next) => {
  const { accessToken } = req.cookies
  if (!accessToken) {
    return next(
      res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      })
    )
  }

  const decodedData = jwt.verify(accessToken, process.env.JWT_SECRET)

  const user = await db.User.findOne({
    where: {
      usr_id: decodedData.user_id,
    },
    attributes: ["usr_id"],
  })
  if (!user) {
    return next(
      res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      })
    )
  }

  console.log("user: ", JSON.stringify(user))
  req.user = user
  next()
}
