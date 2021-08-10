import React, { useEffect, useState } from "react";
import { Card, Popover } from "antd";
import "../../App.scss";
import Loader from "react-loader-spinner";

const CompanyHeader = (props) => {
  const [companyData, setCompanyData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const company = fetch(
      `https://sigma7-api.azure-api.net/ticker_card?symbol=${props.activeTicker}`
    ).then((res) => res.json());

    // We use this function to add necessary commas (when needed) to large numbers such as market cap
    function numberWithCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    Promise.resolve(company).then((company) => {
      setCompanyData({
        company_name: company.companyName,
        ticker: props.activeTicker,
        description: company.description,
        industry: company.industry,
        country: company.country,
        phone: company.phone,
        website: company.website,
        ceo: company.ceo,
        market_cap: numberWithCommas(company.marketcap),
        totalReturn: company.maxChangePercent,
        // price: company[1],
      });
      setIsLoading(false);
    });
  }, [props.activeTicker]);

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
                  <h1 className="ticker-title">{companyData.company_name}</h1>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-3 justify-content">
                  <img
                    style={{ borderRadius: "1000px" }}
                    src={`https://storage.googleapis.com/iex/api/logos/${props.activeTicker}.png`}
                  />
                </div>
                <div className="col-lg-3 ">
                  <p>{companyData.industry}</p>

                  <p>
                    <a target="_blank" href={"//" + companyData.website}>
                      {companyData.website}
                    </a>
                    <br />
                    {companyData.country}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-1 justify-content">
                  <p className="center">
                    Total Value
                    <br /> $
                    <span style={{ color: "#007bff" }}>
                      {companyData.market_cap}
                    </span>
                  </p>
                </div>
                <div className="col-lg-1 justify-content">
                  <p className="center">
                    Total Return
                    <br />{" "}
                    <span style={{ color: "#007bff" }}>
                      {companyData.totalReturn}
                    </span>
                    %
                  </p>
                </div>
                <div className="col-lg-1 justify-content">
                  <p className="center">
                    Price
                    <br /> $
                    <span style={{ color: "#007bff" }}>
                      {companyData.price}
                    </span>
                  </p>
                </div>
                <div className="col-lg-9 justify-content">
                  <p>{companyData.description}</p>
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
