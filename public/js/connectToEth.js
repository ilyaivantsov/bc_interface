var user = initApp(),
    hostname = window.location.hostname,
    protocol = 'http://',    //window.protocol+'//'
    port = ':8545';

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider(protocol+hostname+port));
}
var contractInst = web3.eth.contract(user.abi)

try {
    web3.personal.unlockAccount(user.key, user.password);
    console.log('Connect to net!')
} catch (e) {
    console.log(e);
}

web3.eth.defaultAccount = user.key;


