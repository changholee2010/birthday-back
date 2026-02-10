const express = require("express");
const cors = require("cors");
const getConnection = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/messages", async (req, res) => {
  const { name, message } = req.body;
  const conn = await getConnection();

  await conn.execute(
    `INSERT INTO birthday_messages (name, message)
     VALUES (:name, :message)`,
    { name, message },
    { autoCommit: true },
  );

  await conn.close();
  res.json({ success: true });
});

app.get("/api/messages", async (req, res) => {
  const conn = await getConnection();
  const result = await conn.execute(
    `SELECT name, message FROM birthday_messages ORDER BY id DESC`,
  );
  await conn.close();
  res.json(result.rows);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on 3000");
});
