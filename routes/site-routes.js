const express = require("express");
const Trips = require("../models/trips");
const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();
const checkLogin = require("../controllers/check-login");

//-----------------HOME-------------//

router.get("/", (req, res, next) => {
  res.render("home");
});

//-----------------MY TRIPS-------------//

router.get("/my-trips", checkLogin, (req, res, next) => {
  Trips.find().then(allTrips => {
    res.render("my-trips/my-trips", { trips: allTrips });
  });
});

//-----------------PLANNING - CREATE-------------//

router.get("/planning", checkLogin, (req, res, next) => {
  res.render("my-trips/planning");
});

router.post("/planning", uploadCloud.single('photo'), (req, res, next) => {
  const { destination, city, days, people, route } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newTrip = new Trips({ destination, city, days, people, route, imgPath, imgName })
  newTrip.save()
  .then(trips => {
      res.redirect("my-trips");
    })
    .catch(err => {
      console.log(`THIS HAS AN ${err}`);
    });
});

//-----------------INFORMATION TRIP-------------//

router.get("/info-trip/:tripId", checkLogin, (req, res, next) => {
  Trips.findById(req.params.tripId).then(trip => {
    res.render("my-trips/info-trip", { trip });
  });
});

//-----------------DELETE TRIP-------------//

// router.post("/delete-trip", (req, res, next) => {
//   res.render("my-trips/my-trips");
// });

router.get("/my-trips/:id/delete", checkLogin, ( req, res, next) => {
  const id = req.params.id;
  Trips.findByIdAndDelete(id)
  .then(trips => {
    res.redirect("/my-trips")
  })
  .catch(error => {
    console.log("there was an error trying to delete", error)
  })
})
//---------------EDIT TRIP-----------------//

router.get("/edit-trip", checkLogin, (req, res, next) => {
  //console.log(req.query.building_id);
  Trips.findOne({ _id: req.query.tripID })
    .then(trip => {
      res.render("my-trips/edit-trip", { trip });
    })
    .catch(error => {
      console.log(error);
    });
});
router.post("/edit-trip", (req, res, next) => {
  const { destination, city, people, route, days } = req.body;
  // const imgPath = req.file
  console.log("dest", destination);
  Trips.update(
    { _id: req.query.tripID },
    {
      $set: {
        destination,
        city,
        people,
        route,
        days
      }
    },
    { new: true }
  )
    .then(trip => {
      res.redirect("/my-trips");
    })
    .catch(error => {
      console.log(error);
    });
});

//-----------------LOG IN SESSION-------------//

router.use((req, res, next) => {
  if (req.session.currentUser) {
    // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {
    //    |
    res.redirect("/login"); //    |
  } //    |
}); // ------------------------------------
//     |
//     V
router.get("/secret", (req, res, next) => {
  res.render("secret");
});

module.exports = router;
