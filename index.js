const express = require("express")
const path = require("path")
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"))
})

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"))
})

app.get("/pgp", (req, res) => {
  res.contentType("text/plain").sendFile(path.join(__dirname, "public", "pgp.pub"))
})

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})