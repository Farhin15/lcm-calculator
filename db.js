const { Pool } = require("pg");

var connectionString = "postgres://postgres:123456@localhost:5432/nodeapp";
const pool = new Pool({
  connectionString
})

module.exports = pool;
