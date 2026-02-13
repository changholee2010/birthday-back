const oracledb = require("oracledb");

// oracledb.initOracleClient({ libDir: "/usr/lib/oracle" });

async function getConnection() {
  return await oracledb.getConnection({
    user: "user01",
    password: "user01",
    connectString: "localhost:1521/xepdb1",
  });
}

module.exports = getConnection;
