const oracledb = require("oracledb");
const path = require("path");
require("dotenv").config();

// Wallet 디렉토리의 절대 경로 설정
const walletPath = path.join(__dirname, "..", "wallet");
console.log("Wallet Path:", walletPath);

async function run() {
  try {
    // 1. Oracle Client 초기화 (Wallet 경로 지정)
    // TNS_ADMIN은 tnsnames.ora와 sqlnet.ora가 있는 위치입니다.
    // await oracledb.initOracleClient({ configDir: walletPath });
    try {
      oracledb.initOracleClient({
        // Instant Client 라이브러리 위치
        libDir: "/opt/oracle/instantclient_21_21",
        // tnsnames.ora, sqlnet.ora가 있는 Wallet 위치
        configDir: "/home/ubuntu/wallet",
      });
    } catch (err) {
      console.error("Oracle Client 초기화 실패:", err);
      process.exit(1);
    }

    // 2. DB 연결
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER_R,
      password: process.env.DB_PASSWORD_R,
      connectionString: process.env.DB_CONNECT_STRING_R, // tnsnames.ora에 정의된 이름
    });

    console.log("Oracle Wallet으로 접속 성공!");

    // ... 쿼리 실행 ...
    const result = await connection.execute(
      `select * from CHURCH_MESSAGES`,
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    // 결과 출력
    console.log(result.rows);
  } catch (err) {
    console.error(err);
  }
}

run();

// const getConnection = require("./db");

// async function main() {
//   let conn;
//   conn = await getConnection();
//   const result = await conn.execute(
//     `SELECT WRITER, CONTENT FROM CHURCH_MESSAGES ORDER BY REG_DATE DESC`,
//     {},
//     { outFormat: oracledb.OUT_FORMAT_OBJECT },
//   );

//   console.log(result.rows);
// }
// main();
