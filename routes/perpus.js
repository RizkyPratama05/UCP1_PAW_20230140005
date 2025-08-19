//pertemuan 4
// todo.js
const express = require("express");
const router = express.Router();

// Data dummy
let perpus = [
  { id: 1, Judul: "Siksa Kubur", },
  { id: 2, Judul: "Siksa Rumah", },
];

// Endpoint untuk mendapatkan semua tugas
router.get("/", (req, res) => {
  res.json(perpus);
});

// Endpoint untuk mendapatkan tugas berdasarkan ID
router.get("/:id", (req, res) => {
  const koleksi = perpus.find((t) => t.id === parseInt(req.params.id));
  if (!koleksi) return res.status(404).send("Judul tidak ditemukan");
  res.json(koleksi);
});

// Endpoint untuk menambahkan tugas baru
router.post("/", (req, res) => {
  const newKoleksi = {
    id: perpus.length + 1,
    Judul: req.body.task,
  };
  perpus.push(newKoleksi);
  res.status(201).json(newKoleksi);
});

// Endpoint untuk memperbarui tugas
router.put("/:id", (req, res) => {
  const koleksi = perpus.find((t) => t.id === parseInt(req.params.id));
  if (!koleksi) return res.status(404).send("Judul tidak ditemukan");

  koleksi.task = req.body.task;
  res.json(koleksi);
});

// Endpoint untuk menghapus tugas
router.delete("/:id", (req, res) => {
  const koleksiIndex = perpus.findIndex((t) => t.id === parseInt(req.params.id));
  if (koleksiIndex === -1) return res.status(404).send("Judul tidak ditemukan");

  perpus.splice(koleksiIndex, 1);
  res.status(204).send();
});

module.exports = router;
// Tambahkan ini untuk mengekspor data todos juga
module.exports.perpus = perpus;
