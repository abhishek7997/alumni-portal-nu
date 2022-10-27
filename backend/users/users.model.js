const { DataTypes } = require("sequelize")

function User(sequelize) {
  const attributes = {
    user_id: { type: DataTypes.BIGINT, primaryKey: true, autoincrement: true },
    is_admin: { type: DataTypes.BOOLEAN, allowNull: false, default: false },
    user_name: { type: DataTypes.STRING(128), allowNull: false },
    first_name: { type: DataTypes.STRING(64), allowNull: false },
    last_name: { type: DataTypes.STRING(64), allowNull: true },
    pass_hash: { type: DataTypes.STRING(256), allowNull: false },
    email: { type: DataTypes.STRING(64), allowNull: false },
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

module.exports = User
