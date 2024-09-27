const express = require('express');
const cors = require('cors');
require('dotenv').config();
const emailRoutes = require('./routes/email');
const reservationRoutes = require('./routes/reservations');

const app = express();

//Remove this after testing
console.log('SENDGRID_API_KEY set:', !!process.env.SENDGRID_API_KEY);

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use('/api', emailRoutes);
app.use('/api', reservationRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));