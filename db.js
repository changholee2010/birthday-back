const oracledb = require("oracledb");
require("dotenv").config(); // DB 접속 정보를 환경변수로 관리

// Oracle DB 연결 설정
const dbConfig = {
  user: process.env.DB_USER_R,
  password: process.env.DB_PASSWORD_R,
  connectString: process.env.DB_CONNECT_STRING_R, // 예: localhost:1521/xe
};
// oracledb.initOracleClient({ libDir: "/usr/lib/oracle" });
oracledb.initOracleClient({
  // Instant Client 라이브러리 위치
  libDir: "/opt/oracle/instantclient_21_21",
  // tnsnames.ora, sqlnet.ora가 있는 Wallet 위치
  configDir: "/home/ubuntu/wallet",
});

async function getConnection() {
  return await oracledb.getConnection(dbConfig);
}

module.exports = getConnection;
