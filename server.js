const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use("/assets", express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"), (err) => {
        if(err) {
            res.sendStatus(500);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
});
