const Contact = require('../models/contactmodels');
const Tour = require('../models/indiaTourmodel');
const worldTour = require('../models/worldTourmodel');

exports.getabout = (req, res, next) => {
  // console.log("this is a second middleware");
  // res.sendFile(path.join(rootdir, "views", "about.html"));
  res.render('about')
}

exports.gettrip = async(req, res, next) => {
   console.log('this is getour page');
  try {
    const tours = await Tour.find().lean();
    const worldtours = await worldTour.find().lean();
    console.log("Tours fetched from DB:", tours);
    console.log("Tours fetched from DB:", worldtours);
    res.render('trips', { tours, worldtours });
  } catch (err) {
    console.error("Error fetching tours:", err);
    res.status(500).send("Server Error");
  };
  // res.redirect('/trips')
}

exports.getblog = (req, res, next) => {
  // console.log("this is a fourth middleware");
  // res.sendFile(path.join(rootdir,"views","blog.html"));
  res.render('blog')
}

exports.getcontact = async(req, res, next) =>{
  try {
    const contact = await Contact.find();
    console.log("fetch the contact data",contact);
    res.render('contact', {contact});
  } catch (error) {
     console.error("Error fetching tours:", err);
    res.status(500).send("Server Error");
  }
}

exports.postcontact = async(req, res, next) => {

  const {firstname, lastname, email, message} = req.body;
    const home = new Contact({firstname, lastname, email, message});
    home.save().then(() => {
      console.log("home save successfully");
    })
    res.redirect("/contact");

}

exports.gethome = async(req, res, next) => {
  console.log('this is getour page');
  try {
    const tours = await Tour.find().lean();
    const worldtours = await worldTour.find().lean();
    console.log("Tours fetched from DB:", tours);
    console.log("Tours fetched from DB:", worldtours);
    res.render('index', { tours, worldtours });
  } catch (err) {
    console.error("Error fetching tours:", err);
    res.status(500).send("Server Error");
  };
  // res.render('index');
}

// Home page for tour
// exports.getTour = async (req, res) => {
  // console.log('this is getour page');
  // try {
  //   const tours = await Tour.find().lean();
  //   console.log("Tours fetched from DB:", tours);
  //   res.render('trips', { tours });
  // } catch (err) {
  //   console.error("Error fetching tours:", err);
  //   res.status(500).send("Server Error");
  // };
// };

// // Tour detail by slug
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