const ethers = require('ethers');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
  development: {
    name: 'optimism-fork',
    rpc: 'http://localhost:8545',
    chainId: 31337,
  },
};
const provider = new ethers.providers.StaticJsonRpcProvider(providerRPC.development.rpc, {
  chainId: providerRPC.development.chainId,
  name: providerRPC.development.name,
}); //Change to correct network

// Variables
const account_from = {
  privateKey: '0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd',
};
const addressTo = '0x49DE3b554f1aE516D2789a6E8A59747429A3fFbF';

// Create Wallet
let wallet = new ethers.Wallet(account_from.privateKey, provider);

/*
   -- Create and Deploy Transaction --
*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
const send = async (callback) => {
  console.log(`Attempting to send transaction from ${wallet.address} to ${addressTo}`);

  // Create Tx Object
  const tx = {
    to: addressTo,
    value: ethers.utils.parseEther('0.00000000000001'),
  };
  // Sign and Send Tx - Wait for Receipt
  const createReceipt = await wallet.sendTransaction(tx);
  await createReceipt.wait();
  console.log(`Transaction successful with hash: ${createReceipt.hash}`);
};

setInterval(() => {
    send();
}, 5000);

 