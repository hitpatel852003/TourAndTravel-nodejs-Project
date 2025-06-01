const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // e.g., jaipur-rajasthan
  image: { type: String, required: true },
  description: { type: String, required: true },
  packages: [
    {
      name: { type: String, required: true },
      days: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      details: { type: String, required: true },
      booking: [
        {
          name: { type: String, required: true },
          days: { type: String, required: true },
          price: { type: Number, required: true },
          
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Tour', tourSchema);
