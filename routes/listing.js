const express =require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapasync.js"); 
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");

const upload=multer({storage});
// Create Route
// router.post(
//     "/",isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.createListing)
// );


// router.post(
//     "/",
//     upload.single("listing[image][url]"),
//     (req, res) => {
//         res.send(req.file);
//     }
// );
router.post(
    "/",
    isLoggedIn,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.createListing)
);


//INDEX ROUTE
router.get("/", wrapAsync(listingController.index));
//NEW  AND CREATE ROUTE

//NEW ROUTE
router.get("/new",isLoggedIn,listingController.renderNewFrom);


//EDIT ROUTE
router.get("/:id/edit", isLoggedIn,isOwner,  wrapAsync(listingController.renderEditFrom));

//Show   Route
router.get("/:id",  wrapAsync(listingController.showListing));
//Update Route
router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image][url]"),validateListing,
    wrapAsync(listingController.updateListing));

//DELETE ROUTE
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

module.exports=router;

