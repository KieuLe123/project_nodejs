var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('pages/backend/dashboard', { title: 'dashboard page' });
});


module.exports = router;
