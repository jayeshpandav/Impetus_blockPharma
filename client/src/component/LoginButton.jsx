import React, { useState, useEffect } from "react";

function LoginButton({ currentaccount }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  // Check if the user is logged in on component mount
  useEffect(() => {
    // Use the "window.ethereum" object to check if the user is logged in
    if (
      typeof window.ethereum !== "undefined" &&
      window.ethereum.selectedAddress
    ) {
      setLoggedIn(true);
    }
  }, []);

  // Handle the "Login" button click event
  //   const handleLogin = async () => {
  //     // Use the "window.ethereum.request" method to request access to the user's Metamask wallet
  //     try {
  //       await window.ethereum.request({ method: "eth_requestAccounts" });
  //       setLoggedIn(true);
  //       //   handleRefresh();
  //     } catch (error) {
  //       console.error(error);
  //       alert("OOPS! We Ran Into Problem Loggind You In");
  //     }
  //   };

  // Handle the "Logout" button click event
  const handleLogout = async () => {
    // Use the "window.ethereum.request" method to disconnect from the user's Metamask wallet
    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
      setLoggedIn(true);
      handleRefresh();
      console.log(loggedIn);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <img
        className="nav_avatar"
        src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
        alt=""
        // onClick={() => navigate("/profile")}
        onClick={handleLogout}
      />
    </div>
  );
}

export default LoginButton;
