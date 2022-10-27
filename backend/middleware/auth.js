const jwt = require("jsonwebtoken")
const sql = require("mssql")
const config = require("../config/config")

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

  let pool = await sql.connect(config)
  const user = await pool
    .request()
    .query(
      `SELECT user_id, user_name FROM users WHERE user_id = '${decodedData.user_id}'`
    )

  req.user = user.recordset[0]
  next()
}
