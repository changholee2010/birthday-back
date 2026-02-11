const oracledb = require("oracledb");

// oracledb.initOracleClient({ libDir: "/usr/lib/oracle" });
oracledb.initOracleClient({
  // Instant Client 라이브러리 위치
  libDir: "/opt/oracle/instantclient_21_21",
  // tnsnames.ora, sqlnet.ora가 있는 Wallet 위치
  configDir: "/home/ubuntu/wallet",
});

async function getConnection() {
  return await oracledb.getConnection({
    user: "user01",
    password: "dhfkzmfDB2010",
    connectString: "gce4l3azna7cfunu_high",
  });
}

module.exports = getConnection;
