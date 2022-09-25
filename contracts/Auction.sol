// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auction{
     address internal auction_owner;
     uint256 public auction_end;
     uint256 public highestBid;
     address payable public highestBidder;


     constructor ()public
     {
         auction_owner=msg.sender;
         auction_end=now+2 * 1 minutes;
         Nonft.owner=auction_owner;

    }
     struct nft
     {
         uint id;
         string name;
         address owner; 
     }
         nft public Nonft;

     mapping (uint=>nft) nftokens;
     mapping (uint=> string)ipfsurl;


     mapping(address => uint) public bids;
     event BidEvent (address indexed highestBidder,uint256 highestBid);
     event WithdrawalEvent(address withdrawer,uint256 amount);


      modifier bid_conditions(){

        require(now<= auction_end,"auction timeout");
        require(bids[msg.sender]+msg.value > highestBid, "cant't bid, make a higher Bid");
        require(msg.sender != auction_owner, "Auction owner cant bid");
        require(msg.sender != highestBidder, "Current HighestBidder cant bid");

        _;
    }

   
     modifier only_owner(){
        require(msg.sender == auction_owner);
        _;
    }
    
     modifier highestBidderofAuction(){
        require(msg.sender == highestBidder);
        _;
    }
    
     function AddressId(address user)public pure returns(uint){
     return uint(keccak256(abi.encodePacked(user)))%10000000000;
     }
     

    function createAsset(uint id,string memory name,string memory nfturl)public only_owner{
        nftokens[id].id=id;
        nftokens[id].name=name;
        ipfsurl[id]=nfturl;
        nftokens[id].owner=msg.sender;
    }


     function getAuctionDetails() public view returns (uint256,uint256,address,address) {
       return (auction_end,highestBid,highestBidder,auction_owner);
     }

    
	function getPdf(uint id) public highestBidderofAuction view returns (string memory nfturl)
	{        
        require(now> auction_end, "can't download, Auction is still open");
		return(ipfsurl[id]);
       
    }

//Define Bidding function
    function bid() public payable bid_conditions returns (bool){
        highestBidder=msg.sender;
        bids[msg.sender]=bids[msg.sender]+msg.value;
        highestBid=bids[msg.sender];
        emit BidEvent(highestBidder,highestBid);
        return true;
    }

    // check auction status
    function auction_status() public view returns(bool state){
        state = now < auction_end;
    }

    //Withdraw function for loosers
    function getAmount() public returns (bool){
        
        require(now> auction_end, "can't withdraw, Auction is still open");
        require(msg.sender != auction_owner, "owner cant withdraw");
        require(msg.sender != highestBidder, "HighestBidder cant withdraw");
        uint amount = bids[msg.sender];
        bids[msg.sender]=0;
        msg.sender.transfer(amount);
        emit WithdrawalEvent(msg.sender,amount);
        return true; 
        }

    //Withdraw Bid amount to owner address

    function withdraw() public only_owner returns (bool){
        
        require(now> auction_end, "can't withdraw, Auction is still open");
        msg.sender.transfer(highestBid);
        Nonft.owner = highestBidder;
        emit WithdrawalEvent(msg.sender,highestBid);
        return true; 

    }  


}