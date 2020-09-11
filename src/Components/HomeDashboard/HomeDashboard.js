import React, { useState } from "react";
import _ from "lodash";
import "../../App.scss";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import LineChartCard from "../TemplateComponents/LineChartCard";
import PieChartCard from "../TemplateComponents/PieChartCard";
import { Card } from "antd";
import { Responsive, WidthProvider } from "react-grid-layout";
import BarChartCard from "../TemplateComponents/BarChartCard";
import Sidenavbar from "../Navbars/Sidenavbar";
import UndoPrompt from "./UndoPrompt";

var company_logo = require("../../images/msft_logo.png");

const GridLayout = WidthProvider(Responsive);

const HomeDashboard = (props) => {
  const [value, setValue] = useState(true);
  const [wasRemoved, setWasRemoved] = useState(false);
  const [removedCard, setRemovedCard] = useState();

  // If the user clicks enter, just blur the input instead of refreshing
  const keyPress = (e) => {
    if (e.charCode == 13) {
      e.preventDefault();
      e.target.blur();
    }
  };

  function removeCardFromLayout(id) {
    // Card was selected, remove it
    if (props.selectedCardsIndex.includes(id)) {
      props.setSelectedCardIndex((prevSelected) =>
        prevSelected.filter((cardId) => cardId !== id)
      );
      setWasRemoved(true);
      setRemovedCard(id);
    }
  }

  // Removes UndoPrompt after 5 seconds
  if (wasRemoved) {
    setTimeout(() => setWasRemoved(false), 5000);
  }

  var defaultLayout = [
    { i: "1", x: 0, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "2", x: 12, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "3", x: 0, y: 0, w: 4, h: 1, minW: 3, maxH: 1 },
    { i: "4", x: 4, y: 0, w: 4, h: 1, minW: 3, maxH: 1 },
    { i: "5", x: 12, y: 0, w: 4, h: 1, minW: 3, maxH: 1 },
    { i: "6", x: 0, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "7", x: 12, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
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
        draggableHandle={".ant-card-head"}
        cols={{ lg: 12, s: 1 }}
        rowHeight={575}
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
                data-grid={{
                  i: i.toString(),
                  w: 6,
                  h: 1,
                  x: 0,
                  y: 5,
                  minW: 3,
                  maxH: 1,
                }}
              >
                <PieChartCard
                  key={card.id}
                  title={card.title}
                  data={card.data}
                  button={
                    <span
                      onClick={() => {
                        card.selectable = true;
                        removeCardFromLayout(card.id);
                      }}
                      role="img"
                      aria-label="close"
                      class="anticon anticon-close ant-modal-close-icon"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        class=""
                        data-icon="close"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                      </svg>
                    </span>
                  }
                />
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
                data-grid={{
                  i: i.toString(),
                  w: 6,
                  h: 1,
                  x: 0,
                  y: 5,
                  minW: 3,
                  maxH: 1,
                }}
              >
                <LineChartCard
                  key={card.id}
                  title={card.title}
                  data={card.data}
                  dataLabel={card.dataLabel}
                  button={
                    <span
                      onClick={() => {
                        card.selectable = true;
                        removeCardFromLayout(card.id);
                      }}
                      role="img"
                      aria-label="close"
                      class="anticon anticon-close ant-modal-close-icon"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        class=""
                        data-icon="close"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                      </svg>
                    </span>
                  }
                />
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
                data-grid={{
                  i: i.toString(),
                  w: 6,
                  h: 1,
                  x: 0,
                  y: 5,
                  minW: 3,
                  maxH: 1,
                }}
              >
                <BarChartCard
                  key={card.id}
                  title={card.title}
                  data={card.data}
                  dataLabel={card.dataLabel}
                  button={
                    <span
                      onClick={() => {
                        card.selectable = true;
                        removeCardFromLayout(card.id);
                      }}
                      role="img"
                      aria-label="close"
                      class="anticon anticon-close ant-modal-close-icon"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        class=""
                        data-icon="close"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                      </svg>
                    </span>
                  }
                />
              </div>
            );
          }
        })}
      </GridLayout>

      {/* Only renders when the user deletes a card from the page (for 5 seconds) */}
      {wasRemoved && (
        <UndoPrompt
          selectedCardsIndex={props.selectedCardsIndex}
          setSelectedCardIndex={props.setSelectedCardIndex}
          availableCards={props.availableCards}
          setWasRemoved={setWasRemoved}
          removedCardId={removedCard}
        />
      )}
    </div>
  );
};

export default HomeDashboard;
