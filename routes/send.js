var express = require('express');
var router = express.Router();
// var nodeMailer = require('nodemialer')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('');
});

router.post('/', function(req, res){
  console.log(req.body);
});

module.exports = router;
