const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");
require("dotenv").config(); // DB 접속 정보를 환경변수로 관리

const app = express();
app.use(express.json());
app.use(cors()); // 외부(GitHub Pages) 접근 허용

// Oracle DB 연결 설정
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING, // 예: localhost:1521/xe
};

app.get("/", (req, res) => {
  res.send("생일 축하 메시지 API 서버입니다!");
});

// 1. 메시지 저장 API (POST)
app.post("/api/messages", async (req, res) => {
  let conn;
  try {
    const { writer, content } = req.body;
    conn = await oracledb.getConnection(dbConfig);
    const sql = `INSERT INTO CHURCH_MESSAGES (WRITER, CONTENT) VALUES (:writer, :content)`;
    await conn.execute(sql, { writer, content }, { autoCommit: true });
    res.status(201).send({ message: "축하 메시지가 등록되었습니다!" });
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (conn) await conn.close();
  }
});

// 2. 메시지 목록 조회 API (GET)
app.get("/api/messages", async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT WRITER, CONTENT FROM CHURCH_MESSAGES ORDER BY REG_DATE DESC`,
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    if (conn) await conn.close();
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
