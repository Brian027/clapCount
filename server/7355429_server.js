// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const clapCountRoutes = require('../routes/clapCount.routes');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 5000;

// Middleware
app.use(cors(
    {
        origin: [
            'https://www.briancoupama.re',
            'http://localhost:3000',
            'http://localhost:5000',
            'https://briancoupama.re',
        ],
        allowedHeaders: 'Content-Type, Authorization',
        methods: 'GET, POST',
        optionsSuccessStatus: 200,
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate limiter middleware
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 60, // limit each IP to 60 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
});

app.use(limiter);

// Routes
app.use('/api', clapCountRoutes);

app.listen(port, () => console.log('Server started on port 5000'));