const Contact = require('../models/contactmodels');

exports.getabout = (req, res, next) => {
  // console.log("this is a second middleware");
  // res.sendFile(path.join(rootdir, "views", "about.html"));
  res.render('about')
}

exports.gettrip = (req, res, next) => {
  // console.log("this is a thired middleware");
  // res.sendFile(path.join(rootdir,"views","trips.html"));
  res.render('trips')
}

exports.getblog = (req, res, next) => {
  // console.log("this is a fourth middleware");
  // res.sendFile(path.join(rootdir,"views","blog.html"));
  res.render('blog')
}

exports.getcontact = (req, res, next) =>{
  res.render('contact');
}

exports.postcontact = async(req, res, next) => {

  const {firstname, lastname, email, message} = req.body;
    const home = new Contact({firstname, lastname, email, message});
    home.save().then(() => {
      console.log("home save successfully");
    })
    res.redirect("/contact");

}

exports.gethome = (req, res, next) => {
  // console.log("this is a home middleware");
  // res.sendFile(path.join(rootdir,"views","index.html"));
  res.render('index');
}