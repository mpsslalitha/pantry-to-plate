const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');

const recipeRoutes = require('./routes/recipeRoutes');


const pantryRoutes = require('./routes/pantryRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/recipes', recipeRoutes);

module.exports = app;