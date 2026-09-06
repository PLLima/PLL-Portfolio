require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Mongoose Schema & Model
const professionalSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { strict: false, collection: 'professionals' });

const Professional = mongoose.model('Professional', professionalSchema);

async function fetchAndSaveData() {
  if (!process.env.MONGODB_URI) {
    console.error('ERROR: MONGODB_URI is not set. Cannot fetch data for build.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'portfolio' });
    console.log('Successfully connected to MongoDB.');

    console.log('Fetching professional profile...');
    const profile = await Professional.findOne({ name: 'Pedro Lubaszewski Lima' }).lean();

    if (!profile) {
      throw new Error('Professional profile not found.');
    }

    // Define the path to the public directory
    const publicDir = path.join(__dirname, '..', 'public', 'data');
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(publicDir)){
        fs.mkdirSync(publicDir, { recursive: true });
    }

    const filePath = path.join(publicDir, 'portfolio.json');
    
    // Write the data to public/data/portfolio.json
    fs.writeFileSync(filePath, JSON.stringify(profile, null, 2));
    
    console.log(`Successfully wrote portfolio data to ${filePath}`);

  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

fetchAndSaveData();
