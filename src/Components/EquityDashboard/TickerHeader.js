import React, { useState } from "react";
import { Card, Popover } from "antd";
import "../../App.scss";

var company_logo = require("../../images/msft_logo.png");

const TickerHeader = () => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <Card title="Ticker" className="ticker-header">
          <hr className="card-hr" />

          <div className="ticker-information">
            <div className="row">
              <div className="col-lg-3 justify-content">
                <h1 className="ticker-title">Microsoft Corp.</h1>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 justify-content">
                <img style={{ borderRadius: "1000px" }} src={company_logo} />
              </div>
              <div className="col-lg-3 ">
                <p>Software-Infrastructure</p>

                <p>
                  United States
                  <br />
                  http://www.microsoft.com
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-1 justify-content">
                <p className="center">
                  P/E: <br /> 37.20
                </p>
              </div>
              <div className="col-lg-1 justify-content">
                <p className="center">
                  P/B: <br /> 15.63
                </p>
              </div>
              <div className="col-lg-1 justify-content">
                <p className="center">
                  P/S: <br /> 18.79
                </p>
              </div>
              <div className="col-lg-9 justify-content">
                <p>
                  Microsoft Corporation is a technology company. The Company
                  develops, licenses, and supports a range of software products,
                  services and devices. The Company's segments include
                  Productivity and Business Processes, Intelligent Cloud and
                  More Personal Computing. The Company's products include
                  operating systems; cross-device productivity applications;
                  server applications; business solution applications; desktop
                  and server management tools; software development tools; video
                  games, and training and certification of computer system
                  integrators and developers. It also designs, manufactures, and
                  sells devices, including personal computers (PCs), tablets,
                  gaming and entertainment consoles, phones, other intelligent
                  devices, and related accessories, that integrate with its
                  cloud-based offerings. It offers an array of services,
                  including cloud-based solutions that provide customers with
                  software, services, platforms, and content, and it provides
                  solution support and consulting services.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TickerHeader;
