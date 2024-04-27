import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

// {
//   '0x71d08cdca1f817f98b62020970065b7d73488889': '0x0240cfda54eb69d1654c1bb5f14799d272f5fb86b8ada992174e693598932775a2',
//   '0x628285c6466e210d9668a14f387d5fb573c48871': '0x02d137c7713e88f4c27784928f2fa97de8c526ee93968ca1f2a148d37fe9a914ea',
//   '0x0c0f682f003e3b6f9ae49cc84770744a2081ef72': '0x03e066d64c27c65c23c9e60409e1d420bdb15a3012487c0298d5bde9ac26e4dc4b'
// }
// {
//   '0x71d08cdca1f817f98b62020970065b7d73488889': 79,
//   '0x628285c6466e210d9668a14f387d5fb573c48871': 37,
//   '0x0c0f682f003e3b6f9ae49cc84770744a2081ef72': 88
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
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
