const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();


const PORT = process.env.PORT || 5000;

// console.log("URL",process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, ).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => console.error(err));