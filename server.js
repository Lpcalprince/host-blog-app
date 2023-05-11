const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();

//Connect Data Base
connectDB();

//Router Import
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

// rest api
const app = express();
const PORT = process.env.PORT || 5000;
const DEV_MODE = process.env.DEV_MODE

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

//Listening
app.listen(PORT, () => {
    console.log(`Server is running on ${DEV_MODE} mode on port ${PORT}`.bgMagenta.green.bold);
})