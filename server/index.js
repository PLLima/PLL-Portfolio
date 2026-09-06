const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { dbName: 'portfolio' })
  .then(() => console.log('Successfully connected to MongoDB (portfolio).'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Mongoose Schema & Model
// We use strict: false to allow fetching dynamic localized fields without rigid schema definitions.
const professionalSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { strict: false, collection: 'professionals' });

const Professional = mongoose.model('Professional', professionalSchema);

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.get('/api/portfolio', async (req, res) => {
  try {
    const profile = await Professional.findOne({ name: 'Pedro Lubaszewski Lima' }).lean();
    if (!profile) {
      return res.status(404).json({ error: 'Professional profile not found.' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
