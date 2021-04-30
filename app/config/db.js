module.exports = {
  HOST: "mysqldb",
  USER: "root",
  PASSWORD: "jainamit6@",
  DB: "resync",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
