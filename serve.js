const express = require("express");

((app) => {
  app.use(express.static("."));
  app.listen(3333, () => {
    console.log("Open http://localhost:3333/");
  });
})(express());
