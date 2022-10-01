
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var Web3 = require ('web3');

const fs =require('fs');

var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })

var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

var MycontractJSon=require(path.join(__dirname,'build/contracts/Auction.json'))
web3 =  new Web3("http://localhost:8545");
contractAddress=MycontractJSon.networks['4002'].address;
console.log("contract address",contractAddress);

const abi=MycontractJSon.abi;

accountAddress ="0x291a428dC0BA3DeA38cE09C3a8baa72563386D60";

MyContract=new web3.eth.Contract(abi,contractAddress);

var fileUpload = require('express-fileupload');


var auctionRouter = require('./routes/getAuctionDetails');
var AddressIdRouter = require('./routes/AddressId');
var bidForRouter = require('./routes/bidFor');
var getBidRouter = require('./routes/getBid');
var getBidBackRouter = require('./routes/getBidBack');
var withdrawouter = require('./routes/withdrawBid');
var createAssetRouter = require('./routes/createAsset');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

app.use('/', auctionRouter);
app.use('/bidFor', bidForRouter);
app.use('/AddressId', AddressIdRouter);
app.use('/getBid', getBidRouter);
app.use('/getBidBack', getBidBackRouter);
app.use('/withdrawBid', withdrawouter);
app.use('/createAsset',createAssetRouter);
//////////////////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.get('/download/:ID',function(req,res){
  console.log(req.params.ID);
  res.redirect('https://ipfs.io/ipfs/'+req.params.ID);
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
