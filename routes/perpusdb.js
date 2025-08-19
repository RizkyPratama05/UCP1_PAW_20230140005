const express = require('express');
const router = express.Router();
const db = require('../database/db');

// GET semua buku
router.get('/', (req, res) => {
    db.query('SELECT * FROM perpus', (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.json(results);
    });
});

// GET buku by id
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM perpus WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.length === 0) return res.status(404).send('Buku tidak ditemukan');
        res.json(results[0]);
    });
});

// POST buku baru
router.post('/', (req, res) => {
    const { judul } = req.body;
    if (!judul || judul.trim() === '') {
        return res.status(400).send('Judul tidak boleh kosong');
    }
    db.query('INSERT INTO perpus (judul) VALUES (?)', [judul.trim()], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        const newBuku = { id: results.insertId, judul: judul.trim() };
        res.status(201).json(newBuku);
    });
});

// PUT update judul buku
router.put('/:id', (req, res) => {
    const { judul } = req.body;
    if (!judul || judul.trim() === '') {
        return res.status(400).send('Judul tidak boleh kosong');
    }
    db.query('UPDATE perpus SET judul = ? WHERE id = ?', [judul.trim(), req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Buku tidak ditemukan');
        res.json({ id: req.params.id, judul: judul.trim() });
    });
});

// DELETE buku
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM perpus WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Buku tidak ditemukan');
        res.status(204).send();
    });
});

module.exports = router;