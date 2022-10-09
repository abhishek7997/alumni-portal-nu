const config = require("./config")
const sql = require("mssql")

const getAlumniAccounts = async () => {
  try {
    let pool = await sql.connect(config)
    let alumnis = await pool.request().query("SELECT * FROM alumni_accounts;")
    return alumnis
  } catch (err) {
    console.warn(err)
    return err
  }
}

module.exports = getAlumniAccounts
