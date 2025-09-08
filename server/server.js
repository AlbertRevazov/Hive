require('dotenv').config();
const express = require('express');
const externalId = require('./routes/ExternalId');
const Auth = require('./routes/Auth');
const Profile = require('./routes/Profile');
const Person = require('./routes/Person');
const Feed = require('./routes/Feed');
const Comment = require('./routes/Comment');
const Likes = require('./routes/Likes');
const Friendship = require('./routes/Friendship');
const app = express();
const cors = require('cors');

require('dotenv').config();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Маршруты
app.use('/extenalId', externalId);
app.use('/auth', Auth);
app.use('/profile', Profile);
app.use('/person', Person);
app.use('/feed', Feed);
app.use('/comment', Comment);
app.use('/like', Likes);
app.use('/friendship', Friendship);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
