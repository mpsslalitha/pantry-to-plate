const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getPantryItems,
    addPantryItem,
    updatePantryItem,
    deletePantryItem
} = require('../controllers/pantryController');

// All routes protected
router.use(authMiddleware);

router.get('/', getPantryItems);
router.post('/', addPantryItem);
router.put('/:id', updatePantryItem);
router.delete('/:id', deletePantryItem);

module.exports = router;
