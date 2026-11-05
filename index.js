const express = require('express');
require('dotenv').config();

// Import routes
const wasteRoutes = require('./routes/wasteRoutes');

const app = express();

// Middleware untuk mem-parsing JSON dari request body
app.use(express.json());

// Gunakan routes
// Semua URL yang diawali dengan '/api/waste-types' akan diarahkan ke wasteRoutes
app.use('/api/waste-types', wasteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});