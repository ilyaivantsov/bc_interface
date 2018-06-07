pragma solidity ^0.4.22;

contract gpContr {
        uint    id;
        string  date;
        string  loc;
        address from;
        address tH;

   constructor(uint _id, string _date, string _location) public {
        id = _id;
        date = _date;
        loc = _location;
        from = msg.sender;
        tH = this;
    }
    
    function getData() public constant returns(uint,string,string,address,address) {
        return (id,date,loc,from,tH);
    }
}