const express = require("express");
require('dotenv').config({ path: __dirname + '/.env' });
const app = express();
const db = require("./database/db.js");
const port = process.env.PORT || 3000;
const expressLayouts = require("express-ejs-layouts");
const perpusRoutes = require("./routes/perpusdb.js");
const { perpus } = require("./routes/perpus.js");
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.use(express.json());
app.use('/perpus', perpusRoutes);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index")
});

app.get("/perpus-data", (req, res) => {
    res.json(perpus);
});

app.get("/tentang", (req, res) => {
    res.render("tentang");
});

app.get("/koleksi", (req, res) => {
    res.render("koleksi", { perpus: perpus });
});

app.get("/koleksi-list", (req, res) => {
     db.query("SELECT * FROM perpus", (err, koleksi) => {
        if (err) return res.status(500).send("Internal Server Error");
        res.render("koleksi-page", { koleksi: koleksi });
    });
});

app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});