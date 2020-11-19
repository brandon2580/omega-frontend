import React, { useEffect, useState } from "react";
import { Card, Popover } from "antd";
import "../../App.scss";

const TickerHeader = (props) => {
  const [ticker, setTicker] = useState('')
  useEffect(() => {
    setTicker(props.tickerCard.ticker)
  }, [props.tickerCard.ticker])
  return (
    <div className="row">
      <div className="col-lg-12">
        <Card title="Ticker" className="ticker-header">
          <hr className="card-hr" />

          <div className="ticker-information">
            <div className="row">
              <div className="col-lg-3 justify-content">
                <h1 className="ticker-title">{props.tickerCard.company_name}</h1>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 justify-content">
                <img style={{ borderRadius: "1000px" }} src={`https://storage.googleapis.com/iex/api/logos/${ticker}.png`} />
              </div>
              <div className="col-lg-3 ">
                <p>{props.tickerCard.sector}</p>

                <p>
                  {props.tickerCard.country}
                  <br />
                  {props.tickerCard.phone}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-1 justify-content">
                <p className="center">
                  Forward P/E: <br /> {props.tickerCard.forward_pe_ratio}
                </p>
              </div>
              <div className="col-lg-1 justify-content">
                <p className="center">
                  P/B: <br /> {props.tickerCard.price_to_book}
                </p>
              </div>
              <div className="col-lg-1 justify-content">
                <p className="center">
                  P/S: <br /> {props.tickerCard.price_to_sales}
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
};

export default TickerHeader;
