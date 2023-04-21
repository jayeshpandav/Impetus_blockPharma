import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Nav.css";
import logo from "../assets/logo_new.png";
import Web3 from "web3";
import LoginButton from "./LoginButton";
import AlertBox from "./AlertBox";

const Nav = () => {
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      // <AlertBox
      //   title={
      //     "Non-Ethereum browser detected. You should consider trying MetaMask!"
      //   }
      // />;
    }
  };
  const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    setloader(false);
  };

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src={logo}
        alt=""
        onClick={() => navigate("/")}
        style={{
          height: "80px",
          width: "100px",
          marginLeft: "1em",
          paddingBottom: "1em",
        }}
      />

      <div>
        <div className="acc_info">
          {/* <LoginButton /> */}
          <b>Current Account Address:</b> {currentaccount}
        </div>
        <LoginButton currentaccount={currentaccount} />

        {/* <div className="dropdown nav_avatar">
          <button
            className=" dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{
              backgroundColor: "transparent",
              color: "transparent",
              border: "none",
            }}
          >
            <img
              className="nav_avatar"
              src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
              alt=""
              // onClick={() => navigate("/profile")}
            />
          </button>
          <div
            class="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            style={{ backgroundColor: "transparent" }}
          >
            <LoginButton currentaccount={currentaccount} />
          </div>
        </div> */}
      </div>
      <div className="nav_contents"></div>
    </div>
  );
};

export default Nav;
