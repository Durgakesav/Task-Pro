const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB connection error:', err.message));
const nameSchema = new mongoose.Schema({
 idOfUser:{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
 },
  nameOfTask: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  time:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('Name', nameSchema);
