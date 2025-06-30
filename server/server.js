require('dotenv').config();
const express = require('express');
const AuthRoutes = require('./routes/Auth');
const ProfileRoutes = require('./routes/Profile');
const app = express();
const cors = require('cors');

require('dotenv').config();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Маршруты
app.use('/auth', AuthRoutes);
app.use('/profile', ProfileRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
