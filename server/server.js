require('dotenv').config();
const express = require('express');
const Auth = require('./routes/Auth');
const Profile = require('./routes/Profile');
const Person = require('./routes/Person');
const Feed = require('./routes/Feed');
const app = express();
const cors = require('cors');

require('dotenv').config();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Маршруты
app.use('/auth', Auth);
app.use('/profile', Profile);
app.use('/person', Person);
app.use('/feed', Feed);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
