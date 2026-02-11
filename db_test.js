const getConnection = require("./db");

async function main() {
  let conn;
  conn = await getConnection();
  const result = await conn.execute(
    `SELECT WRITER, CONTENT FROM CHURCH_MESSAGES ORDER BY REG_DATE DESC`,
    {},
    { outFormat: oracledb.OUT_FORMAT_OBJECT },
  );

  console.log(result.rows);
}
main();
