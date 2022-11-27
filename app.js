require("dotenv").config({ path: "configs/.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const apis = require('./routes/routes')
const path = require("path")

app.use(cors());
app.use(express.json());
app.use(cookieParser(

));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

if (process.env.NODE_ENV === "production") {
  // app.use(express.static("client/build"));
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}


app.use("/api", apis);

app.listen(process.env.PORT || 8000, () => console.log("server is listening on 8000"));
