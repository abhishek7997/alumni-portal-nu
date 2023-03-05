const { DataTypes, Sequelize } = require("sequelize")

function UserPost(sequelize) {
  const attributes = {
    post_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    post_user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }

  const options = {
    tableName: "user_posts",
    timestamps: false,
    underscored: true,
  }

  return sequelize.define("UserPost", attributes, options)
}

function GeneralPost(sequelize) {
  const attributes = {
    post_id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
    gp_user_id: { type: DataTypes.BIGINT, allowNull: false },
    content: { type: DataTypes.STRING(4000), allowNull: false },
    media: { type: DataTypes.BLOB("long") },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  }

  const options = {
    tableName: "general_posts",
    timestamps: false,
    underscored: true,
  }

  return sequelize.define("GeneralPost", attributes, options)
}

function PostComment(sequelize) {
  const attributes = {
    post_comment_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    pc_user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
  }

  const options = {
    tableName: "post_comments",
    timestamps: false,
  }

  return sequelize.define("PostComment", attributes, options)
}

module.exports = { UserPost, GeneralPost, PostComment }
