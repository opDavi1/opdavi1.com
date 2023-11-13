const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use("/assets", express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"), (err) => {
        if(err) {
            res.sendStatus(500);
        }
    });
});

app.get("/image-gallery", (req, res) => {
     res.sendFile(path.join(__dirname, "views", `img-gallery1.html`), (err) => {
        if(err) {
            res.sendStatus(500);
        }
    });
})

app.get("/image-gallery/:page", (req, res) => {
    let page = req.params.page;
    res.sendFile(path.join(__dirname, "views", `img-gallery${page}.html`), (err) => {
        if(err) {
            res.sendStatus(404);
        }
    });
});

app.listen(PORT, () => {
    console.log(`opdavi1.com Server listening on localhost:${PORT}`);
});
