const express = require('express');
const app = express();
const path = require('path');
const { default: mongoose } = require('mongoose');

const {userrouter} = require('./router/userrouter');
// const tourRoutes = require('./router/tourRoutes');
const Newsletter  = require('./models/footeremailmodels');

app.use(express.urlencoded({ extended: true })); // ✅ handles form submissions
app.use(express.json()); // handles JSON if needed
app.use(express.static(__dirname));

//ejs 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use((req, res, next) => {
  // console.log(`🚀 ${req.method} request for ${req.url}`);
  next();
});

//footer email send
app.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    // Optional: check for existing email
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      // return res.status(400).send("⚠️ This email is already subscribed.");
      return res.redirect('/');
    }

    // Save to DB
    const subscriber = new Newsletter({ email });
    await subscriber.save();

    console.log('✅ Email saved to DB:', email);
    res.redirect('/');
  } catch (err) {
    console.error('❌ Error saving to DB:', err.message);
    res.status(500).send("Server error.");
  }
});


//user router
app.use(userrouter);
//tour router
// app.use('/', tourRoutes);


// database connection
const port = 3006;
const DB_PATH = "mongodb+srv://root:root@tourandtravel.qyukqal.mongodb.net/TourAndTravel?retryWrites=true&w=majority&appName=tourandtravel"
// const  DB_PATH = "mongodb+srv://root:root@nodejscoding.qyukqal.mongodb.net/?retryWrites=true&w=majority&appName=nodejscoding"

mongoose.connect(DB_PATH).then(() => {
  app.listen(port, () => {
    console.log(`mongoose connection and server is running in address of http://localhost:${port}`);
  })
})
.catch(err => {
  console.log("mongoose connection is failed", err);
})