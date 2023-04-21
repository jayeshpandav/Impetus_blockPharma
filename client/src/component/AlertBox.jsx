import React from "react";
import "./Styles/alertBox.css";

const AlertBox = ({ title, desc }) => {
  // console.log("title", title, "desc", desc);
  return (
    <>
      <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
            {/* <div class="card">
              <div class="header">{title}</div>
              <div class="content">{desc}</div>
              <div class="actions">
                <a class="nah" href="#">
                  Nah
                </a>
                <a href="#">Close</a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertBox;
