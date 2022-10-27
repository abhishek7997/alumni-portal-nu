const config = require("../config/config")
const sql = require("mssql")

const createEventPost = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const user_id = req.user.user_id
    // const event_type = 1
    const title = req.body.title
    const event_description = req.body.event_description
    const event_start_time = req.body.event_start_time // 2022-10-10
    const event_end_time = req.body.event_end_time
    const venue = req.body.venue

    const query = `INSERT INTO user_posts ([user_id], post_type) VALUES
(${user_id}, 1);
INSERT INTO event_posts ([user_id], title, event_description, event_start_time, event_end_time, venue) VALUES
(${user_id}, '${title}', '${event_description}', '${event_start_time}', '${event_end_time}', '${venue}');`

    await pool.request().query(query)

    res.status(201).json({
      success: true,
      message: "Event post created",
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getAllEventPosts = async (req, res) => {
  try {
    let pool = await sql.connect(config)

    const query =
      "SELECT U.[user_name], EP.* FROM event_posts EP, users U WHERE EP.[user_id] = U.[user_id];"

    const event_posts = await pool.request().query(query)

    res.status(201).json({
      success: true,
      data: event_posts.recordset,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getEventPostsByUserId = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const user_id = req.params.user_id
    const query = `SELECT EP.* FROM event_posts EP WHERE EP.[user_id] = ${user_id};`
    const event_posts = await pool.request().query(query)
    res.status(201).json({
      success: true,
      data: event_posts.recordset,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const createAlumniPost = async (req, res) => {
  try {
    const user_id = req.user.user_id
    const content = req.body.content
    const media = req.body.media ?? null

    const query = `INSERT INTO user_posts ([user_id], post_type) VALUES (${user_id}, 2);INSERT INTO alumni_posts ([user_id], content) VALUES (${user_id}, '${content}');`

    let pool = await sql.connect(config)
    await pool.request().query(query)
    res.status(201).json({
      success: true,
      message: "Alumni Post created",
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getAllAlumniPosts = async (req, res) => {
  try {
    const query = `SELECT U.[user_name], AP.post_id, AP.content, AP.created_at FROM alumni_posts AP, users U WHERE AP.[user_id] = U.[user_id];`
    let pool = await sql.connect(config)
    const alumni_posts = await pool.request().query(query)

    res.status(201).json({
      success: true,
      data: alumni_posts.recordset,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getAlumniPostsByUserId = async (req, res) => {
  try {
    const user_id = req.params.user_id
    const query = `SELECT U.[user_name], AP.* FROM alumni_posts AP, users U WHERE AP.[user_id] = U.[user_id] AND AP.[user_id] = ${user_id};`

    let pool = await sql.connect(config)
    const alumni_posts = await pool.request().query(query)
    res.status(201).json({
      success: true,
      data: alumni_posts.recordset,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const addPostComment = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const user_id = req.user.user_id
    const post_id = req.body.post_id
    const content = req.body.content
    const query = `INSERT INTO post_comments (post_id, [user_id], content) VALUES (${post_id}, ${user_id}, '${content}');`
    await pool.request().query(query)
    res.status(201).json({
      success: true,
      message: "Comment added!",
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getAllPostComments = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const query_EP = `SELECT PC.*, EP.title AS post_title, U.[user_name] FROM post_comments PC, event_posts EP, users U WHERE PC.post_id = EP.post_id AND PC.[user_id] = U.[user_id];`
    const event_posts_comments = await pool.request().query(query_EP)

    const query_AP = `SELECT PC.* , AP.content AS post_content, U.[user_name] FROM post_comments PC, alumni_posts AP, users U WHERE PC.post_id = AP.post_id AND PC.[user_id] = U.[user_id];`
    const alumni_posts_comments = await pool.request().query(query_AP)

    res.status(201).json({
      success: true,
      data: {
        event_posts_comments: event_posts_comments.recordset,
        alumni_posts_comments: alumni_posts_comments.recordset,
      },
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getPostCommentsOfPostById = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const post_id = parseInt(req.params.post_id, 10)
    const query = `SELECT PC.*, U.[user_name] from post_comments PC, users U WHERE PC.post_id = ${post_id} AND PC.[user_id] = U.[user_id];`
    const post_comments = await pool.request().query(query)
    res.status(201).json({
      success: true,
      data: post_comments.recordset,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

module.exports = {
  getAllEventPosts,
  createEventPost,
  getEventPostsByUserId,
  createAlumniPost,
  getAlumniPostsByUserId,
  getAllAlumniPosts,
  addPostComment,
  getAllPostComments,
  getPostCommentsOfPostById,
}
