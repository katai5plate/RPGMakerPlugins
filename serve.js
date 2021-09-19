const express = require("express");
const cors = require("cors");
//
((app) => {
  app.use(cors());
  app.use(express.static("."));
  app.listen(3333, () => {
    console.log("Open http://localhost:3333/");
  });
})(express());
