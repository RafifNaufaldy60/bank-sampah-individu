const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/wasteController');

// Definisikan rute API dan hubungkan dengan controller
router.get('/', wasteController.getAllWasteTypes);
router.get('/:id', wasteController.getWasteTypeById);
router.post('/', wasteController.createWasteType);
router.put('/:id', wasteController.updateWasteType);
router.delete('/:id', wasteController.deleteWasteType);

module.exports = router;