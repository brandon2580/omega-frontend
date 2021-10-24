import React, { useEffect, useState } from "react";
import { Card } from "antd";
import "../../App.scss";
import Loader from "react-loader-spinner";

const CompanyHeader = (props) => {
  const [companyData, setCompanyData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const company = fetch(
      `https://sigma7-api.azure-api.net/ticker_card?symbol=${props.activeTicker}`
    ).then((res) => res.json());

    const price = fetch(
      `https://cloud.iexapis.com/stable/stock/${props.activeTicker}/price?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    // We use this function to add necessary commas (when needed) to large numbers such as market cap
    function numberWithCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    Promise.all([company, price]).then((company) => {
      setCompanyData({
        company_name: company[0].companyName,
        ticker: props.activeTicker,
        description: company[0].description,
        industry: company[0].industry,
        country: company[0].country,
        phone: company[0].phone,
        website: company[0].website,
        ceo: company.ceo,
        market_cap: numberWithCommas(company[0].marketcap),
        totalReturn: company[0].maxChangePercent,
        price: company[1],
      });
      setIsLoading(false);
    });
  }, [props.activeTicker]);

  let titleContent = (
    <span className="justify-content-left">
      <img
        style={{ borderRadius: "1000px", width: "50px", marginRight: "11px" }}
        src={`https://storage.googleapis.com/iex/api/logos/${props.activeTicker}.png`}
        alt="No Logo Found"
      />
      <span style={{ fontSize: "33px" }}>{companyData.company_name}&nbsp;</span>
      <span className="blue" style={{ fontSize: "25px", marginTop: "5px" }}> ${companyData.price}</span>
      {/* <span className="justify-content company-directional-status">
        BULLISH
      </span> */}
    </span>
  );

  let extraContent = (
    <span>
      <div className="row">
        <span className="white">{companyData.country}</span>
      </div>
      <div className="row">
        <a target="_blank" href={"//" + companyData.website}>
          {companyData.website}
        </a>
      </div>
    </span>
  );

  if (isLoading) {
    return (
      <div className="row">
        <div className="col-lg-12">
          <Card
            title={titleContent}
            extra={extraContent}
            className="ticker-header"
          >
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
      <React.Fragment>
        <div className="row">
          <div className="col-lg-12">
            <Card
              title={titleContent}
              extra={extraContent}
              className="ticker-header"
            >
              <hr className="card-hr" />

              <div className="ticker-information">
                <div className="row">
                  <div className="col-lg-12 company-header-description">{companyData.description}</div>
 
                </div>
              </div>
            </Card>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default CompanyHeader;
