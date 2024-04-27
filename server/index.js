const express = require("express");
const { toHex, hexToBytes, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { secp256k1: secp } = require("ethereum-cryptography/secp256k1");
const app = express();
const cors = require("cors");
const port = 3042;

console.log('==============================================')

app.use(cors());
app.use(express.json());

//public key - private key
// {
//   '03ff7203d770840e4b4097a116f5a4eee3dad2ed03b7a9182efec4747d355d70a3': 'fd1db4077293bc815a40ca23b912900b31752e8f11fa87f696c5c469a1134247',
//   '03a3eee73c65a9de5f074af6233d00863c246ffc56a543058f1ea93965c82ed593': '4f3485b170e8a6e8e62f5591e47525667c91a5c1044a46dc766cea681ddabf5e',
//   '021674241173f5d220ef6f286d40db76cff1c67167424d1ed47e1d2e8fbbccc6f8': 'e51fd25ff1297efe4b1f3285ad6d48390072a836ba6a9dcd494f41a562f3093a'
// }
// address - public key
const addressToPublicKey = {
  "0x31152ad1ef55dd68": "03ff7203d770840e4b4097a116f5a4eee3dad2ed03b7a9182efec4747d355d70a3",
  "0x2154fe9717563f06": "03a3eee73c65a9de5f074af6233d00863c246ffc56a543058f1ea93965c82ed593",
  "0xf2b202c0a70ab20c": "021674241173f5d220ef6f286d40db76cff1c67167424d1ed47e1d2e8fbbccc6f8",
};


const balances = {
     '0x31152ad1ef55dd68': 79,
     '0x2154fe9717563f06': 98,
     '0xf2b202c0a70ab20c': 60,
}

app.get("/balance/:address", (req, res) => {
  console.log("==============================================");
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  console.log("==============================================");
  console.log("Request:", req.body);
  const { sender, recipient, amount, sign, messageHash, message } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  let allowTransfer = secp.verify(
    hexToBytes(sign),
    toHex(keccak256(utf8ToBytes(message))),
    hexToBytes(addressToPublicKey[sender])
  );

  if (!allowTransfer) {
    res.status(400).send({ message: "Thiefffff!" });
    return;
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
