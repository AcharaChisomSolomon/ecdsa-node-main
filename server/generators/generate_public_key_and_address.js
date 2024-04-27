const { secp256k1: secp } = require('ethereum-cryptography/secp256k1'); 
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require('ethereum-cryptography/keccak');
const privateKeys = require('./generate_three_private_keys');

//generate public keys for each private key in privateKeys array
const publicKeys = privateKeys.map((privateKey) =>
  secp.getPublicKey(privateKey)
);

//create an object with the address as the key and the public key as the value
const publicKeysAndAddresses = publicKeys.reduce((acc, publicKey) => {
  const address = keccak256(publicKey.slice(1)).slice(-20);
  acc[`0x${toHex(address)}`] = `0x${toHex(publicKey)}`;
  return acc;
}, {});

//create another object with the address as the key and a random balance as the value
const balances = Object.keys(publicKeysAndAddresses).reduce(
  (acc, address) => {
    acc[address] = Math.floor(Math.random() * 100);
    return acc;
  },
  {}
);

const hexPrivateKeys = privateKeys.map((privateKey) => `0x${toHex(privateKey)}`);

//export both objects
module.exports = { publicKeysAndAddresses, balances, hexPrivateKeys };