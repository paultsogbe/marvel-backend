require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// import des routes
const comicRoutes = require("./routes/comic");
const characterRoutes = require("./routes/character");
app.use(comicRoutes);
app.use(characterRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hi" });
});

app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

const server = app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
server.timeout = Number(process.env.SERVER_TIMEOUT) || 1000000;
