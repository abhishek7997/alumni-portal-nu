const config = require("../config/config")
const sql = require("mssql")

const addDocument = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const default_doc = "https://drive.google.com"
    const { user_id, doc_type, document = default_doc, description } = req.body
    const query = `INSERT INTO documents (doc_user_id, doc_type, document, [description]) VALUES (${user_id}, '${doc_type}', '${document}', '${description}');`

    await pool.request().query(query)

    res.status(201).json({
      success: true,
      message: "Document added successfully",
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getAllDocuments = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const documents = await pool
      .request()
      .query(
        "SELECT U.[user_name], U.first_name, U.last_name, D.doc_type, D.document, D.[description] FROM users U, documents D WHERE U.usr_id = D.doc_user_id;"
      )
    res.status(200).json({
      success: true,
      data: documents.recordset,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

module.exports = {
  addDocument,
  getAllDocuments,
}
