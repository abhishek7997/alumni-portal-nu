const config = require("../config/config")
const sql = require("mssql")
const db = require("../utils/orm")
const { Sequelize, Op } = require("sequelize")

const createEventPost = async (req, res) => {
  try {
    let pool = await sql.connect(config)
    const post_user_id = req.user.usr_id
    // const event_type = 1
    const title = req.body.title
    const event_description = req.body.event_description
    const event_start_time = req.body.event_start_time // 2022-10-10
    const event_end_time = req.body.event_end_time
    const venue = req.body.venue

    console.log("post_user_id = ", post_user_id)
    const query = `INSERT INTO user_posts (post_user_id) VALUES (${post_user_id});
    INSERT INTO event_posts (post_id, ep_user_id, title, event_description, event_start_time, event_end_time, venue) VALUES (SCOPE_IDENTITY(), ${post_user_id}, '${title}', '${event_description}', '${event_start_time}', '${event_end_time}', '${venue}');`

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
      "SELECT EP.* FROM users U, event_posts EP WHERE U.usr_id = EP.ep_user_id;"

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
    const query = `SELECT EP.* FROM users U, event_posts EP
WHERE U.usr_id = ${user_id} AND EP.ep_user_id = U.usr_id;`
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

const createGeneralPost = async (req, res) => {
  try {
    const post_user_id = parseInt(req.user.usr_id, 10)
    const content = req.body.content
    // const media = req.body.media ?? null

    //     const query = `INSERT INTO user_posts (post_user_id) VALUES (${post_user_id});
    // INSERT INTO general_posts (post_id, gp_user_id, content) VALUES (SCOPE_IDENTITY(), ${post_user_id}, '${content}');`

    const userpost = await db.UserPost.create({
      post_user_id: post_user_id,
    })

    const general_post = await db.GeneralPost.create({
      post_id: userpost.post_id,
      gp_user_id: post_user_id,
      content: content,
    })

    if (general_post === null) {
      throw "Error occured when creating general Post"
    }

    res.status(201).json({
      success: true,
      message: "General Post created",
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getAllGeneralPosts = async (req, res) => {
  try {
    // const query =
    //   "SELECT CONCAT(U.first_name, ' ', last_name) AS full_name, GP.*FROM users U, general_posts GP WHERE U.usr_id = GP.gp_user_id ORDER BY created_at DESC;"
    // let pool = await sql.connect(config)
    // const general_posts = await pool.request().query(query)

    const general_posts = await db.GeneralPost.findAll({
      include: [
        {
          model: db.UserPost,
          include: {
            model: db.User,
            attributes: ["first_name", "last_name", "user_image"],
          },
        },
      ],
      order: [["created_at", "DESC"]],
      raw: true,
    })

    const transformedPosts = general_posts.map((post) => {
      return {
        post_id: post.post_id,
        gp_user_id: post.gp_user_id,
        content: post.content,
        media: post.media,
        created_at: post.created_at,
        first_name: post["UserPost.User.first_name"],
        last_name: post["UserPost.User.last_name"],
        user_image: post["UserPost.User.user_image"],
      }
    })

    res.status(201).json({
      success: true,
      data: transformedPosts,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getGeneralPostsByUserId = async (req, res) => {
  try {
    const gp_user_id = req.params.user_id
    // const query = `SELECT GP.* FROM users U, general_posts GP WHERE U.usr_id = ${gp_user_id} and GP.gp_user_id = U.usr_id;`

    const general_posts = await db.GeneralPost.findAll({
      where: { gp_user_id: gp_user_id },
      attributes: [
        "post_id",
        "gp_user_id",
        "content",
        "media",
        "created_at",
        "UserPost.User.user_image",
        "UserPost.User.first_name",
        "UserPost.User.last_name",
      ],
      include: [
        {
          model: db.UserPost,
          attributes: [],
          include: {
            model: db.User,
            attributes: [],
            where: {
              usr_id: gp_user_id,
            },
          },
        },
      ],
      order: [["created_at", "DESC"]],
      raw: true,
    })

    res.status(201).json({
      success: true,
      data: general_posts,
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
    const pc_user_id = req.user.usr_id
    const post_id = req.body.post_id
    const content = req.body.content

    const result = await db.PostComment.create({
      post_id,
      pc_user_id,
      content,
    })

    const results = await db.PostComment.findOne({
      where: {
        post_comment_id: result.post_comment_id,
      },
      include: {
        model: db.User,
        where: {
          usr_id: { [Op.eq]: Sequelize.col("PostComment.pc_user_id") },
        },
        attributes: ["first_name", "last_name"],
      },
      order: [["created_at", "DESC"]],
    })

    res.status(201).json({
      success: true,
      data: results.toJSON(),
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
    const query_EP =
      "SELECT PC.*, EP.title AS post_title FROM post_comments PC, event_posts EP, users U WHERE PC.post_id = EP.post_id AND PC.pc_user_id = U.usr_id;"
    const event_posts_comments = await pool.request().query(query_EP)

    const query_GP =
      "SELECT PC.*, GP.content as post_content FROM post_comments PC, general_posts GP, users U WHERE PC.post_id = GP.post_id AND PC.pc_user_id = U.usr_id;"
    const general_posts_comments = await pool.request().query(query_GP)

    res.status(201).json({
      success: true,
      data: {
        event_posts_comments: event_posts_comments.recordset,
        general_posts_comments: general_posts_comments.recordset,
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
    // const query = `SELECT PC.* FROM users U, post_comments PC WHERE PC.post_id = ${post_id} AND PC.pc_user_id = U.usr_id;`
    // const post_comments = await pool.request().query(query)

    const results = await db.PostComment.findAll({
      where: {
        post_id: post_id,
      },
      include: {
        model: db.User,
        where: {
          usr_id: { [Op.eq]: Sequelize.col("PostComment.pc_user_id") },
        },
        attributes: ["first_name", "last_name"],
      },
      order: [["created_at", "DESC"]],
    })

    res.status(201).json({
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

const updateGeneralPost = async (req, res) => {
  try {
    const post_user_id = parseInt(req.user.usr_id, 10)
    const { post_id } = req.params
    const { content } = req.body

    const [numRowsUpdated, [updatedPost]] = await db.GeneralPost.update(
      {
        content: content,
      },
      {
        where: {
          gp_user_id: post_user_id,
          post_id: post_id,
        },
        returning: true,
      }
    )

    if (numRowsUpdated === 0) {
      res.status(404).json({
        success: false,
        error: "Invalid post or invalid user",
      })
      return
    }

    res.status(200).json({
      success: true,
      data: updatedPost,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const deleteGeneralPost = async (req, res) => {
  try {
    const user_id = parseInt(req.user.usr_id, 10)
    const post_id = parseInt(req.params.post_id, 10)

    if (isNaN(user_id) || isNaN(post_id)) {
      res.status(401).json({
        success: false,
        error: "Login to access resource",
      })
    }

    const rows = await db.UserPost.destroy({
      where: {
        post_id: post_id,
        post_user_id: user_id,
      },
    })

    if (rows !== 1) {
      res.status(404).json({
        success: false,
        error: "Post not found",
      })
      return
    }

    res.status(201).json({
      success: true,
      data: post_id,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `${err}`,
    })
  }
}

const getGeneralPostDetails = async (req, res) => {
  try {
    const post_id = parseInt(req.params.post_id, 10)

    if (isNaN(post_id)) {
      res.status(401).json({
        success: false,
        error: "Invalid post id",
      })
      return
    }

    const postDetail = await db.GeneralPost.findByPk(post_id, {
      include: [
        {
          model: db.UserPost,
          include: [
            {
              model: db.User,
              attributes: ["first_name", "last_name"],
            },
          ],
        },
      ],
    })

    const { gp_user_id, content, media, created_at, UserPost } = postDetail
    const { first_name, last_name } = UserPost.User

    if (!postDetail) {
      res.status(404).json({
        success: false,
        error: "Post not found",
      })
      return
    }

    res.status(200).json({
      success: true,
      data: {
        post_id,
        gp_user_id,
        content,
        media,
        created_at,
        first_name,
        last_name,
      },
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
  createGeneralPost,
  getGeneralPostsByUserId,
  getAllGeneralPosts,
  addPostComment,
  getAllPostComments,
  getPostCommentsOfPostById,
  updateGeneralPost,
  deleteGeneralPost,
  getGeneralPostDetails,
}
