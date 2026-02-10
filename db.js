const oracledb = require("oracledb");

oracledb.initOracleClient({ libDir: "/usr/lib/oracle" });

async function getConnection() {
  return await oracledb.getConnection({
    user: "user01",
    password: "dhfkzmfDB2010",
    connectString: "gce4l3azna7cfunu_high",
  });
}

module.exports = getConnection;
