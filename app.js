const fs = require("fs");
const url = require('url');
const express = require('express');
const Web3 = require('web3');
const solc = require('solc');
const app = express();
// Connect to MongoDB
const mongoClient = require("mongodb").MongoClient;
//const nameOfDatabase = "transactions";
const URL = "mongodb://127.0.0.1:27017/";
const hostname = "localhost";
var path = require('path'),
    user = {},
    db;

// Connect to eth net
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://"+hostname+":8545"));
}
// Solidity compile section 
const input = fs.readFileSync('./contracts/contract.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':gpContr'].bytecode;
const abi = JSON.parse(output.contracts[':gpContr'].interface);

app.use('/static', express.static(__dirname + '/public'));  // For static files
app.set('view engine', 'ejs');    
app.set('views', path.join(__dirname, 'views'));   // Edited views dir 


app.get('/', function (req, res) {
	res.sendFile(__dirname + "/" + "index.html");
});

app.get('/auth', function(req, res) {
    user = url.parse(req.url, true).query;
    db.collection('transactions').find({}).toArray(function(err, transactions) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        try {
            web3.personal.unlockAccount(user.key, user.password);
            user.conection = 'eye';
            user.net = true;
            user.abi = abi;
            res.status(200).render('main', { res: { user: user, transactions: transactions } });
        } catch (e) {
            user.key = 'Disconnected: ';
            user.conection = 'eye-off';
            user.net = false;
            user.abi = abi;
            res.status(200).render('main', { res: { user: user, transactions: transactions } });
        }
        console.log(transactions);
    });

});

app.get('/newcontract', function(req, res) {
    var contract = url.parse(req.url, true).query;
    if (contract.id && contract.date && contract.location){
    	 res.send('OK');
    	 creatNewContract(contract.id,contract.date,contract.location);
    }
    console.log(contract);
});

function creatNewContract(id, date, location) {
    // Contract object
    const contract = web3.eth.contract(abi);

    // Deploy contract instance
    const contractInstance = contract.new(+id, date, location, {
        data: '0x' + bytecode,
        from: '0x' + user.key,
        gas: 2000000
        //gas: web3.eth.estimateGas({ data: "0x" + bytecode })
    }, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        // No errors
        console.log(res.transactionHash);

        if (res.address) {
            console.log('Contract address: ' + res.address);
            let tr = { id: id, tHash: res.address, date: date, location: location, url: '', class: 'alert alert-success',status:'OK' };
            db.collection('transactions').insertOne(tr, function(err, res) {
                if (err) {
                    console.log(err);
                    return;
                }
            });
        }
    });
}

mongoClient.connect(URL, function(err, database) {
    if (err) throw err;
    var dbo = database.db("baseOftransactions");
    dbo.createCollection("transactions", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
    });
    db = database.db("baseOftransactions");;
    app.listen(3000)
})


