var express = require('express');
var router = express.Router();

router.get('/profile', (req, res, next) => {
  res.render('user/profile.hbs', req.session.user);
});

module.exports = router;
