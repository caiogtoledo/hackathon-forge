const path = require("path");
const express = require("express");
const db = require("./databases/mongo")();
console.log(db);
///////////////////////////

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
};
///////////////////////////

const PORT = process.env.PORT || 3003;
const config = require("./config");
const registers = require("./routes/registers");
if (
  config.credentials.client_id == null ||
  config.credentials.client_secret == null
) {
  console.error(
    "Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables."
  );
  return;
}

let app = express();
app.use(express.static(path.join(__dirname, "public")));
// app.use("/build", express.static(path.join(__dirname, "build")));

// app.get("*", (req, res) => {
//   const route = path.join(__dirname, "..", "client", "build", "index.html");
//   res.sendFile(route);
// });

app.use(express.json({ limit: "50mb" }));
app.use("/api/forge/oauth", require("./routes/oauth"));
app.use("/api/forge/oss", require("./routes/oss"));
app.use("/api/forge/modelderivative", require("./routes/modelderivative"));
app.get("/registers", registers.all);
app.get("/registers/:name", registers.getByName);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode).json(err);
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
