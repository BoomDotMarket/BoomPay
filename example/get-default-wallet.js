const Web3 = require("web3").Web3;
const ethUtil = require("ethereumjs-util");
const BoomPay = require("boompay-sdk");

// Initialize BoomPay with your API key
const boomPay = new BoomPay({
  apiKey: "your-api-key",
});

const wallet = boomPay.wallets.getDefaultWallet();

console.log(wallet);
