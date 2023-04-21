import React from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <>
      <div
        className=""
        style={{
          background:
            "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(23,9,121,1) 64%, rgba(0,212,255,1) 95%)",
          height: "50px",
        }}
      ></div>
      <div
        style={{
          background:
            "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(23,9,121,1) 64%, rgba(0,212,255,1) 95%)",
        }}
      >
        <section className=" container w-50">
          <h2
            className="h1-responsive font-weight-bold text-center py-3"
            style={{ color: "navy" }}
          >
            Contact us
          </h2>
          <p
            className="text-center w-responsive mx-auto mb-5"
            style={{ color: "black" }}
          >
            Do you have any questions? Please do not hesitate to contact us
            directly. Our team will come back to you within a matter of hours to
            help you.
          </p>

          <div className="row">
            <div className="col-md-9 mb-md-0 mb-5">
              <form
                id="contact-form"
                name="contact-form"
                action="mail.php"
                method="POST"
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="md-form mb-0">
                      <input
                        style={{ backgroundcolor: "#01d4ff78 !important" }}
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                      />
                      <label htmlFor="name" className="">
                        Your name
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="md-form mb-0">
                      <input
                        style={{ backgroundcolor: "#01d4ff78" }}
                        type="text"
                        id="email"
                        name="email"
                        className="form-control"
                      />
                      <label htmlFor="email" className="">
                        Your email
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <input
                        style={{ backgroundcolor: "#01d4ff78" }}
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-control"
                      />
                      <label htmlFor="subject" className="">
                        Subject
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form">
                      <textarea
                        type="text"
                        id="message"
                        name="message"
                        rows="2"
                        className="form-control md-textarea"
                      ></textarea>
                      <label htmlFor="message">Your message</label>
                    </div>
                  </div>
                </div>
              </form>

              <div className="text-center text-md-left">
                <a
                  className="btn btn-primary"
                  //   onClick="document.getElementById('contact-form').submit();"
                >
                  Send
                </a>
              </div>
              <div className="status"></div>
            </div>

            <div className="col-md-3 text-center">
              <ul className="list-unstyled mb-0">
                <li>
                  {/* <i className="fas fa-map-marker-alt fa-2x"></i> */}
                  <FiMapPin />
                  <p>Dhankavadi, Pune - 411043</p>
                </li>

                <li>
                  {/* <i className="fas fa-phone mt-4 fa-2x"></i> */}
                  <AiOutlinePhone />
                  <p>+ 91 9309110595</p>
                </li>

                <li>
                  {/* <i className="fas fa-envelope mt-4 fa-2x"></i> */}
                  <AiOutlineMail />
                  <p>jayeshpandav02@gmail.com</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
