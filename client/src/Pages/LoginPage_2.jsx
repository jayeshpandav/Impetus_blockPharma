import React, { useEffect, useState } from "react";
import Web3 from "web3";
import SupplyChainABI from "../artifacts/SupplyChain.json";
// import LoginPage from "./LoginPage";
import { useNavigate } from "react-router-dom";
// import AlertBox from "../component/AlertBox";

const LoginPage_2 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const owner = "0x809EECE1ebb4D1165cAF86ED937d1EA1e0F0E533";

  //   const [accounts, setAccounts] = useState([]);
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [RMSname, setRMSname] = useState();
  const [MANname, setMANname] = useState();
  const [DISname, setDISname] = useState();
  const [RETname, setRETname] = useState();
  const [RMSplace, setRMSplace] = useState();
  const [MANplace, setMANplace] = useState();
  const [DISplace, setDISplace] = useState();
  const [RETplace, setRETplace] = useState();
  const [RMSaddress, setRMSaddress] = useState();
  const [MANaddress, setMANaddress] = useState();
  const [DISaddress, setDISaddress] = useState();
  const [RETaddress, setRETaddress] = useState();
  const [RMSCount, setRMSCount] = useState();
  const [MANCount, setMANCount] = useState();
  const [DISCount, setDISCount] = useState();
  const [RETCount, setRETCount] = useState();
  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // window.alert(
      //   "Non-Ethereum browser detected. You should consider trying MetaMask!"
      // );
    }
  };

  const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    // console.log(account);
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    // console.log("networkid" + networkId);
    const networkData = SupplyChainABI.networks[networkId];
    // console.log(SupplyChainABI.networks);
    // console.log("networkdata" + networkData);
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      setSupplyChain(supplychain);
      var i;
      const rmsCount = await supplychain.methods.rmsCount().call();
      setRMSCount(rmsCount);
      const rms = {};
      for (i = 0; i < rmsCount; i++) {
        rms[i] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);
      //   // console.log("rms: ", rms);
      const manCount = await supplychain.methods.manCount().call();
      setMANCount(manCount);
      const man = {};
      for (i = 0; i < manCount; i++) {
        man[i] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man);
      const disCount = await supplychain.methods.disCount().call();
      setDISCount(disCount);
      const dis = {};
      for (i = 0; i < disCount; i++) {
        dis[i] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);
      const retCount = await supplychain.methods.retCount().call();
      setRETCount(retCount);
      const ret = {};
      for (i = 0; i < retCount; i++) {
        ret[i] = await supplychain.methods.RET(i + 1).call();
      }
      setRET(ret);
      setloader(false);
    } else {
      window.alert("The smart contract is not deployed to current network");
      // <AlertBox
      //   title={"The smart contract is not deployed to current network"}
      // />;
    }
  };

  // console.log("Rms: ", RMS);
  // console.log("CurrentAcc: ", currentaccount);
  var i;
  //   for (i = 0; i < RMSCount; i++) {
  if (currentaccount === owner) {
    // console.log("success owner");
    navigate("/owner");
    //   return (
    //     <div>
    //       <h1>Hello World!</h1>
    //     </div>
    //   );
  } else {
    // console.log("unsuccessful owner");
  }
  //   }
  for (i = 0; i < RMSCount; i++) {
    if (RMS && currentaccount === RMS[i][0]) {
      // console.log("success RMS");
      navigate("/rms");
      //   return (
      //     <div>
      //       <h1>Hello World!</h1>
      //     </div>
      //   );
    } else {
      // console.log("unsuccessful RMS");
    }
  }
  for (i = 0; i < MANCount; i++) {
    if (MAN && currentaccount === MAN[i][0]) {
      // console.log("success MAN");
      navigate("/man");
      //   return (
      //     <div>
      //       <h1>Hello World!</h1>
      //     </div>
      //   );
    } else {
      // console.log("unsuccessful MAN");
    }
  }
  for (i = 0; i < DISCount; i++) {
    if (DIS && currentaccount === DIS[i][0]) {
      // console.log("success DIS");
      navigate("/dis");
      //   return (
      //     <div>
      //       <h1>Hello World!</h1>
      //     </div>
      //   );
    } else {
      // console.log("unsuccessful DIS");
    }
  }
  for (i = 0; i < RETCount; i++) {
    if (RET && currentaccount === RET[i][0]) {
      // console.log("success RET");
      navigate("/ret");
      //   return (
      //     <div>
      //       <h1>Hello World!</h1>
      //     </div>
      //   );
    } else {
      // console.log("unsuccessful RET");
    }
  }
  return (
    <>
      <div>
        <h1>Login Page</h1>
      </div>
    </>
  );
};

export default LoginPage_2;
