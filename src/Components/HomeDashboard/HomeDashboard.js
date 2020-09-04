import React, { useState } from "react";
import _ from "lodash";
import "../../App.scss";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import LineChartCard from "../TestComponents/LineChartCard";
import PieChartCard from "../TestComponents/PieChartCard";
import { Card } from "antd";
import { Responsive, WidthProvider } from "react-grid-layout";
import BarChartCard from "../TestComponents/BarChartCard";
import Sidenavbar from "../Navbars/Sidenavbar";

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

  function removeCardFromLayout(id) {
    // Card was selected, remove it
    if (props.selectedCardsIndex.includes(id)) {
      props.setSelectedCardIndex((prevSelected) =>
        prevSelected.filter((cardId) => cardId !== id)
      );
    }
  }

  var defaultLayout = [
    { i: "1", x: 0, y: 0, w: 6, h: 1 },
    { i: "2", x: 12, y: 0, w: 6, h: 1 },
    { i: "3", x: 0, y: 0, w: 4, h: 1 },
    { i: "4", x: 4, y: 0, w: 4, h: 1 },
    { i: "5", x: 12, y: 0, w: 4, h: 1 },
    { i: "6", x: 0, y: 0, w: 6, h: 1 },
    { i: "7", x: 12, y: 0, w: 6, h: 1 },
  ];

  var layout = { lg: value === true ? defaultLayout : defaultLayout };

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

      <Sidenavbar />

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
        {/*
          For reference, if we console.log(props.selectedCardsIndex), at first an empty array is returned. However if we 
          were to select a card that has an id value of 9 {id: 9}, then Array [9] would be logged. If we were to then 
          select a card with an id of 10 {id: 10}, it would return Array [9, 10]. 
        */}
        {props.selectedCardsIndex.map((cardId, i) => {
          const card = props.availableCards.find((c) => c.id === cardId);

          {
            /* If the user clicked on a card, and it had {PieChartCard: true}, return JSX */
          }
          if (card.PieChartCard) {
            return (
              <div
                key={card.id}
                data-grid={{ i: i.toString(), w: 6, h: 1, x: 0, y: 5 }}
              >
                <PieChartCard
                  key={card.id}
                  data={card.data}
                  title={card.title}
                />
                <button
                  onClick={() => {
                    card.selectable = true;
                    removeCardFromLayout(card.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          }

          {
            /* If the user clicked on a card, and it had {LineChartCard: true}, return JSX */
          }
          if (card.LineChartCard) {
            return (
              <div
                key={card.id}
                data-grid={{ i: i.toString(), w: 6, h: 1, x: 0, y: 5 }}
              >
                <LineChartCard
                  key={card.id}
                  data={card.data}
                  title={card.title}
                />
                <button
                  onClick={() => {
                    card.selectable = true;
                    removeCardFromLayout(card.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          }

          {
            /* If the user clicked on a card, and it had {BarChartCard: true}, return JSX */
          }
          if (card.BarChartCard) {
            return (
              <div
                key={card.id}
                data-grid={{ i: i.toString(), w: 6, h: 1, x: 0, y: 5 }}
              >
                <BarChartCard
                  key={card.id}
                  data={card.data}
                  title={card.title}
                />
                <button
                  onClick={() => {
                    card.selectable = true;
                    removeCardFromLayout(card.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          }
        })}
      </GridLayout>
    </div>
  );
};

export default HomeDashboard;
