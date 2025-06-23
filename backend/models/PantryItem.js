// server/models/PantryItem.js
const mongoose = require('mongoose');

const usageSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    quantityUsed: Number,
    usedFor: String,
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }
});

const pantryItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Basic Info
    name: { type: String, required: true },
    category: { type: String, enum: [
            "produce", "meat", "seafood", "dairy", "pantry", "frozen", "vegetables", "fruits",
            "bakery", "beverages", "snacks", "condiments", "spices", "other"
        ], default: "other" },
    brand: { type: String },
    barcode: { type: String },

    // Quantity
    quantity: { type: Number, required: true },
    unit: { type: String }, // Example: "kg", "pieces"
    originalQuantity: { type: Number },

    // Dates
    purchaseDate: { type: Date },
    expirationDate: { type: Date },
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },

    // Location
    location: { type: String, enum: [
            "pantry", "refrigerator", "freezer", "counter",
            "cabinet", "wine_rack", "root_cellar", "other"
        ], default: "pantry" },
    aisle: { type: String },

    // Cost Info
    costPerUnit: { type: Number },
    totalCost: { type: Number },

    // Status & Tracking
    status: { type: String, enum: [
            "fresh", "expiring_soon", "expired", "used_up", "spoiled"
        ], default: "fresh" },
    isLowStock: { type: Boolean, default: false },
    lowStockThreshold: { type: Number, default: 0 },

    // Usage
    usageHistory: [usageSchema],

    // Extra
    notes: { type: String },
    tags: [String],
    nutritionPer100g: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fat: Number,
        fiber: Number
    },
    imageUrl: { type: String },

    // Metadata
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PantryItem', pantryItemSchema);
