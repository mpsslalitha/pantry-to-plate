const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    dietaryPreferences: [String],   // Optional, can be updated later
    householdSize: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
