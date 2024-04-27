import { secp256k1 } from 'ethereum-cryptography/secp256k1'
import { toHex } from "ethereum-cryptography/utils";

function signMessage(hash, privateKey) {
    const signature = secp256k1.sign(hash, privateKey.slice(2));
    return signature;
}

export default signMessage;