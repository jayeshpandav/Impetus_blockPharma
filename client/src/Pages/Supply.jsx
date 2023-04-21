import React, { useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "../artifacts/SupplyChain.json";
import { BsBuildingAdd } from "react-icons/bs";
import { SiMaterialdesignicons } from "react-icons/si";
import { MdPrecisionManufacturing } from "react-icons/md";
import { DiStreamline } from "react-icons/di";
import { RiStockFill } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import AlertBox from "../component/AlertBox";
import "./Styles/supply.css";
import InventoryTable from "../component/InventoryTable";

function Supply() {
  const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [found, setFound] = useState(false);
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedStage, setMedStage] = useState();
  const [ID, setID] = useState();
  const [RMSCount, setRMSCount] = useState();
  const [MANCount, setMANCount] = useState();
  const [DISCount, setDISCount] = useState();
  const [RETCount, setRETCount] = useState();
  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const [showChain, setShowChain] = useState(false);

  const toggleShowChain = () => {
    setShowChain(!showChain);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

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
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      setSupplyChain(supplychain);
      var i;
      var index;
      const medCtr = await supplychain.methods.medicineCount().call();
      const med = {};
      const medStage = [];
      for (i = 0; i < medCtr; i++) {
        med[i] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);

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
      // console.log("manCount: ", manCount);
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
      // window.alert("The smart contract is not deployed to current network");
      // <AlertBox
      //   title={"The smart contract is not deployed to current network"}
      // />;
    }
  };
  if (loader) {
    return (
      <div>
        <h1 className="wait">Loading...</h1>
      </div>
    );
  }
  const redirect_to_home = () => {
    navigate("/");
  };
  const handlerChangeID = (event) => {
    setID(event.target.value);
  };
  const handlerSubmitRMSsupply = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .RMS_to_manufacture_supply(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Counterfeit Drug Found");
      // <AlertBox title={"Counterfeit Drug Found"} />;
    }
  };
  const handlerSubmitManufacturing = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Manufacturing(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Counterfeit Drug Found");
      // <AlertBox title={"Counterfeit Drug Found"} />;
    }
  };
  const handlerSubmitDistribute = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .manufacture_to_Distribute(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Counterfeit Drug Found");
      // <AlertBox title={"Counterfeit Drug Found"} />;
    }
  };
  const handlerSubmitRetail = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .distributor_to_Retail(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Counterfeit Drug Found");
      // <AlertBox title={"Counterfeit Drug Found"} />;
    }
  };
  const handlerSubmitSold = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .sold(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Counterfeit Drug Found");
      // <AlertBox title={"Counterfeit Drug Found"} />;
    }
  };

  // console.log("RMS: ", RMS);

  return (
    <div>
      {/* <span>
        <b>Current Account Address:</b> {currentaccount}
      </span>
      <span
        onClick={redirect_to_home}
        className="btn btn-outline-danger btn-sm"
      >
        {" "}
        HOME
      </span> */}
      <h6>
        <b>Supply Chain Flow:</b>
      </h6>
      <p>
        Medicine Order -&gt; Raw Material Supplier -&gt; Manufacturer -&gt;
        Distributor -&gt; Retailer -&gt; Consumer
      </p>
      <BsBuildingAdd
        style={{ fontSize: "40px", marginLeft: "40px", marginRight: "35px" }}
      />{" "}
      -&gt;{" "}
      <SiMaterialdesignicons
        style={{ fontSize: "40px", marginLeft: "40px", marginRight: "35px" }}
      />{" "}
      -&gt;
      <MdPrecisionManufacturing
        style={{ fontSize: "40px", marginLeft: "40px", marginRight: "35px" }}
      />{" "}
      -&gt;
      <DiStreamline
        style={{ fontSize: "40px", marginLeft: "40px", marginRight: "35px" }}
      />{" "}
      -&gt;{" "}
      <RiStockFill
        style={{ fontSize: "40px", marginLeft: "40px", marginRight: "35px" }}
      />{" "}
      -&gt;{" "}
      <VscAccount
        style={{
          fontSize: "40px",
          color: "white",
          marginLeft: "40px",
          marginRight: "35px",
        }}
      />
      <button
        className="d-block center button glow-button my-2"
        onClick={toggleShowChain}
        style={{ transform: "translateX(calc(50vw - 50%))" }}
      >
        View/hide Supply Chain
      </button>
      {showChain && (
        <table className="question-table table table-responsive-sm table-sm table-dark">
          <thead onClick={toggleCollapse}>
            <tr>
              <th scope="col">Medicine ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Current Processing Stage</th>
            </tr>
          </thead>

          <tbody>
            {
              // !collapsed &&
              Object.keys(MED).map(function (key) {
                return (
                  <tr key={key}>
                    <td>{MED[key].id}</td>
                    <td>{MED[key].name}</td>
                    <td>{MED[key].description}</td>
                    <td>{MedStage[key]}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      )}
      {RMS &&
        Array.from({ length: RMSCount }).map((_, index) => {
          // console.log("RMS Count: ", RMSCount);
          if (currentaccount === RMS[index][0]) {
            // console.log("i: ", index);
            // setFound(true);
            return (
              <div key={index}>
                <h5>
                  <b>Step 1: Supply Raw Materials</b>(Only a registered Raw
                  Material Supplier can perform this step):-
                </h5>
                <form onSubmit={handlerSubmitRMSsupply}>
                  <input
                    className="form-control-sm"
                    type="text"
                    onChange={handlerChangeID}
                    placeholder="Enter Medicine ID"
                    required
                  />
                  <button
                    className="btn btn-outline-success btn-sm"
                    onSubmit={handlerSubmitRMSsupply}
                  >
                    Supply
                  </button>
                </form>

                <hr />
                <br />
              </div>
            );
          }
        })}
      {MAN &&
        Array.from({ length: MANCount }).map((_, i) => {
          if (currentaccount === MAN[i][0]) {
            return (
              <div key={i}>
                <h5>
                  <b>Step 2: Manufacture</b>(Only a registered Manufacturer can
                  perform this step):-
                </h5>
                <form onSubmit={handlerSubmitManufacturing}>
                  <input
                    className="form-control-sm"
                    type="text"
                    onChange={handlerChangeID}
                    placeholder="Enter Medicine ID"
                    required
                  />
                  <button
                    className="btn btn-outline-success btn-sm"
                    onSubmit={handlerSubmitManufacturing}
                  >
                    Manufacture
                  </button>
                </form>
                <hr />
                <br />
              </div>
            );
          }
        })}
      {DIS &&
        Array.from({ length: DISCount }).map((_, i) => {
          if (currentaccount === DIS[i][0]) {
            return (
              <div key={i}>
                <h5>
                  <b>Step 3: Distribute</b>(Only a registered Distributor can
                  perform this step):-
                </h5>
                <form onSubmit={handlerSubmitDistribute}>
                  <input
                    className="form-control-sm"
                    type="text"
                    onChange={handlerChangeID}
                    placeholder="Enter Medicine ID"
                    required
                  />
                  <button
                    className="btn btn-outline-success btn-sm"
                    onSubmit={handlerSubmitDistribute}
                  >
                    Distribute
                  </button>
                </form>
                <hr />
                <br />
              </div>
            );
          }
        })}
      {RET &&
        Array.from({ length: RETCount }).map((_, i) => {
          if (currentaccount === RET[i][0]) {
            return (
              <div key={i}>
                <h5>
                  <b>Step 4: Retail</b>(Only a registered Retailer can perform
                  this step):-
                </h5>
                <form onSubmit={handlerSubmitRetail}>
                  <input
                    className="form-control-sm"
                    type="text"
                    onChange={handlerChangeID}
                    placeholder="Enter Medicine ID"
                    required
                  />
                  <button
                    className="btn btn-outline-success btn-sm"
                    onSubmit={handlerSubmitRetail}
                  >
                    Retail
                  </button>
                </form>
                <hr />
                <br />
                <h5>
                  <b>Step 5: Mark as sold</b>(Only a registered Retailer can
                  perform this step):-
                </h5>
                <form onSubmit={handlerSubmitSold}>
                  <input
                    className="form-control-sm"
                    type="text"
                    onChange={handlerChangeID}
                    placeholder="Enter Medicine ID"
                    required
                  />
                  <button
                    className="btn btn-outline-success btn-sm"
                    onSubmit={handlerSubmitSold}
                  >
                    Sold
                  </button>
                </form>
                <hr />
              </div>
            );
          }
        })}
    </div>
  );
}

export default Supply;
