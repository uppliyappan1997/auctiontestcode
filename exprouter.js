var express = require('express')
var bodyParser = require('body-parser');
var router = express.Router()
var auction=require('./auction.js');
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
//router.use(bodyParser.json());
router.use(function(err, req, res, next) {
    if (err instanceof SyntaxError) {
      console.log(err,"error");
        res.end('Please fill valid Json Formet');
    }
});
router.get('/getData', function (req, res) {
  auction.getData(req, res);
})
router.post('/login', function (req, res) {
  auction.login(req, res);
})
router.post('*',function (req, res) {
  res.send('invalid request');
})
module.exports = router