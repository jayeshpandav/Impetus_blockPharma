import React, { useEffect, useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "../artifacts/SupplyChain.json";
import user from "../assets/login.jpg";
import control from "../assets/control.png";
import "./Styles/homepage.css";
import track from "../assets/track.png";
import register from "../assets/register.png";
import addmed from "../assets/addmed.png";
import AlertBox from "../component/AlertBox";
import Typewriter from "typewriter-effect";

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    // navigate.replace("/");
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const owner = "0x809EECE1ebb4D1165cAF86ED937d1EA1e0F0E533";

  var i;

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
  // const [isAuth, isAuth] = useState(false);
  let isAuth = false;

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
      // <AlertBox
      //   title={"Non-Ethereum browser detected. "}
      //   desc={"You should consider trying MetaMask!"}
      // />;
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

  // // console.log("Rms: ", RMS);
  // // console.log("CurrentAcc: ", currentaccount);

  const redirect_to_roles = () => {
    navigate("/register");
  };
  const redirect_to_addmed = () => {
    navigate("/addmed");
  };
  const redirect_to_supply = () => {
    navigate("/supply");
  };
  const redirect_to_track = () => {
    navigate("/track");
  };

  if (currentaccount === owner) {
    isAuth = true;
    // console.log("success owner");
    // navigate("/owner");
    return (
      <>
        {/* <h5>
          Step 1: Owner Should Register Raw material suppliers ,Manufacturers,
          Distributors and Retailers
        </h5>
        <h6>(Note: This is a one time step. Skip to step 2 if already done)</h6> */}
        <div
          className="userinfo container mx-auto "
          // data-aos="fade-right"
          // data-aos-offset="-300"
          // data-aos-easing="ease-in-sine"
        >
          <img src={user} alt="" />
          <span>
            <Typewriter
              // options={{
              //   strings: [""],
              //   autoStart: true,
              //   loop: true,
              // }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Welcome, Owner")
                  .callFunction(() => {
                    // console.log("String typed out!");
                  })
                  // .pauseFor(2500)
                  // .deleteAll()
                  // .callFunction(() => {
                  //   // console.log("All strings were deleted");
                  // })
                  .start();
              }}
            />
            {/* <b>Welcome,</b> Owner */}
          </span>
        </div>
        <div className="user_options container mx-auto">
          <div
            className="option"
            data-aos="flip-left"
            data-aos-duration="4000"
            onClick={redirect_to_roles}
          >
            <h5>{/* <b>Track</b> the medicines: */}</h5>
            {/* <button onClick={redirect_to_track} className="btn btn_option"> */}
            Register
            {/* </button> */}
            <img src={register} alt="" />
          </div>
          <br />
          <div
            className="option"
            data-aos="flip-left"
            data-aos-duration="4000"
            onClick={redirect_to_addmed}
          >
            <h5>{/* <b>Track</b> the medicines: */}</h5>
            {/* <button onClick={redirect_to_track} className="btn btn_option"> */}
            Add Medicine
            {/* </button> */}
            <img src={addmed} alt="" />
          </div>
          <div
            className="option"
            data-aos="flip-left"
            data-aos-duration="4000"
            onClick={redirect_to_track}
          >
            <h5>{/* <b>Track</b> the medicines: */}</h5>
            {/* <button onClick={redirect_to_track} className="btn btn_option"> */}
            Track Medicines
            {/* </button> */}
            <img src={track} alt="" />
          </div>
        </div>
      </>
    );
  } else {
    // console.log("unsuccessful owner");
  }

  for (i = 0; i < RMSCount; i++) {
    if (RMS && currentaccount === RMS[i][0]) {
      isAuth = true;
      // console.log(RMS);
      // console.log("success RMS");
      // navigate("/rms");
      return (
        <>
          <div className="userinfo container mx-auto d-flex flex-row">
            <img src={user} alt="" />
            <span>
              <Typewriter
                // options={{
                //   strings: [""],
                //   autoStart: true,
                //   loop: true,
                // }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(`Welcome, Raw Material Supplier: ${RMS[i][2]}`)
                    .callFunction(() => {
                      // console.log("String typed out!");
                    })
                    // .pauseFor(2500)
                    // .deleteAll()
                    // .callFunction(() => {
                    //   // console.log("All strings were deleted");
                    // })
                    .start();
                }}
              />
              {/* <b>Welcome,</b> Raw Material Supplier */}
            </span>
          </div>
          <div className="user_options container mx-auto">
            <div
              className="option"
              data-aos="flip-left"
              data-aos-duration="4000"
              onClick={redirect_to_supply}
            >
              {/* <h5>Step 3: Control Supply Chain</h5> */}
              {/* <button onClick={redirect_to_supply} className="btn btn_option"> */}
              Control Supply Chain
              {/* </button> */}
              <img src={control} alt="" />
            </div>
            {/* <br />
            <hr />
            <br /> */}
            <div
              className="option"
              data-aos="flip-left"
              data-aos-duration="4000"
              onClick={redirect_to_track}
            >
              <h5>{/* <b>Track</b> the medicines: */}</h5>
              {/* <button onClick={redirect_to_track} className="btn btn_option"> */}
              Track Medicines
              {/* </button> */}
              <img src={track} alt="" />
            </div>
          </div>
        </>
      );
    } else {
      // console.log("unsuccessful RMS");
    }
  }

  for (i = 0; i < MANCount; i++) {
    if (MAN && currentaccount === MAN[i][0]) {
      isAuth = true;
      // console.log("success MAN");
      // navigate("/rms");
      return (
        <>
          <div className="userinfo container">
            <img src={user} alt="" />
            <span>
              <Typewriter
                // options={{
                //   strings: [""],
                //   autoStart: true,
                //   loop: true,
                // }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(`Welcome, Manufacturer: ${MAN[i][2]}`)
                    .callFunction(() => {
                      // console.log("String typed out!");
                    })
                    // .pauseFor(2500)
                    // .deleteAll()
                    // .callFunction(() => {
                    //   // console.log("All strings were deleted");
                    // })
                    .start();
                }}
              />
              {/* <b>Welcome,</b> Manufacturer */}
            </span>
          </div>
          <div className="user_options container mx-auto">
            <div
              className="option"
              data-aos="flip-left"
              data-aos-duration="4000"
              onClick={redirect_to_supply}
            >
              {/* <h5>Step 3: Control Supply Chain</h5> */}
              {/* <button onClick={redirect_to_supply} className="btn btn_option"> */}
              Control Supply Chain
              {/* </button> */}
              <img src={control} alt="" />
            </div>
            {/* <br />
            <hr />
            <br /> */}
            <div
              className="option"
              data-aos="flip-left"
              data-aos-duration="4000"
              onClick={redirect_to_track}
            >
              <h5>{/* <b>Track</b> the medicines: */}</h5>
              {/* <button onClick={redirect_to_track} className="btn btn_option"> */}
              Track Medicines
              {/* </button> */}
              <img src={track} alt="" />
            </div>
          </div>
        </>
      );
    } else {
      // console.log("unsuccessful MAN");
    }
  }

  for (i = 0; i < DISCount; i++) {
    if (DIS && currentaccount === DIS[i][0]) {
      isAuth = true;
      // console.log("success DIS");
      // navigate("/dis");
      return (
        <>
          <div className="userinfo container">
            <img src={user} alt="" />
            <span>
              <Typewriter
                // options={{
                //   strings: [""],
                //   autoStart: true,
                //   loop: true,
                // }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(`Welcome, Distributor: ${DIS[i][2]}`)
                    .callFunction(() => {
                      // console.log("String typed out!");
                    })
                    // .pauseFor(2500)
                    // .deleteAll()
                    // .callFunction(() => {
                    //   // console.log("All strings were deleted");
                    // })
                    .start();
                }}
              />
              {/* <b>Welcome,</b> Distributor */}
            </span>
          </div>
          <div className="user_options container mx-auto">
            <div
              className="option"
              data-aos="flip-left"
              data-aos-duration="4000"
              onClick={redirect_to_supply}
            >
              {/* <h5>Step 3: Control Supply Chain</h5> */}
              {/* <button onClick={redirect_to_supply} className="btn btn_option"> */}
              Control Supply Chain
              {/* </button> */}
              <img src={control} alt="" />
            </div>
            {/* <br />
            <hr />
            <br /> */}
            <div
              className="option"
              data-aos="flip-left"
              data-aos-duration="4000"
              onClick={redirect_to_track}
            >
              <h5>{/* <b>Track</b> the medicines: */}</h5>
              {/* <button onClick={redirect_to_track} className="btn btn_option"> */}
              Track Medicines
              {/* </button> */}
              <img src={track} alt="" />
            </div>
          </div>
        </>
      );
    } else {
      // console.log("unsuccessful DIS");
    }
  }

  for (i = 0; i < RETCount; i++) {
    if (RET && currentaccount === RET[i][0]) {
      isAuth = true;
      // console.log("success RET");
      // navigate("/ret");
      return (
        <>
          <div className="userinfo container">
            <img src={user} alt="" />
            <span>
              <span>
                <Typewriter
                  // options={{
                  //   strings: [""],
                  //   autoStart: true,
                  //   loop: true,
                  // }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(`Welcome, Retailer: ${RET[i][2]}`)
                      .callFunction(() => {
                        // console.log("String typed out!");
                      })
                      // .pauseFor(2500)
                      // .deleteAll()
                      // .callFunction(() => {
                      //   // console.log("All strings were deleted");
                      // })
                      .start();
                  }}
                />
              </span>
              {/* <b>Welcome,</b> Retailer: {RET[i][2]} */}
            </span>
          </div>
          <div className="user_options container mx-auto">
            <div
              className="option"
              data-aos="flip-left"
              data-aos-duration="4000"
              onClick={redirect_to_supply}
            >
              {/* <h5>Step 3: Control Supply Chain</h5> */}
              {/* <button onClick={redirect_to_supply} className="btn btn_option"> */}
              Control Supply Chain
              {/* </button> */}
              <img src={control} alt="" />
            </div>
            {/* <br />
            <hr />
            <br /> */}
            <div
              className="option"
              data-aos="flip-left"
              data-aos-duration="4000"
              onClick={redirect_to_track}
            >
              <h5>{/* <b>Track</b> the medicines: */}</h5>
              {/* <button onClick={redirect_to_track} className="btn btn_option"> */}
              Track Medicines and Inventory
              {/* </button> */}
              <img src={track} alt="" />
            </div>
          </div>
        </>
      );
    } else {
      // console.log("unsuccessful RET");
    }
  }

  if (!isAuth) {
    return (
      // !isAuth &&
      <>
        <div className="userinfo container">
          <img src={user} alt="" />
          <span>
            {/* <Typewriter
              // options={{
              //   strings: [""],
              //   autoStart: true,
              //   loop: true,
              // }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Welcome, User")
                  .callFunction(() => {
                    // console.log("Welcome User");
                  })
                  // .pauseFor(2500)
                  // .deleteAll()
                  // .callFunction(() => {
                  //   // console.log("All strings were deleted");
                  // })
                  .start();
              }}
            /> */}
            Welcome User
          </span>
        </div>
        <div className="user_options container mx-auto">
          <div
            className="option"
            // data-aos="flip-left"
            // data-aos-duration="4000"
            onClick={redirect_to_track}
          >
            <h5>{/* <b>Track</b> the medicines: */}</h5>
            {/* <button onClick={redirect_to_track} className="btn btn_option"> */}
            Track Medicines
            {/* </button> */}
            <img src={track} alt="" />
          </div>
        </div>
      </>
    );
  }

  // return (
  //   <div>
  //     <h3>Pharmaceutical Supply Chain Flow :- </h3>
  //     <br />
  //     <h6>
  //       (Note: Here <u>Owner</u> is the person who deployed the smart contract
  //       on the blockchain)
  //     </h6>
  //     <h5>
  //       Step 1: Owner Should Register Raw material suppliers ,Manufacturers,
  //       Distributors and Retailers
  //     </h5>
  //     <h6>(Note: This is a one time step. Skip to step 2 if already done)</h6>
  //     <button
  //       onClick={redirect_to_roles}
  //       className="btn btn-outline-primary btn-sm"
  //     >
  //       Register
  //     </button>
  //     <br />
  //     <h5>Step 2: Owner should order medicines</h5>
  //     <button
  //       onClick={redirect_to_addmed}
  //       className="btn btn-outline-primary btn-sm"
  //     >
  //       Order Medicines
  //     </button>
  //     <br />
  //     <h5>Step 3: Control Supply Chain</h5>
  //     <button
  //       onClick={redirect_to_supply}
  //       className="btn btn-outline-primary btn-sm"
  //     >
  //       Control Supply Chain
  //     </button>
  //     <br />
  //     <hr />
  //     <br />
  //     <h5>
  //       <b>Track</b> the medicines:
  //     </h5>
  //     <button
  //       onClick={redirect_to_track}
  //       className="btn btn-outline-primary btn-sm"
  //     >
  //       Track Medicines
  //     </button>
  //   </div>
  // );
}

export default HomePage;
