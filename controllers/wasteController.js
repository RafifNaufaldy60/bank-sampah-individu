const pool = require('../config/db');

// Metode GET => Dapatkan semua data
const getAllWasteTypes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM waste_types ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Metode GET => Dapatkan data berdasarkan ID
const getWasteTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM waste_types WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Metode POST => Membuat data baru
const createWasteType = async (req, res) => {
    try {
        const { name, price_per_kg, guidance } = req.body;
        const result = await pool.query(
            'INSERT INTO waste_types (name, price_per_kg, guidance) VALUES ($1, $2, $3) RETURNING *',
            [name, price_per_kg, guidance]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Metode PUT => Memperbarui data
const updateWasteType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price_per_kg, guidance } = req.body;
        const result = await pool.query(
            'UPDATE waste_types SET name = $1, price_per_kg = $2, guidance = $3 WHERE id = $4 RETURNING *',
            [name, price_per_kg, guidance, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Metode DELETE => Menghapus data
const deleteWasteType = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM waste_types WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        res.status(200).json({ message: "Data berhasil dihapus", data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllWasteTypes,
    getWasteTypeById,
    createWasteType,
    updateWasteType,
    deleteWasteType
};