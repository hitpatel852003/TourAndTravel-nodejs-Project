const Contact = require('../models/contactmodels');
const Tour = require('../models/Tourmodel');

exports.getabout = (req, res, next) => {
  // console.log("this is a second middleware");
  // res.sendFile(path.join(rootdir, "views", "about.html"));
  res.render('about')
}

exports.gettrip = async(req, res, next) => {
   console.log('this is getour page');
  try {
    const tours = await Tour.find().lean();
    console.log("Tours fetched from DB:", tours);
    res.render('trips', { tours});
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
    console.log("Tours fetched from DB:", tours);
    res.render('index', { tours });
  } catch (err) {
    console.error("Error fetching tours:", err);
    res.status(500).send("Server Error");
  };
  // res.render('index');
}


// // Tour detail by slug
exports.getTourBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    console.log("Fetching tour with slug:", slug);
    
    const tour = await Tour.findOne({ slug }).lean();
    if (!tour) return res.status(404).send('Tour not found');
    res.render('tour-detail', { tour });
  } catch (error) {
    console.error("Error fetching tour by slug:", err);
    res.status(500).send("Server Error");
  }
};

exports.getTourByDetails = async(req,res) => {
  // try {
  //   const num = req.params.num;
  //   console.log('hit patel packeage is runnning');
  //   console.log("Fetching tour with num:", num);
    
  //   const booking = await Tour.findOne({ "packages.num": num }).lean();
  //   console.log("Fetching tour with booking:", booking);
  //   if (!booking) return res.status(404).send('Tour not found');
  //   res.render('tour-booking', { booking });
  // } catch (error) {
  //   console.error("Error fetching tour by slug:", err);
  //   res.status(500).send("Server Error");
  // }

  const { slug, num } = req.params;

  try {
    const tour = await Tour.findOne({ slug });
    if (!tour) return res.status(404).send("Tour not found");

    const selectedPackage = tour.packages.find(p => p.num == num);
    if (!selectedPackage) return res.status(404).send("Package not found");

    res.render('tour-booking', { tour, selectedPackage });
  } catch (error) {
    console.error("Error loading package details:", error);
    res.status(500).send("Internal Server Error");
  }
}