import React, { useState } from "react";
import "../../App.scss";
import emailjs from "emailjs-com";
import BasicNavbar from "../Navbars/BasicNavbar";

const Feedback = () => {
  const [wasEmailSent, setWasEmailSent] = useState(false);
  const [wasEmailFailed, setWasEmailFailed] = useState(false);

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_USER_ID
      )
      .then(
        (result) => {
          setWasEmailSent(true);
        },
        (error) => {
          setWasEmailFailed(true);
          console.log(error)
        }
      );
  }

  return (
    <div className="container">
      <BasicNavbar />
      <h1 className="center header feedback-header">Feedback</h1>
      <h5 className="center feedback-subheader">Questions? Comments? Concerns? Feel free to reach out to us. Thank you for taking part in our beta!</h5>
      <div className="feedback-form">
        <div className="row">
          <div className="col-md-6 center-col col-sm-12 text-center">
            <form className="contact-form" onSubmit={sendEmail}>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                name="from_name"
                className="big-input alt-font border-radius-4"
                style={{color: "black"}}
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="from_email"
                className="big-input alt-font border-radius-4"
                style={{color: "black"}}
              />
              <textarea
                name="message"
                id="message"
                placeholder="Message"
                className="big-input alt-font border-radius-4 message-input"
                style={{color: "black"}}
              />
              <button
                type="submit"
                value="Send"
                className="default-submit btn btn-extra-large2 propClone bg-sigmaBlue btn-3d text-white width-100 builder-bg tz-text"
              >
                Send
              </button>
            </form>
            {wasEmailSent && <h1 className="email-success">Success!</h1>}
            {wasEmailFailed && <h1 className="email-failed">Failed</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
