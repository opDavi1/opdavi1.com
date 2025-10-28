const express = require("express")
const path = require("path")
const sqlite3 = require("sqlite3")
const app = express()
const port = 3000

const db = new sqlite3.Database("data.db")

function renderWithViewCout(res, page) {
  db.get('SELECT visits FROM visitorcount WHERE page = ?', page, (err, row) => {
    if(err) {
      console.error(err)
      res.render(`pages/${page}`)
      return;
    }
    if (row == undefined) {
      db.run('INSERT INTO visitorcount (page, visits) VALUES (?, 1)', page)
      visitorCount = 1
    } else {
      visitorCount = row.visits + 1;
    }
    db.run('UPDATE visitorcount SET visits = ? WHERE page = ?', visitorCount, page)
    res.render(`pages/${page}`, { visitorCount: visitorCount })
  })
}

db.run("CREATE TABLE IF NOT EXISTS visitorcount (page TEXT PRIMARY KEY, visits INTEGER)")

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
  renderWithViewCout(res, "index")
})

app.get("/about", (req, res) => {
  res.render("pages/about")
})

app.get("/minecraft", (req, res) => {
  res.render("pages/minecraft")
})


app.get("/pgp", (req, res) => {
  res.contentType("text/plain").sendFile(path.join(__dirname, "public", "pgp.pub"))
})

app.use((req, res) => {
  res.status(404).render("pages/404")
})

app.listen(port, () => {
  console.log(`opdavi1.com listening on port ${port}`)
})