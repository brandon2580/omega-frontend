import React, { useEffect, useState } from "react";
import { Card, Popover } from "antd";
import "../../App.scss";
import Loader from "react-loader-spinner";

const CompanyHeader = (props) => {
  const [ticker, setTicker] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTicker(props.tickerCard.ticker);
    setIsLoading(false);
  }, [props.tickerCard.ticker]);

  if (isLoading) {
    return (
      <div className="row">
        <div className="col-lg-12">
          <Card title="Company" className="ticker-header">
            <hr className="card-hr" />

            <Loader
              className="fullyCentered"
              type="Puff"
              color="#007bff"
              height={100}
              width={100}
            />
          </Card>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row">
        <div className="col-lg-12">
          <Card title="Company" className="ticker-header">
            <hr className="card-hr" />

            <div className="ticker-information">
              <div className="row">
                <div className="col-lg-3 justify-content">
                  <h1 className="ticker-title">
                    {props.tickerCard.company_name}
                  </h1>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-3 justify-content">
                  <img
                    style={{ borderRadius: "1000px" }}
                    src={`https://storage.googleapis.com/iex/api/logos/${ticker}.png`}
                  />
                </div>
                <div className="col-lg-3 ">
                  <p>{props.tickerCard.industry}</p>

                  <p>
                    <a target="_blank" href={props.tickerCard.website}>
                      {props.tickerCard.website}
                    </a>
                    <br />
                    {props.tickerCard.country}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-1 justify-content">
                  <p className="center">
                    Total Value
                    <br /> $
                    <span style={{ color: "#007bff" }}>
                      {props.tickerCard.market_cap}
                    </span>
                  </p>
                </div>
                <div className="col-lg-1 justify-content">
                  <p className="center">
                    Total Return
                    <br />{" "}
                    <span style={{ color: "#007bff" }}>
                      {props.tickerCard.totalReturn}
                    </span>
                    %
                  </p>
                </div>
                <div className="col-lg-1 justify-content">
                  <p className="center">
                    Price
                    <br /> $
                    <span style={{ color: "#007bff" }}>
                      {props.tickerCard.price}
                    </span>
                  </p>
                </div>
                <div className="col-lg-9 justify-content">
                  <p>{props.tickerCard.description}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
};

export default CompanyHeader;
