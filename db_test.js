const oracledb = require("oracledb");
const path = require("path");

// Wallet 디렉토리의 절대 경로 설정
const walletPath = path.join(__dirname, "..", "wallet");
console.log("Wallet Path:", walletPath);

async function run() {
  try {
    // 1. Oracle Client 초기화 (Wallet 경로 지정)
    // TNS_ADMIN은 tnsnames.ora와 sqlnet.ora가 있는 위치입니다.
    await oracledb.initOracleClient({ configDir: walletPath });

    // 2. DB 연결
    const connection = await oracledb.getConnection({
      user: "user01",
      password: "dhfkzmfDB2010",
      connectionString: "gce4l3azna7cfunu_high", // tnsnames.ora에 정의된 이름
    });

    console.log("Oracle Wallet으로 접속 성공!");

    // ... 쿼리 실행 ...
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
