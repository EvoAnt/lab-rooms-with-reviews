var express = require("express");
var router = express.Router();

const Room = require("../models/Room");

const { isLoggedIn } = require("../middleware/route-guard");

router.get("/all", (req, res, next) => {
  Room.find()
    .populate("owner")
    .then((rooms) => {
      console.log("Found rooms ===>", rooms);
      res.render("rooms/all-rooms.hbs", { rooms });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/new", isLoggedIn, (req, res, next) => {
  res.render("rooms/new-room.hbs");
});

router.post("/new", isLoggedIn, (req, res, next) => {
  const { name, description, imageUrl } = req.body;

  Room.create({
    name,
    description,
    imageUrl,
    owner: req.session.user._id,
  })
    .then((createdRoom) => {
      console.log("New Room ===>", createdRoom);
      res.redirect("/rooms/all");
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/details/:roomId", isLoggedIn, (req, res, next) => {
  Room.findById(req.params.roomId)
    .populate("owner")
    .then((room) => {
      console.log("Found room ===>", room);
      res.render("rooms/room-details.hbs", room);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
