const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// notes.html connected to local host
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// reads db to collect data
let noteData;
function readDb() {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    noteData = data;
  });
}
readDb();
//note saved to the backend
app.post("/api/notes", (req, res) => {
  const notesSaved = JSON.parse(noteData);
  req.body.id = uuidv4();
  notesSaved.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(notesSaved), (err) =>
    err ? console.error(err) : console.log(`New note added to the database!!`)
  );
  res.send(req.body);
});

// db connected to local host
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);

//backend listening to app
app.listen(PORT, () => console.log(`${PORT} PORT is listening`));
