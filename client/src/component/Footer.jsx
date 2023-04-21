import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <div className=" ">
        <footer
          className="text-center text-lg-start"
          style={{ backgroundColor: "black" }}
        >
          <div className="container d-flex justify-content-center py-5">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-floating mx-2"
              style={{ backgroundColor: "#54456b" }}
            >
              <AiFillFacebook />
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-floating mx-2"
              style={{ backgroundColor: "#54456b" }}
            >
              {/* <i className="fab fa-youtube"></i> */}
              <AiFillYoutube />
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-floating mx-2"
              style={{ backgroundColor: "#54456b" }}
            >
              {/* <i className="fab fa-instagram"></i> */}
              <AiFillInstagram />
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-floating mx-2"
              style={{ backgroundColor: "#54456b" }}
            >
              {/* <i className="fab fa-twitter"></i> */}
              <AiFillTwitterSquare />
            </button>
          </div>

          <div
            className="text-center text-white p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2023 Copyright:
            <a className="text-white" href="https://mdbootstrap.com/">
              BlockPharma
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
