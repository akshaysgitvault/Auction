var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
      reqData = req.body;
      console.log(reqData);
      address_Current = reqData.Bidders;
      console.log(address_Current)
      amountver = req.body.amount;
      console.log(amountver)



      MyContract.methods.bid().send({ from: address_Current, gas: 6000000, value: web3.utils.toWei(amountver, 'ether') }).on('transactionHash', (hash) => {
            res.send("Bidding is Successful !")
      }).on('error', (error) => {
            console.log(error.message);
            res.send("Bidding is not Successful !, Check your action is valid or not!!!")
      })
});







module.exports = router;



