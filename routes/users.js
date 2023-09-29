var express = require('express');
var router = express.Router();

const { isLoggedIn } = require('../middleware/route-guard');

router.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('user/profile.hbs', req.session.user);
});

module.exports = router;
