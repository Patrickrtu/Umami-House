const express = require('express');
const router = express.Router();

router.post('/Reservations', async (req, res) => {
  try {
    console.log('Received reservation:', req.body);

    

    res.status(201).json({ message: 'Reservation created successfully', data: req.body });
  } catch (error) {
    console.error('Error creating reservation:', error);

    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

module.exports = router;