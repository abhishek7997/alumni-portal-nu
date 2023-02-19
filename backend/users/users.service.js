const config = require("../config/config")
const sql = require("mssql")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const db = require("../utils/orm")
const { Sequelize, Op } = require("sequelize")

// ============================================
// General Users related operations
// ============================================

const registerAlumnus = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email_address,
      mobile_number,
      pass_hash,
      user_image,
      batch,
      user_bio,
      user_company,
      user_location,
      user_job,
      user_resume,
    } = req.body

    if (batch < 2009) {
      res.status(422).json({
        success: false,
        message: "Year must be greater than 2009 for alumnus",
      })
      return
    }

    const user_record = await db.User.findOne({
      attributes: ["email_address"],
      where: {
        email_address: email_address,
      },
    })

    if (user_record !== null) {
      res.status(409).json({
        success: false,
        message: "Email address is already in use",
      })
      return
    }

    const curr_user = await db.User.create(
      {
        first_name,
        last_name,
        email_address,
        mobile_number,
        pass_hash,
        user_image,
      },
      {
        fields: [
          "first_name",
          "last_name",
          "email_address",
          "mobile_number",
          "pass_hash",
          "user_image",
        ],
      }
    )

    const curr_g_user = await db.GeneralUser.create({
      gu_user_id: parseInt(curr_user.usr_id, 10),
      batch,
      user_bio,
      user_company,
      user_location,
      user_job,
      user_resume,
    })

    if (curr_g_user == null) {
      res.status(401).json({
        success: false,
        message: "Username or password invalid!",
      })
      return
    }

    const user_id = parseInt(curr_user.usr_id, 10)

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

const loginAlumnus = async (req, res) => {
  try {
    let email_address = req.body.email_address
    let password = req.body.password

    const user_record = await db.User.findOne({
      attributes: ["usr_id", "email_address", "pass_hash"],
      where: {
        email_address: email_address,
        pass_hash: password,
      },
    })

    if (user_record === null) {
      res.status(401).json({
        success: false,
        message: "Username or password invalid!",
      })
      return
    }

    const user_id = parseInt(user_record.usr_id, 10)

    const accessToken = jwt.sign({ user_id: user_id }, process.env.JWT_SECRET)
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    }

    res.cookie("accessToken", accessToken, options)
    res.status(200).json({
      success: true,
      message: "Logged in",
      accessToken,
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
    const usr_id = parseInt(req.user.user_id, 10)

    // await pool
    //   .request()
    //   .query(`DELETE FROM users WHERE is_admin = 0 AND usr_id = ${user_id};`)
    await db.User.destroy({
      where: {
        usr_id: usr_id,
      },
    })

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

const getAllGeneralDetails = async (req, res) => {
  try {
    const [results, metadata] = await db.sequelize.query(
      "SELECT usr_id, first_name, last_name, email_address, mobile_number, pass_hash, batch, user_bio, user_company, user_location, user_job, user_resume FROM users U, general_users GU WHERE U.usr_id = GU.gu_user_id;"
    )

    // const records = await db.User.findAll({
    //   attributes: [
    //     "usr_id",
    //     "first_name",
    //     "last_name",
    //     "email_address",
    //     "mobile_number",
    //     "pass_hash",
    //   ],
    //   where: {},
    //   include: [
    //     {
    //       model: db.GeneralUser,
    //       attributes: [
    //         "batch",
    //         "user_bio",
    //         "user_company",
    //         "user_location",
    //         "user_job",
    //         "user_resume",
    //       ],
    //       where: { gu_user_id: { [Op.eq]: Sequelize.col("usr_id") } },
    //       required: true,
    //     },
    //   ],
    // })

    res.status(200).json({
      success: true,
      data: results,
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
    const users = await db.User.findAll()
    // const [results, metadata] = await db.sequelize.query("SELECT * from users;")

    res.status(200).json({
      success: true,
      data: users,
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
    // let pool = await sql.connect(config)
    const user_id = parseInt(req.params.user_id, 10)

    if (isNaN(user_id)) {
      res.status(400).json({
        success: false,
        error: "User Id provided is not a valid id",
      })
      return
    }

    // const users = await pool
    //   .request()
    //   .query(
    //     `SELECT usr_id, first_name, last_name, email_address, mobile_number, pass_hash, batch, user_bio, user_company, user_location, user_job, user_resume FROM users U, general_users GU WHERE U.usr_id = GU.gu_user_id AND GU.gu_user_id = ${user_id};`
    //   )
    const [users, metadata] = await db.sequelize.query(
      `SELECT usr_id, first_name, last_name, email_address, mobile_number, pass_hash, batch, user_bio, user_company, user_location, user_job, user_resume FROM users U, general_users GU WHERE U.usr_id = GU.gu_user_id AND GU.gu_user_id = ${user_id};`
    )

    if (users === null || users.length === 0) {
      res.status(404).json({
        success: false,
        error: "User id does not exist",
      })
      return
    }

    res.status(200).json({
      success: true,
      data: users[0],
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getCurrentAlumnusDetails = async (req, res) => {
  try {
    const user_id = req.user.usr_id
    let pool = await sql.connect(config)
    const user = await pool
      .request()
      .query(
        `SELECT usr_id, first_name, last_name, email_address, mobile_number, pass_hash, batch, user_bio, user_company, user_location, user_job, user_image, user_resume FROM users U, general_users GU WHERE U.usr_id = GU.gu_user_id AND GU.gu_user_id = ${user_id};`
      )
    res.status(200).json({
      success: true,
      data: user.recordset,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getOtherUsers = async (req, res) => {
  try {
    const user_id = parseInt(req.user.usr_id, 10)
    let pool = await sql.connect(config)
    const user = await pool
      .request()
      .query(
        `SELECT usr_id, CONCAT(first_name, ' ', last_name) AS full_name, batch FROM users, general_users WHERE usr_id != ${user_id} AND general_users.gu_user_id = users.usr_id;`
      )
    res.status(200).json({
      success: true,
      data: user.recordset,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

// ============================================
// Admin Users related operations
// ============================================

const getAllAdmins = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const admins = await pool
      .request()
      .query(
        "SELECT usr_id, first_name, last_name, email_address, mobile_number, pass_hash, [role] FROM users U, admins A WHERE U.usr_id = A.adm_user_id"
      )
    res.status(200).json({
      success: true,
      data: admins.recordset,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const registerAdmin = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const {
      first_name,
      last_name,
      email_address,
      mobile_number,
      pass_hash,
      user_image,
      role,
    } = req.body

    await pool
      .request()
      .query(
        `INSERT INTO users (is_admin, first_name, last_name, email_address, mobile_number, pass_hash, user_image) VALUES (1, '${first_name}', '${last_name}', '${email_address}', '${mobile_number}', '${pass_hash}', '${user_image}'); INSERT INTO admins VALUES (SCOPE_IDENTITY(), '${role}');`
      )
    res.status(200).json({
      success: true,
      message: "User account created",
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
  getAllGeneralDetails,
  getAllUsers,
  getAlumnusById,
  getAllAdmins,
  registerAdmin,
  getCurrentAlumnusDetails,
  getOtherUsers,
  // deleteUser,
}
