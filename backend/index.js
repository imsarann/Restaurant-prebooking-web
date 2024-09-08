const express = require("express");//
const cors = require("cors");//
require('dotenv').config();
const mainrouter = require("./Routes/index");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
console.log("entered backend")
app.use("/res", mainrouter);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
  console.log("error in server")
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
