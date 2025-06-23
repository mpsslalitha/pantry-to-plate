const PantryItem = require('../models/PantryItem');

// @desc    Get all pantry items for a user
exports.getPantryItems = async (req, res) => {
    try {
        const items = await PantryItem.find({ userId: req.user.id });
        console.log("get",items)
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Add a new pantry item
exports.addPantryItem = async (req, res) => {
    try {
        const item = new PantryItem({
            ...req.body,
            userId: req.user.id
        });
        console.log(item);
        console.log("Add",req.body);
        const saved = await item.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err.message });
    }
};

// @desc    Update an item
exports.updatePantryItem = async (req, res) => {
    try {
        const item = await PantryItem.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { ...req.body, updatedAt: new Date() },
            { new: true }
        );
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Update failed', error: err.message });
    }
};

// @desc    Delete an item
exports.deletePantryItem = async (req, res) => {
    try {
        const deleted = await PantryItem.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!deleted) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Delete failed', error: err.message });
    }
};
