const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const HOST = "0.0.0.0";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const idx = require("./routes/index");
app.use("/", idx);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
