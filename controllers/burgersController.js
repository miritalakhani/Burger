var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  res.redirect("/burger");
 });

// Create all our routes and set up logic within those routes where required.
router.get("/burger", function(req, res) {
  // get all burgers from DB
  burger.getAllBurgers(function(data) {
    var hbsObject = {
      burger: data
    };
    
    res.render("index", hbsObject);
  });
});
 
router.post("/burger/create", function(req, res) {
  console.log("creating burger");
  console.log(req.body);

  burger.createBurger([
    "burger_name"
  ], [
    req.body.name, 
  ], function() {
    res.redirect("/");
  });

});


router.put("/burger/:id/update", function(req, res) {
  console.log("route---- /burger/:id/update")
   console.log(req.body);
   console.log(req.params);
   var burgerId = req.params.id
  burger.updateBurger([ burgerId ] , function() {
    res.redirect("/");
  });

});


// Export routes for server.js to use.
module.exports = router;
