// import external modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');

// import internal modules
const userRoute = require('./routes/user');
const hotelRoute = require('./routes/hotel');
const roomRoute = require('./routes/room');
const blogRoute = require('./routes/blog');

const app = express();

// configure
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieparser());
dotenv.config();

// database connection
/* The code `mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true })`
 is establishing a connection to a MongoDB database using the Mongoose library. */
mongoose
    .connect(process.env.DATABASE_URL, {
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log(err.message);
    });

// application routes
app.use('/api', userRoute);
app.use('/api', hotelRoute);
app.use('/api', roomRoute);
app.use('/api', blogRoute);

// home route
app.use((req, res) => {
    res.status(200).json({
        message: 'server running.',
    });
});

// not found handler
app.use((req, res, next) => {
    res.status(404).json({
        error: 'URL not Found',
    });
});
// error handling
app.use((err, req, res, next) => {
    res.status(500).json({
        error: err,
    });
});

const port = process.env.PORT || 4000;
// const host = process.env.HOST || '0.0.0.0';

// application running port
app.listen(port, (req, res) => {
    console.log(`Server listening on http://localhost:${port}`);
});
