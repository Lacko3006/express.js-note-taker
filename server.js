const express = require("express");
const app = express();
const PORT = 3001;
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// notes.html connected to local host
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// reads db to collect data
let noteData
fs.readFile("./db/db.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  noteData = data;
});

// db connected to local host
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);

app.listen(PORT, () => console.log(`${PORT} PORT is listening`));
