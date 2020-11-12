import React, { useState } from "react";
import { useStorageState } from "../../hooks/useStorageState";
import _ from "lodash";
import "../../App.scss";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import Earnings from "../Cards/Earnings";
import AnalystRecommendations from "../Cards/AnalystRecommendations";
import Dividends from "../Cards/Dividends";
import Price from "../Cards/Price";
import PriceTarget from "../Cards/PriceTarget";
import RiskAnalysis from "../Cards/RiskAnalysis";
import Economics from "../Cards/Economics";
import Sidenavbar from "../Navbars/Sidenavbar";
import UndoPrompt from "./UndoPrompt";
import XButton from "../XButton";
import TickerHeader from "./TickerHeader";
import TopNavbar from "../Navbars/TopNavbar";
import Buybacks from "../Cards/Buybacks";

const GridLayout = WidthProvider(Responsive);

const HomeDashboard = (props) => {
  const [mainLayout, setMainLayout] = useState([
    { i: "1", x: 0, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "2", x: 12, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "3", x: 0, y: 0, w: 4, h: 1, minW: 3, maxH: 1 },
    { i: "4", x: 4, y: 0, w: 4, h: 1, minW: 3, maxH: 1 },
    { i: "5", x: 12, y: 0, w: 4, h: 1, minW: 3, maxH: 1 },
    { i: "6", x: 0, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "7", x: 12, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
  ]);
  const [newLayout, setNewLayout] = useState({});
  const [newLayoutName, setNewLayoutName] = useState();
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState(0);
  const [wasTaken, setWasTaken] = useState(false);
  const [wasSelected, setWasSelected] = useState();
  const [value, setValue] = useState(true);
  const [wasRemoved, setWasRemoved] = useState(false);
  const [removedCard, setRemovedCard] = useState();
  const [storedLayouts, setStoredLayouts] = useStorageState(
    [mainLayout],
    "storedLayouts"
  );
  const [storedLayoutNames, setStoredLayoutNames] = useStorageState(
    ["Default Layout"],
    "storedLayoutNames"
  );

  // If the page is being loaded for the first time and
  // storedLayouts && storedLayoutNames don't exist, make them exist
  if (localStorage.getItem("storedLayouts" && "storedLayoutNames") == null) {
    localStorage.setItem("storedLayouts", JSON.stringify([]));
    localStorage.setItem("storedLayoutNames", JSON.stringify([]));
  }

  // If the user clicks enter, just blur the input instead of refreshing
  const blurOnEnter = (e) => {
    if (e.charCode == 13) {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleChange = (e) => {
    setNewLayoutName(e.target.value);
  };

  // Sets new layout when the user edits the current one
  const handleLayoutChange = (layout) => {
    setNewLayout(layout);
  };

  //Saves layout to localstorage
  const saveLayout = (e) => {
    e.preventDefault();
    let localStorageLayoutNames = localStorage.getItem("storedLayoutNames");
    let storedLayoutNames = JSON.parse(localStorageLayoutNames.split());

    if (!storedLayoutNames.includes(newLayoutName)) {
      // Add the new layout to storedLayouts and add the new layout name to storedLayoutNames
      setStoredLayouts([...storedLayouts, newLayout]);
      setStoredLayoutNames([...storedLayoutNames, newLayoutName]);
      setWasTaken(false);
      e.target.reset();
    } else {
      setWasTaken(true);
      return;
    }
  };

  // If a layout was selected, turn the item storedLayouts from localstorage into an array, then
  // setMainLayout to storedLayouts at the index of whatever the index of the selected layout name was
  if (wasSelected) {
    let localStorageLayouts = localStorage.getItem("storedLayouts");
    let storedLayouts = JSON.parse(localStorageLayouts.split());

    let mappedLayoutIndex = storedLayouts[selectedLayoutIndex].map((card) => {
      return parseInt(card.i);
    });

    setMainLayout([], setWasSelected(false));

    setTimeout(() => {
      setMainLayout(
        storedLayouts[selectedLayoutIndex],
        props.setSelectedCardIndex(mappedLayoutIndex)
      );
    });
  }

  const removeCardFromLayout = (id) => {
    // Card was selected, remove it
    if (props.selectedCardsIndex.includes(id)) {
      props.setSelectedCardIndex((prevSelected) =>
        prevSelected.filter((cardId) => cardId !== id)
      );
      setWasRemoved(true);
      setRemovedCard(id);
    }
  };

  // Removes UndoPrompt after 5 seconds
  if (wasRemoved) {
    setTimeout(() => setWasRemoved(false), 5000);
  }

  var layout = { lg: value === true ? mainLayout : mainLayout };

  return (
    <div>
      <TopNavbar
        availableCards={props.availableCards}
        selectedCardsIndex={props.selectedCardsIndex}
        setSelectedCardIndex={props.setSelectedCardIndex}
        setActiveTicker={props.setActiveTicker}
        wasTaken={wasTaken}
        handleChange={handleChange}
        saveLayout={saveLayout}
      />

      <h1
        contentEditable="true"
        onBlur={blurOnEnter}
        onInput={blurOnEnter}
        onKeyPress={blurOnEnter}
        className="center header"
      >
        Equity Dashboard
      </h1>

      {/* Ticker header goes here */}
      <TickerHeader tickerCard={props.availableCards[0]} />

      {/* Side navigation bar header goes here */}
      <Sidenavbar
        storedLayoutNames={storedLayoutNames}
        setSelectedLayoutIndex={setSelectedLayoutIndex}
        setWasSelected={setWasSelected}
        wasSelected={wasSelected}
        selectedCardsIndex={props.selectedCardsIndex}
        setSelectedCardIndex={props.setSelectedCardIndex}
      />

      {/* Grid layout header goes here */}
      <GridLayout
        className="layout"
        layouts={layout}
        breakpoints={{ lg: 1200, s: 300 }}
        onLayoutChange={handleLayoutChange}
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
        {props.selectedCardsIndex.map((cardId, index) => {
          const card = props.availableCards.find((c) => c.id === cardId);

          let defaultDataGrid = storedLayouts[selectedLayoutIndex].map(
            (card) => {
              return {
                i: card.i,
                w: parseInt(card.w),
                h: 1,
                x: parseInt(card.x),
                y: parseInt(card.y),
                minW: 3,
                maxH: 1,
              };
            }
          );

          var sorted = defaultDataGrid.sort((a, b) => a.i - b.i);

          const defaultAttributes = {
            key: card.id,
            name: card.name,
            title: card.title,
            data: card.data,
            dataLabel: card.dataLabel,
            labels: card.labels,
            range: card.range,
            setRange: card.setRange,
            button: (
              <span
                onClick={() => {
                  removeCardFromLayout(card.id);
                }}
                role="img"
                aria-label="close"
                class="anticon anticon-close ant-modal-close-icon"
              >
                <XButton />
              </span>
            ),
          };
          switch (card.name) {
            case "Earnings":
              return (
                <div key={card.id} data-grid={sorted[index]}>
                  <Earnings {...defaultAttributes} />
                </div>
              );

            case "AnalystRecommendations":
              return (
                <div key={card.id} data-grid={sorted[index]}>
                  <AnalystRecommendations {...defaultAttributes} />
                </div>
              );

            case "Dividends":
              return (
                <div key={card.id} data-grid={sorted[index]}>
                  <Dividends {...defaultAttributes} />
                </div>
              );

            case "Price":
              return (
                <div key={card.id} data-grid={sorted[index]}>
                  <Price {...defaultAttributes} />
                </div>
              );

            case "PriceTarget":
              return (
                <div key={card.id} data-grid={sorted[index]}>
                  <PriceTarget {...defaultAttributes} />
                </div>
              );

            case "RiskAnalysis":
              return (
                <div key={card.id} data-grid={sorted[index]}>
                  <RiskAnalysis {...defaultAttributes} />
                </div>
              );

            case "Economics":
              return (
                <div key={card.id} data-grid={sorted[index]}>
                  <Economics {...defaultAttributes} />
                </div>
              );

            case "Buybacks":
              return (
                <div key={card.id} data-grid={sorted[index]}>
                  <Buybacks {...defaultAttributes} />
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
