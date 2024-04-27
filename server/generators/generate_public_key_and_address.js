const { secp256k1: secp } = require("ethereum-cryptography/secp256k1");
const { toHex, hexToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const privateKeys = require('./generate_three_private_keys')

//create an object with public keys as the key and private keys as the value
const publicKeysAndPrivateKeys = privateKeys.reduce((acc, privateKey) => {
  const publicKey = secp.getPublicKey(privateKey);
  acc[toHex(publicKey)] = toHex(privateKey);
  return acc;
}, {})

//create an object with the address as the key and the public key as the value
const publicKeysAndAddresses = Object.keys(publicKeysAndPrivateKeys).reduce((acc, publicKey) => {
  const address = keccak256(hexToBytes(publicKey)).slice(24);
  acc[`${toHex(address)}`] = publicKey;
  return acc;
}, {});

//create another object with the address as the key and a random balance as the value
const balances = Object.keys(publicKeysAndAddresses).reduce((acc, address) => {
  acc[address] = Math.floor(Math.random() * 100);
  return acc;
}, {});

// console.log(publicKeysAndPrivateKeys);
// console.log(publicKeysAndAddresses);
// console.log(balances);

//export both objects
module.exports = { publicKeysAndAddresses, balances, publicKeysAndPrivateKeys };
