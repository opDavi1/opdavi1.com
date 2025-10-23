const express = require("express")
const path = require("path")
const sqlite3 = require("sqlite3")
const app = express()
const port = 3000

const db = new sqlite3.Database("data.db")

db.run("CREATE TABLE IF NOT EXISTS visitorcount (page TEXT PRIMARY KEY, visits INTEGER)")

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
  db.get('SELECT visits FROM visitorcount WHERE page = "index"', (err, row) => {
    if(err) {
      res.render("pages/index")
      return;
    }
    if (row == undefined) {
      db.run('INSERT INTO visitorcount (page, visits) VALUES ("index", 1)')
    }
    visitorCount = row.visits + 1;
    db.run('UPDATE visitorcount SET visits = ? WHERE page = "index"', visitorCount)
    res.render("pages/index", { visitorCount: visitorCount })
  })
})

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "pages", "about.html"))
})

app.get("/pgp", (req, res) => {
  res.contentType("text/plain").sendFile(path.join(__dirname, "public", "pgp.pub"))
})

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "pages", "404.html"))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})