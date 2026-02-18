const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // 외부(GitHub Pages) 접근 허용

app.get("/", (req, res) => {
  res.send("Birthday Back Server is running");
});

// 라우터 등록
const birthRoutes = require("./routes/birth-routes");
app.use("/api", birthRoutes);

// 서버 시작 전체ip를 허용.
app.listen(3000, "0.0.0.0", () => console.log("Server running on port 3000"));
