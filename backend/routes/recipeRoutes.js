const express = require('express');
const axios = require('axios');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

const SPOON_API = 'https://api.spoonacular.com';
const API_KEY = process.env.SPOONACULAR_API_KEY;

// @route    POST /api/recipes/suggestions
// @desc     Generate recipe suggestions based on user preferences
// @access   Private
router.post('/suggestions', auth, async (req, res) => {
    try {
        const {
            selectedIngredients = [],
            diet = '',
            cuisine = '',
            maxTime = 60,
            limit = 8
        } = req.body;

        if (!selectedIngredients.length) {
            return res.status(400).json({ message: 'No ingredients selected' });
        }

        const params = {
            apiKey: API_KEY,
            includeIngredients: selectedIngredients.join(','),
            number: limit,
            instructionsRequired: true,
            fillIngredients: true,
            addRecipeInformation: true,
            ignorePantry: true
        };

        if (diet) params.diet = diet;
        if (cuisine) params.cuisine = cuisine;
        if (maxTime) params.maxReadyTime = maxTime;

        const response = await axios.get(`${SPOON_API}/recipes/complexSearch`, { params });
        console.log(response);
        res.json(response.data.results); // Send only the results array
    } catch (err) {
        console.error('Error fetching recipes:', err.response?.data || err.message);
        res.status(500).json({ message: 'Failed to fetch recipe suggestions' });
    }
});

// @route    GET /api/recipes/:id
// @desc     Get full recipe details
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        const response = await axios.get(`${SPOON_API}/recipes/${id}/information`, {
            params: {
                apiKey: API_KEY,
                includeNutrition: true
            }
        });

        res.json(response.data);
    } catch (err) {
        console.error('Error fetching recipe details:', err.response?.data || err.message);
        res.status(500).json({ message: 'Failed to fetch recipe details' });
    }
});

module.exports = router;



// const express = require('express');
// const axios = require('axios');
// const auth = require('../middleware/authMiddleware');
// const PantryItem = require('../models/PantryItem');
// const router = express.Router();
//
// router.post('/suggestions', auth, async (req, res) => {
//     try {
//         const { selectedIngredients, diet, cuisine, maxTime, limit } = req.body;
//
//         const ingredients = selectedIngredients.join(',');
//
//         const response = await axios.get(
//             `https://api.spoonacular.com/recipes/findByIngredients`,
//             {
//                 params: {
//                     apiKey: process.env.SPOONACULAR_API_KEY,
//                     ingredients,
//                     number: 8,
//                     ranking: 1
//                 }
//             }
//         );
//         console.log(response);
//         res.json(response.data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to fetch recipes' });
//     }
// });
//
// router.get('/:id', auth, async (req, res) => {
//     try {
//         const id = req.params.id;
//         const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
//             params: { apiKey: process.env.SPOONACULAR_API_KEY, includeNutrition: true }
//         });
//         res.json(response.data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to fetch recipe details' });
//     }
// });
//
// module.exports = router;
