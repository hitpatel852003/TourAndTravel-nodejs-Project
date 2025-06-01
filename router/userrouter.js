const express = require('express');
const userrouter = express.Router();
const rootdir = require('../util/util');
const path = require('path');

const {getabout, gettrip, getblog, getcontact, postcontact, gethome, getTourBySlug, getTourByDetails} = require('../controller/usercontroller');

userrouter.use((req,res,next) => {
  // console.log("first router",req.url,req.method);
  next();
})

userrouter.use("/",(req,res,next) => {
  // console.log("this is a first middleware");
  next();
})

userrouter.use("/about", getabout);

userrouter.use("/trips", gettrip);

userrouter.use("/blog", getblog);

userrouter.get("/contact", getcontact);
userrouter.post("/contact", postcontact);

userrouter.get("/", gethome);
userrouter.get("/index", gethome);

userrouter.get('/tours/:slug', getTourBySlug);
userrouter.get('/book-now/:name', getTourByDetails);

exports.userrouter = userrouter;