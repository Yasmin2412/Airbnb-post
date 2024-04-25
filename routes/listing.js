const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const lisitngController = require("../controllers/listing.js");
 
//Index Route
router.get("/", wrapAsync(lisitngController.index));
  
  //New Route
  router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
  });
  
  //Show Route
  router.get("/:id", wrapAsync(lisitngController.showListing));


  //Create Route
  router.post("/", isLoggedIn, validateListing, wrapAsync(lisitngController.createListing));


//Edit Route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(lisitngController.renderEditForm));

//Update Route
router.put("/:id",isLoggedIn, isOwner ,validateListing, wrapAsync(lisitngController.updateListing));


//Delete Route
router.delete("/:id",isLoggedIn, isOwner, wrapAsync(lisitngController.destroyListing));

module.exports = router;