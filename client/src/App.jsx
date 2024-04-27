import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

// [
//   '0x11d6fb691c2328f3414ef1bfb03798f8bccbb6a523eed1ca901b4c3d5c537754',
//   '0xb94cf9a8ac671b32f7aa8ec49dddfb1edef81f4b433201cddb0f6b25024ac6df',
//   '0xddfa99ac4357d57e8dceab39140365e298e343d59aff40dd6a306d2f04cbbd5a'
// ]
// {
//   '0x0101c72360060e6cec38e649ffb5c52457afe7ca': '0x039c66f3b2d20680621bd92e21a3b14525c64ca2d971685ecdc349a08f49d16c03',
//   '0x0601efdd91737bbb42f8ecca3164f4f3ab138aed': '0x03829e5cc68a30989c7c070ccff3521e97a08f05514b50cd76dcd5eab61f937cc8',
//   '0x0e0c30e870014a7f9e5b0fb0d4dba3bbb982aef4': '0x02ff0a96007c245332b937cce420b7fa7cadbcc248afbeb7181d92e92febd7cf81'
// }
// {
//   '0x0101c72360060e6cec38e649ffb5c52457afe7ca': 39,
//   '0x0601efdd91737bbb42f8ecca3164f4f3ab138aed': 70,
//   '0x0e0c30e870014a7f9e5b0fb0d4dba3bbb982aef4': 24
// }

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        privateKey={privateKey}
      />
    </div>
  );
}

export default App;
