const express = require('express');
const userrouter = express.Router();
const rootdir = require('../util/util');
const path = require('path');

const {getabout, gettrip, getblog, getcontact, postcontact, gethome, getTourBySlug} = require('../controller/usercontroller');

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

userrouter.use("/", gethome);

userrouter.use('/tours/:slug', getTourBySlug);

exports.userrouter = userrouter;