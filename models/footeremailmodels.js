const mongoose = require('mongoose');

const footerEmailSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true,trim: true},
  subscribedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FooterEmail', footerEmailSchema);