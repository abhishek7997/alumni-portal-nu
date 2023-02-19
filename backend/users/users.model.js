const { DataTypes } = require("sequelize")

function User(sequelize) {
  const attributes = {
    usr_id: { type: DataTypes.BIGINT, primaryKey: true, autoincrement: true },
    is_admin: { type: DataTypes.BOOLEAN, default: false },
    first_name: { type: DataTypes.STRING(64), allowNull: false },
    last_name: { type: DataTypes.STRING(64), allowNull: true },
    email_address: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    mobile_number: { type: DataTypes.STRING(32) },
    pass_hash: { type: DataTypes.STRING(256), allowNull: false },
    user_image: { type: DataTypes.STRING(1024) },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }

  const options = {
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: ["pass_hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
    tableName: "users",
    timestamps: false,
  }

  return sequelize.define("User", attributes, options)
}

function GeneralUser(sequelize) {
  const attributes = {
    gu_user_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoincrement: false,
    },
    batch: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    user_bio: {
      type: DataTypes.STRING(2048),
    },
    user_company: {
      type: DataTypes.STRING(64),
    },
    user_location: {
      type: DataTypes.STRING(128),
    },
    user_job: {
      type: DataTypes.STRING(64),
    },
    user_resume: {
      type: DataTypes.STRING(2048),
    },
  }

  const options = {
    tableName: "general_users",
    timestamps: false,
  }

  return sequelize.define("GeneralUser", attributes, options)
}

module.exports = { User, GeneralUser }
