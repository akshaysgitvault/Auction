var express = require('express');
var router = express.Router();
// getting data from blockchain
// and rendering it to the auction view
router.get('/', function (req, res, next) {
  //For getting accounts from local geth private chain
  web3.eth.getAccounts().then((data1) => {
    console.log(data1);
    //call getAuctionDetails from deployed contract for getting auction details
    MyContract.methods.getAuctionDetails().call({ from: data1[0] }).then(function (data) {
      //call Nonft from deployed contract for getting car details
      MyContract.methods.Nonft().call({ from: data1[0] }).then(function (car) {
        MyContract.methods.auction_status().call({ from: data1[0] }).then(function (state) {
          if (state == 1)
            astatus = "Live"
          else if (state == 0)
            astatus = "Not Live"
          //data passing to the auction.ejs
      HighestBid = web3.utils.fromWei(web3.utils.toBN(data[1]), 'ether')
          res.render("auction", { data: data, state: astatus, car: car, data1: data1, HighestBid: HighestBid });

        })
      })

    })
  })
});

module.exports = router;