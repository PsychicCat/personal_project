var express = require('express');
var router = express.Router();
var blockchain = require('blockchain.info');
var crypto = require('crypto');
var Poloniex = require('../lib/poloniex');

//initialize an instance of Receive
var url = 'http://104.236.4.90/api/confirm';
var myAddress = '1QK163BZ4CEyskfjg6kBXBwU282CfBtLg2';
var receive = new blockchain.Receive({confirmations: 0}, url);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Personal Project' });
});

router.get('/api/create', function(req, res, next){
  var orderID = randomValueBase64(10);

  receive.create(myAddress, function(err, data){
    if(err){
      console.log(err);
      next(err);
    } else {
      res.json(data.input_address);
    }
  });
});

router.get('/rate', function(req,res,next){
    Poloniex.getSellPrice(function(data){
       res.json(data);
    });
});

router.get('/*', function(req,res,next){
  res.redirect('/');
});

function randomValueBase64(len){
  return crypto.randomBytes(Math.ceil(len * 3 / 4))
      .toString('base64')
      .slice(0, len)
      .replace(/\+/g, '0')
      .replace(/\//g, '0');
}

module.exports = router;
