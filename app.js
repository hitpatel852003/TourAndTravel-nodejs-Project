const express = require('express');
const app = express();
const path = require('path');
const { default: mongoose } = require('mongoose');

const {userrouter} = require('./router/userrouter');
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


//this all is payment method
require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const paymentRoutes = require("./router/paymentRoutes");

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try later.",
});
app.use(limiter);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/payment", paymentRoutes);

app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    res.status(403).send("Form tampered with");
  } else {
    next(err);
  }
});

//user router
app.use(userrouter);

// database connection
const port = process.env.port || 3006;
const DB_PATH = "mongodb+srv://root:root@tourandtravel.qyukqal.mongodb.net/TourAndTravel?retryWrites=true&w=majority&appName=tourandtravel"

mongoose.connect(DB_PATH).then(() => {
  app.listen(port, () => {
    console.log(`mongoose connection and server is running in address of http://localhost:${port}`);
  })
})
.catch(err => {
  console.log("mongoose connection is failed", err);
})