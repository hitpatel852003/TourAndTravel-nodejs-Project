const Tour = require('../models/indiaTourmodel');

// Home page
exports.getTour = async (req, res) => {
  console.log('this is getour page');
  try {
    const tours = await Tour.find().lean();
    console.log("Tours fetched from DB:", tours);
    res.render('index', { tours });
  } catch (err) {
    console.error("Error fetching tours:", err);
    res.status(500).send("Server Error");
  };
};

// Tour detail by slug
exports.getTourBySlug = async (req, res) => {
  try {
    // const tour = await Tour.findOne({ slug: req.params.slug });
    // console.log("Fetching tour with slug:", req.params.slug);
    // if (!tour) return res.status(404).send('Tour not found');
    // res.render('tour', { tour });
    const slug = req.params.slug;
    console.log("Fetching tour with slug:", slug);
    
    const tour = await Tour.findOne({ slug }).lean();
    if (!tour) return res.status(404).send('Tour not found');
    res.render('tour', { tour });
  } catch (error) {
    console.error("Error fetching tour by slug:", err);
    res.status(500).send("Server Error");
  }
};
