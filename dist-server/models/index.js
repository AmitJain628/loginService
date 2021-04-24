"use strict";

var _db = _interopRequireDefault(require("../config/db.js"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sequelize = new _sequelize.default(_db.default.DB, _db.default.USER, _db.default.PASSWORD, {
  host: _db.default.HOST,
  dialect: _db.default.dialect,
  operatorsAliases: false,
  pool: {
    max: _db.default.pool.max,
    min: _db.default.pool.min,
    acquire: _db.default.pool.acquire,
    idle: _db.default.pool.idle
  }
});
const db = {};
db.Sequelize = _sequelize.default;
db.sequelize = sequelize;
db.user = require("./user.js")(sequelize, _sequelize.default);
db.country = require("./country")(sequelize, _sequelize.default);
module.exports = db;