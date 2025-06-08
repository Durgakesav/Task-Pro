const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB connection error:', err.message));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: '' },
  bio: { type: String, default: '' },
  profilePic: { type: String, default: '' }, 
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('userstm', userSchema);
