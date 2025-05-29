const mongoose = require('mongoose');

const worldtourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // e.g., maldives
  image:{ type: String, required: true },
  description: { type: String, required: true },
  packages: [
    {
      name: { type: String, required: true },
      days: { type: String, required: true },
      price: { type: Number, required: true },
      details: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('worldTour', worldtourSchema);
