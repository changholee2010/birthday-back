const router = require("express").Router();
const oracledb = require("oracledb");
const getConnection = require("../db");

router.get("/", (req, res) => {
  res.send("API is working...ready to accept requests");
});

// 1. 메시지 저장 API (POST)
router.post("/messages", async (req, res) => {
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
router.get("/messages", async (req, res) => {
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

module.exports = router;
