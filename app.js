const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");
const getConnection = require("./db");

const app = express();
app.use(express.json());
app.use(cors()); // 외부(GitHub Pages) 접근 허용

app.get("/", (req, res) => {
  res.send("Birthday Back Server is running");
});

// 1. 메시지 저장 API (POST)
app.post("/api/messages", async (req, res) => {
  let conn;
  try {
    const { writer, content } = req.body;
    conn = await getConnection();
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
    conn = await getConnection();
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

// 서버 시작 전체ip를 허용.
app.listen(3000, "0.0.0.0", () => console.log("Server running on port 3000"));
