var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
  reqData = req.body;
  console.log(reqData);
  addressver = req.body.address;
  MyContract.methods.bids(addressver).call({ from: addressver }).then(function (data) {
   console.log("Bid amount is: ", web3.utils.fromWei(web3.utils.toBN(data),'ether'));
    data1=web3.utils.fromWei(web3.utils.toBN(data),'ether');
    
    res.send("Your total Bid Value is " +data1);
  }).catch(function(e) {
    console.log(e.message);
    res.send("Your action is not valid")

});
});

module.exports = router;


