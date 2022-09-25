var express = require('express');
var router = express.Router();

var ipfsAPI = require('ipfs-api');

router.post('/', function (req, res, next) {

    const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

    data = req.body;
   // uid = req.body.id;

   myFileBuffer = req.files.uploadFile.data;
   console.log(myFileBuffer);
   ipfs.files.add(myFileBuffer, function (err, file) {
     if (err) throw err;
 
     let url = `https://ipfs.io/ipfs/${file[0].hash}`;
     console.log(`Url --> ${url}`);

     console.log(`IPFS HASH OF PDF ----- ${url}`);

    console.log(data);
    MyContract.methods.createAsset(data.id,data.name,file[0].hash) .send({ from: accountAddress, gas : 6000000 }).on('transactionHash', (hash) => {
    
      console.log("TRANSACTION HASH",hash);
    res.send(`IPFS HASH OF PDF ----- ${url}`)
         }).on('error', (error) => {
      console.log(error.message);
      res.send("This action only allowed for contract owner after Auction time")
  
    });
    // res.render("auction");


    console.log("<=========================================CreateAsset Success=========================================>")

    });


   
  
      
});











 

module.exports = router;

