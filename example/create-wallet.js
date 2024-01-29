const Web3 = require("web3").Web3;
const ethUtil = require("ethereumjs-util");
const BoomPay = require("boompay-sdk");

// Initialize BoomPay with your API key
const boomPay = new BoomPay({
  apiKey: "your-api-key",
});

const web3 = new Web3();

const account = web3.eth.accounts.create();

const privateKeyBuffer = ethUtil.toBuffer(account.privateKey);
const publicKeyBuffer = ethUtil.privateToPublic(privateKeyBuffer);
const publicKeyHex = "0x" + publicKeyBuffer.toString("hex");

console.log("Private Key:", account.privateKey);
console.log("Public Key:", publicKeyHex);
console.log("Address:", account.address);

const wallet = boomPay.wallets.createWallet({
  address: account.address,
  publicKey: publicKeyHex,
});

console.log(wallet);
