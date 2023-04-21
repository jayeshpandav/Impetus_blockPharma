import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SupplyChainABI from "../artifacts/SupplyChain.json";
// import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import "./Styles/registerpage.css";
// import AlertBox from "../component/AlertBox";

function RegisterPage() {
  //   const history = useHistory();
  // const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);
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
      const rms = {};
      for (i = 0; i < rmsCount; i++) {
        rms[i] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);
      // console.log("rms: ", rms);
      const manCount = await supplychain.methods.manCount().call();
      const man = {};
      for (i = 0; i < manCount; i++) {
        man[i] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man);
      const disCount = await supplychain.methods.disCount().call();
      const dis = {};
      for (i = 0; i < disCount; i++) {
        dis[i] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);
      const retCount = await supplychain.methods.retCount().call();
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
  if (loader) {
    return (
      <div>
        <h1 className="wait">Loading...</h1>
      </div>
    );
  }
  // const redirect_to_home = () => {
  //   // history.push("/");
  //   navigate("/");
  // };
  const handlerChangeAddressRMS = (event) => {
    setRMSaddress(event.target.value);
  };
  const handlerChangePlaceRMS = (event) => {
    setRMSplace(event.target.value);
  };
  const handlerChangeNameRMS = (event) => {
    setRMSname(event.target.value);
  };
  const handlerChangeAddressMAN = (event) => {
    setMANaddress(event.target.value);
  };
  const handlerChangePlaceMAN = (event) => {
    setMANplace(event.target.value);
  };
  const handlerChangeNameMAN = (event) => {
    setMANname(event.target.value);
  };
  const handlerChangeAddressDIS = (event) => {
    setDISaddress(event.target.value);
  };
  const handlerChangePlaceDIS = (event) => {
    setDISplace(event.target.value);
  };
  const handlerChangeNameDIS = (event) => {
    setDISname(event.target.value);
  };
  const handlerChangeAddressRET = (event) => {
    setRETaddress(event.target.value);
  };
  const handlerChangePlaceRET = (event) => {
    setRETplace(event.target.value);
  };
  const handlerChangeNameRET = (event) => {
    setRETname(event.target.value);
  };
  const handlerSubmitRMS = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .add_RMS_in_blockchain(RMSaddress, RMSname, RMSplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
      // <AlertBox title={"An error occured!!!"} />;
    }
  };
  const handlerSubmitMAN = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .add_Manufacturer_in_blockchain(MANaddress, MANname, MANplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
      // <AlertBox title={"An error occured!!!"} />;
    }
  };
  const handlerSubmitDIS = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .add_Distributor_in_blockchain(DISaddress, DISname, DISplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
      // <AlertBox title={"An error occured!!!"} />;
    }
  };
  const handlerSubmitRET = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .add_Retailer_in_blockchain(RETaddress, RETname, RETplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
      // <AlertBox title={"An error occured!!!"} />;
    }
  };

  return (
    <div>
      {/* <span>
        <b>Current Account Address:</b> {currentaccount}
      </span>
      <span
        onClick={redirect_to_home}
        className="btn btn-outline-danger btn-sm"
      >
        HOME
      </span> */}

      <h4>Raw Material Suppliers:</h4>
      <form onSubmit={handlerSubmitRMS}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeAddressRMS}
          placeholder="Ethereum Address"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeNameRMS}
          placeholder="Manufacturer Name"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangePlaceRMS}
          placeholder="Based In"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitRMS}
        >
          Register
        </button>
      </form>

      <table className="table-sm question-table table table-responsive-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Place</th>
            <th scope="col">Ethereum Address</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(RMS).map(function (key) {
            return (
              <tr key={key}>
                <td>{RMS[key].id_of_rawMaterialSupplier}</td>
                <td>{RMS[key].name_of_rawMaterialSupplier}</td>
                <td>{RMS[key].place_of_rawMaterialSupplier}</td>
                <td>{RMS[key].address_of_rawMaterialSupplier}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Manufacturers:</h4>
      <form onSubmit={handlerSubmitMAN}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeAddressMAN}
          placeholder="Ethereum Address"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeNameMAN}
          placeholder="Manufacturer Name"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangePlaceMAN}
          placeholder="Based In"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitMAN}
        >
          Register
        </button>
      </form>
      <table className="question-table table table-responsive-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Place</th>
            <th scope="col">Ethereum Address</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(MAN).map(function (key) {
            return (
              <tr key={key}>
                <td>{MAN[key].id_of_manufacturer}</td>
                <td>{MAN[key].name_of_manufacturer}</td>
                <td>{MAN[key].place_of_manufacturer}</td>
                <td>{MAN[key].address_of_manufacturer}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Distributors:</h4>
      <form onSubmit={handlerSubmitDIS}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeAddressDIS}
          placeholder="Ethereum Address"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeNameDIS}
          placeholder="Distributor Name"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangePlaceDIS}
          placeholder="Based In"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitDIS}
        >
          Register
        </button>
      </form>
      <table className="question-table table table-responsive-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Place</th>
            <th scope="col">Ethereum Address</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(DIS).map(function (key) {
            return (
              <tr key={key}>
                <td>{DIS[key].id_of_distributor}</td>
                <td>{DIS[key].name_of_distributor}</td>
                <td>{DIS[key].place_of_distributor}</td>
                <td>{DIS[key].address_of_distributor}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Retailers:</h4>
      <form onSubmit={handlerSubmitRET}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeAddressRET}
          placeholder="Ethereum Address"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeNameRET}
          placeholder="Retailer Name"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangePlaceRET}
          placeholder="Based In"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitRET}
        >
          Register
        </button>
      </form>
      <table className="question-table table table-responsive-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Place</th>
            <th scope="col">Ethereum Address</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(RET).map(function (key) {
            return (
              <tr key={key}>
                <td>{RET[key].id_of_retailer}</td>
                <td>{RET[key].name_of_retailer}</td>
                <td>{RET[key].place_of_retailer}</td>
                <td>{RET[key].address_of_retailer}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RegisterPage;
