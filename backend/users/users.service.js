const config = require("../config/config")
const sql = require("mssql")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")

const registerAlumnus = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const user_name = req.body.user_name
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const enrollment_no = req.body.enrollment_no
    const batch = parseInt(req.body.batch, 10)
    const user_company = req.body.user_company
    const user_job = req.body.user_job
    // let pass_hash = await bcryptjs.hash(req.body.pass_hash, 10)
    const pass_hash = req.body.pass_hash

    if (batch < 2017) {
      res.status(422).json({
        success: false,
        message: "Year must be greater than 2016 for alumnus",
      })
      return
    }

    const user_record = await pool
      .request()
      .query(`SELECT * FROM users WHERE user_name = '${user_name}'`)

    if (user_record.recordset.length > 0) {
      res.status(409).json({
        success: false,
        message: "Username already exists!",
      })
      return
    }

    const email_record = await pool
      .request()
      .query(`SELECT * FROM users WHERE email = '${email}'`)

    if (email_record.recordset.length > 0) {
      res.status(409).json({
        success: false,
        message: "Email address is already in use",
      })
      return
    }

    await pool
      .request()
      .query(
        `INSERT INTO users ([user_name], first_name, last_name, email, pass_hash) VALUES ('${user_name}', '${first_name}', '${last_name}', '${email}', '${pass_hash}');INSERT INTO alumni VALUES (SCOPE_IDENTITY(), '${enrollment_no}', ${batch}, '${user_company}', '${user_job}');`
      )

    res.status(201).json({
      success: true,
      message: "User has been created. Now you can login",
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const loginAlumnus = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    let user_name = req.body.user_name
    let password = req.body.password

    const user_record = await pool
      .request()
      .query(
        `SELECT TOP 1 user_id FROM users WHERE user_name = '${user_name}' AND pass_hash = '${password}';`
      )

    if (user_record.recordset.length == 0) {
      res.status(401).json({
        success: false,
        message: "Username or password invalid!",
      })
      return
    }

    const user_id = parseInt(user_record.recordset[0]["user_id"], 10)

    const accessToken = jwt.sign({ user_id: user_id }, process.env.JWT_SECRET)
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    }

    res.cookie("accessToken", accessToken, options).json({
      success: true,
      message: "Logged in",
      accessToken: accessToken,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const logoutAlumnus = async (req, res) => {
  try {
    res.clearCookie("accessToken")
    res.json({
      success: true,
      message: "Logged out",
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const deleteAlumnus = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const user_id = req.user.user_id

    await pool
      .request()
      .query(`DELETE FROM users WHERE is_admin = 0 AND [user_id] = ${user_id};`)
    res.status(201).json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getAllAlumniDetails = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const alumnis = await pool
      .request()
      .query(
        "SELECT U.*, A.* FROM users U, alumni A WHERE U.[user_id] = A.[user_id];"
      )
    res.status(200).json({
      success: true,
      data: alumnis.recordset,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const users = await pool.request().query("SELECT * from users;")
    res.status(200).json({
      success: true,
      data: users.recordset,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getAlumnusById = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const user_id = parseInt(req.params.user_id, 10)

    if (isNaN(user_id)) {
      res.status(400).json({
        success: false,
        error: "User Id provided is not a valid id",
      })
      return
    }

    const users = await pool
      .request()
      .query(
        `SELECT U.[user_id], U.[user_name], U.first_name, U.last_name, U.email, A.enrollment_no, A.batch, A.user_company, A.user_job FROM users U, alumni A WHERE U.[user_id] = ${user_id} AND A.[user_id] = U.[user_id];`
      )

    if (users.recordset.length == 0) {
      res.status(404).json({
        success: false,
        error: "User id does not exist",
      })
      return
    }

    res.status(200).json({
      success: true,
      data: users.recordset,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

// const deleteUser = async (req, res) => {
//   try {
//     let pool = await sql.connect(config)
//     const user_id = parseInt(req.user.user_id, 10)
//     if (!user_id) {
//       res.status(422).json({
//         success: true,
//         message: "User id is invalid",
//       })
//       return
//     }

//     const query = `DELETE FROM users WHERE [user_id] = ${user_id};`
//     await pool.request().query(query)
//     res.status(200).json({
//       success: true,
//       message: "User deleted",
//     })
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: `${err}`,
//     })
//   }
// }

module.exports = {
  registerAlumnus,
  loginAlumnus,
  logoutAlumnus,
  deleteAlumnus,
  getAllAlumniDetails,
  getAllUsers,
  getAlumnusById,
  // ssdeleteUser,
}
