const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const coffeeShops = require('./routes/coffeeShops');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { swaggerUi, specs } = require('./swagger');

dotenv.config();

connectDB();

const app = express();

// Use helmet to secure Express headers
app.use(helmet());

// Body parser middleware
app.use(bodyParser.json());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

app.use(limiter);

app.use('/api/coffeeShops', coffeeShops);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
