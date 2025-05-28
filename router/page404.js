const express = require('express');
const page404 = express.Router();
const rootdir = require('../util/util');
const path = require('path');

page404.use((req,res) => {
  console.log("page 404 is right ok", req.url,req.method);
  res.status(404).sendFile(path.join(rootdir, 'view', '404.html'));
})

module.exports = page404;