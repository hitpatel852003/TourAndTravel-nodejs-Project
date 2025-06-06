const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // e.g., jaipur-rajasthan
  image: { type: String, required: true },
  description: { type: String, required: true },
  packages: [
    {
      num: { type: Number, required: true, unique: true },
      name: { type: String, required: true },
      days: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      details: { type: String, required: true },
      booking: [
        {
          image1: { type: String, required: true },
          image2: { type: String, required: true },
          image3: { type: String, required: true },
          image4: { type: String, required: true },
          image5: { type: String, required: true },
          title: { type: String, required: true },
          days: { type: String, required: true },
          description: { type: String, required: true },
          Stay: { type: String, required: true },
          BreakfastandDinner: { type: String, required: true },
          AirportTransfer: { type: String, required: true },
          Sightseeing: { type: String, required: true },
          Travelling: { type: String, required: true },
          hotaltitle: { type: String,required: true },
          hotalstar: { type: Number, required: true },
          hotalroom: { type: String, required: true },
          itinerary: [
            {
              itineraryday: { type: String, required: true },
              itinerarytitle: { type: String, required: true },
              itinerarydescription: { type: String, required: true },
            }
          ],
          Inclusions: [
            {
              Inclusionstitle: { type: String, required: true },
            }
          ],
          Exclusions: [
            {
              Exclusionstitle: { type: String,required: true },
            }
          ],
          AttractionsAndActivities: [
            {
              AAimage: { type: String, required: true },
              AAtitle: { type: String, required: true },
              AAdescription: { type: String, required: true },
            }
          ],
          newprice : {type:String, require:true},
          oldprice : {type:String, require:true}
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Tour', tourSchema);

