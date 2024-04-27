const { secp256k1: secp } = require('ethereum-cryptography/secp256k1');

// Generate three private keys and return them as an array
const privateKeys = [];
for (let i = 0; i < 3; i++) {
  const privateKey = secp.utils.randomPrivateKey();
  privateKeys.push(privateKey);
}

module.exports = privateKeys;
