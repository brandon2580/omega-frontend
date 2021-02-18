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
                <p>{props.tickerCard.industry}</p>

                <p>
                  CEO: {props.tickerCard.ceo}
                  <br />
                  <a href={props.tickerCard.website}>{props.tickerCard.website}</a>
                  <br />
                  {props.tickerCard.country}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-1 justify-content">
                <p className="center">
                  Market Cap: <br /> {props.tickerCard.market_cap}
                </p>
              </div>
              <div className="col-lg-1 justify-content">
                <p className="center">
                  Total Return: <br /> {props.tickerCard.total_return}
                </p>
              </div>
              <div className="col-lg-1 justify-content">
                <p className="center">
                  Price: <br /> {props.tickerCard.price}
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
