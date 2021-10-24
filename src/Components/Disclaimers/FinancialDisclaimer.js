import React from "react";
import "../../App.scss";
import BasicNavbar from "../Navbars/BasicNavbar";

const FinancialDisclaimer = () => {
  return (
    <React.Fragment>
      <BasicNavbar />
      <h1 style={{ margin: "100px" }} className="header">
        sigma7, Inc. and its team members are not registered as financial
        advisors and hold no formal qualifications to provide financial advice.
        Everything that is provided on this server, on the sigma7.io website, or
        by sigma7 and its team members is purely for educational purposes only.
        sigma7 and its team members are not accountable or liable for any losses
        or damages. You are responsible for all the risks you take. Any content
        provided here should not be construed as financial advice.
        <br />
        <br />
        Although every effort has been made to provide complete and accurate
        information, sigma7, Inc. makes no warranties, express or implied, or
        representations as to the accuracy of content on this website. sigma7,
        Inc. assumes no liability or responsibility for any error or omissions
        in the information contained in the website or the operation of the
        website.
      </h1>
    </React.Fragment>
  );
};

export default FinancialDisclaimer;
