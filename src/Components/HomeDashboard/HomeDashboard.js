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
import SecondTestCard from "../TestComponents/SecondTestCard";
import _ from "lodash";
import { Card } from "antd";
import { Responsive, WidthProvider } from "react-grid-layout";
var company_logo = require("../../images/msft_logo.png");

const GridLayout = WidthProvider(Responsive);

// Put selectable cards in an object
const cards = {
  FirstTestCard,
  SecondTestCard,
};

const HomeDashboard = (props) => {
  // The value of AddedCard is the value of whatever the inherited value (as a prop) of selectedCard is
  const AddedCard = cards[props.selectedCard];
  const [value, setValue] = useState({ value: true });
  const [availableCards, setAvailableCards] = useState([
    { id: "1", title: 'first title', name: "card 1" },
    { id: "2", title: 'second title', name: "card 2" },
    
  ]);
  const [selectedCardsIndex, setSelectedCardIndex] = useState([]);

  function selectCard(id) {
    // card was selected, remove it
    if (selectedCardsIndex.includes(id)) {
      setSelectedCardIndex((prevSelected) =>
        prevSelected.filter((cardId) => cardId !== id)
      );
    }

    // card was not selected, add it
    else {
      setSelectedCardIndex((prevSelected) => [...prevSelected, id]);
    }
  }

  console.log(selectedCardsIndex)

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

      {availableCards.map((card) => {
        return (
          <FirstTestCard key={card.id} name={card.name} />
        );
      })}

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
      </GridLayout>
    </div>
  );
};

export default HomeDashboard;
