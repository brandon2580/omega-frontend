import React, { useState, useEffect, cloneElement } from "react";
import "../../App.scss";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { HomeOutlined, LineChartOutlined } from "@ant-design/icons";
import EarningsCard from "./EarningsCard";
import AnalystCard from "./AnalystCard";
import EconomicsCard from "./EconomicsCard";
import DividendCard from "./DividendCard";
import ChartCard from "./ChartCard";
import SentimentCard from "./SentimentCard";
import RiskCard from "./RiskCard";
import FirstTestCard from "../TestComponents/FirstTestCard";
import _ from "lodash";
import { Card } from "antd";
import { Responsive, WidthProvider } from "react-grid-layout";
var company_logo = require("../../images/msft_logo.png");

const GridLayout = WidthProvider(Responsive);

const HomeDashboard = (props) => {
  const [value, setValue] = useState({ value: true });

  // If the user clicks enter, just blur the input instead of refreshing
  const keyPress = (event) => {
    if (event.charCode == 13) {
      event.preventDefault();
      event.target.blur();
    }
  };

  var defaultLayout = [
    { i: "1", x: 0, y: 0, w: 6, h: 1 },
    { i: "2", x: 12, y: 0, w: 6, h: 1 },
    { i: "3", x: 0, y: 0, w: 4, h: 1 },
    { i: "4", x: 4, y: 0, w: 4, h: 1 },
    { i: "5", x: 12, y: 0, w: 4, h: 1 },
    { i: "6", x: 0, y: 0, w: 6, h: 1 },
    { i: "7", x: 12, y: 0, w: 6, h: 1 },
  ];

  var backupLayout = [
    { i: "1", x: 0, y: 0, w: 6, h: 1 },
    { i: "2", x: 12, y: 0, w: 6, h: 1 },
    { i: "3", x: 0, y: 0, w: 4, h: 1 },
    { i: "4", x: 4, y: 0, w: 4, h: 1 },
    { i: "5", x: 12, y: 0, w: 4, h: 1 },
    { i: "6", x: 0, y: 0, w: 6, h: 1 },
    { i: "7", x: 12, y: 0, w: 6, h: 1 },
  ];

  var layout = { lg: value === true ? defaultLayout : backupLayout };

  return (
    <div>
      <h1
        contentEditable="true"
        onBlur={keyPress}
        onInput={keyPress}
        onKeyPress={keyPress}
        className="center header"
      >
        Home Dashboard
      </h1>

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
                  <p>Financial Data: 1,000,000</p>
                </div>
                <div className="col-lg-1 justify-content">
                  <p>Financial Data: 1,000,000</p>
                </div>
                <div className="col-lg-1 justify-content">
                  <p>Financial Data: 1,000,000</p>
                </div>
                <div className="col-lg-9 justify-content">
                  <p>
                    Microsoft Corporation is a technology company. The Company
                    develops, licenses, and supports a range of software
                    products, services and devices. The Company's segments
                    include Productivity and Business Processes, Intelligent
                    Cloud and More Personal Computing. The Company's products
                    include operating systems; cross-device productivity
                    applications; server applications; business solution
                    applications; desktop and server management tools; software
                    development tools; video games, and training and
                    certification of computer system integrators and developers.
                    It also designs, manufactures, and sells devices, including
                    personal computers (PCs), tablets, gaming and entertainment
                    consoles, phones, other intelligent devices, and related
                    accessories, that integrate with its cloud-based offerings.
                    It offers an array of services, including cloud-based
                    solutions that provide customers with software, services,
                    platforms, and content, and it provides solution support and
                    consulting services.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <SideNav
        style={{
          backgroundImage: "linear-gradient(315deg, #121516 0%, #000000 74%)",
          position: "fixed",
        }}
        className="sidenav"
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <HomeOutlined />
            </NavIcon>
            <NavText>
              <a href="/">Home</a>
            </NavText>
          </NavItem>
          <NavItem eventKey="home">
            <NavIcon>
              <LineChartOutlined />
            </NavIcon>
            <NavText>
              <a href="/">Data</a>
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>

      <GridLayout
        className="layout"
        layouts={layout}
        breakpoints={{ lg: 1200, s: 300 }}
        measureBeforeMount={true}
        draggableHandle={".ant-card-head"}
        cols={{ lg: 12, s: 1 }}
        rowHeight={600}
        width={1200}
      >
        <div key={1}>
          <EarningsCard />
        </div>
        <div key={2}>
          <AnalystCard />
        </div>
        <div key={3}>
          <DividendCard />
        </div>
        <div key={4}>
          <ChartCard />
        </div>
        <div key={5}>
          <SentimentCard />
        </div>
        <div key={6}>
          <RiskCard />
        </div>
        <div key={7}>
          <EconomicsCard />
        </div>
        {props.selectedCardsIndex.map((cardId, index, i) => {
          const card = props.availableCards.find((c) => c.id === cardId);
          return (
            <div
              key={card.id}
              data-grid={{ i: i.toString(), w: 6, h: 1, x: 0, y: 5 }}
            >
              <FirstTestCard key={card.id} data={card.data} title={card.title}>
                <p>{card.title}</p>
              </FirstTestCard>
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default HomeDashboard;
