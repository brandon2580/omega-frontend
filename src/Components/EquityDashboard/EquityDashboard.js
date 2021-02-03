import React, { useEffect, useRef, useState } from "react";
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
import Sidenavbar from "../Navbars/Sidenavbar";
import UndoPrompt from "./UndoPrompt";
import XButton from "../XButton";
import TickerHeader from "./TickerHeader";
import TopNavbar from "../Navbars/TopNavbar";
import News from "../Cards/News";
import PriceHistogram from "../Cards/PriceHistorgram";
import PriceCalendar from "../Cards/PriceCalendar";
import OverallReturns from "../Cards/OverallReturns";
import AverageReturns from "../Cards/AverageReturns";
import EarningsRatio from "../Cards/EarningsRatio";


const GridLayout = WidthProvider(Responsive);

const HomeDashboard = (props) => {
  // mainLayout is the default layout that the user will see when they first load the page
  // It consists of 7 cards identified by their id (i). They are assigned their default
  // widths, heights, and x, y positions on the grid
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
  const [preRemovedLayout, setPreRemovedLayout] = useState([]);
  const [undoClicked, setUndoClicked] = useState(false);
  const [darkMode, setDarkMode] = useState();

  // This automatically saves mainLayout in localStorage
  const [storedLayouts, setStoredLayouts] = useStorageState(
    [mainLayout],
    "storedLayouts"
  );

  // This assigned the name of "Default Layout" to mainLayout in localStorage
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

  // Saves a new layout to state whenever the user edits the current one. This will be called
  // every time a card is moved, resized, deleted, or added
  const handleLayoutChange = (layout) => {
    let debounced = _.debounce(() => {
      return setNewLayout(layout), 100;
    });
    debounced();
  };

  // We use a ref to make sure that this useEffect hook is NOT called on the
  // initial render of the page. Only when the state value of newLayoutName changes
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      //Saves layout to localstorage
      let localStorageLayoutNames = localStorage.getItem("storedLayoutNames");
      let storedLayoutNames = JSON.parse(localStorageLayoutNames.split());

      // If layout name does not already exist, proceed.
      if (!storedLayoutNames.includes(newLayoutName)) {
        // Add the new layout to storedLayouts and add the new layout name to storedLayoutNames
        setStoredLayouts([...storedLayouts, newLayout]);
        setStoredLayoutNames([...storedLayoutNames, newLayoutName]);
        setWasTaken(false);
      } else {
        setWasTaken(true);
        return;
      }
    }
  }, [newLayoutName]);

  if (wasSelected) {
    let localStorageLayouts = localStorage.getItem("storedLayouts");
    let storedLayouts = JSON.parse(localStorageLayouts.split());

    // If a layout was selected from the Sidenavbar, turn the item 'storedLayouts' from localstorage into an array,
    let mappedLayoutIndex = storedLayouts[selectedLayoutIndex].map((card) => {
      return parseInt(card.i);
    });

    // We setMainlayout to a null array
    setMainLayout([], setWasSelected(false));

    // Set 'setMainLayout' to storedLayouts at the index of whatever the index of the selected layout name was.
    setTimeout(() => {
      setMainLayout(
        storedLayouts[selectedLayoutIndex],
        props.setSelectedCardsIndex(mappedLayoutIndex)
      );
    });
  }

  const removeCardFromLayout = (id) => {
    // Card was selected, remove it
    if (props.selectedCardsIndex.includes(id)) {
      props.setSelectedCardsIndex((prevSelected) =>
        prevSelected.filter((cardId) => cardId !== id)
      );
      setWasRemoved(true);
      setRemovedCard(id);
      setPreRemovedLayout(newLayout);
    }
  };

  useEffect(() => {
    let undoTimeout;

    // If a card was removed, setWasRemoved to false after a 5 second period
    if (wasRemoved) {
      undoTimeout = setTimeout(() => {
        setWasRemoved(false);
      }, 5000);
    }

    // If the Undo button was clicked on the UndoPrompt, set the
    // layout back to how it was before the user removed the card
    if (undoClicked) {
      setMainLayout((prevLayout) => [...prevLayout, preRemovedLayout]);
      setWasRemoved(false);
      setUndoClicked(false);
    }

    return function cleanup() {
      clearTimeout(undoTimeout);
    };
  }, [wasRemoved, undoClicked]);

  const availableCardsObject = {
    Earnings,
    AnalystRecommendations,
    Dividends,
    Price,
    PriceTarget,
    RiskAnalysis,
    News,
    PriceHistogram,
    PriceCalendar,
    OverallReturns,
    AverageReturns,
    EarningsRatio
  };

  var layout = { lg: value === true ? mainLayout : mainLayout };

  return (
    <div>
      <TopNavbar
        availableCards={props.availableCards}
        selectedCardsIndex={props.selectedCardsIndex}
        setSelectedCardsIndex={props.setSelectedCardsIndex}
        setActiveTicker={props.setActiveTicker}
        wasTaken={wasTaken}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
        setNewLayoutName={setNewLayoutName}
      />

      <h1 className="center header">Equity Dashboard</h1>

      {/* TickerHeader goes here */}
      <TickerHeader tickerCard={props.availableCards[0]} />

      {/* Sidenavbar goes here */}
      <Sidenavbar
        setSelectedLayoutIndex={setSelectedLayoutIndex}
        setWasSelected={setWasSelected}
        wasSelected={wasSelected}
        selectedCardsIndex={props.selectedCardsIndex}
        setSelectedCardsIndex={props.setSelectedCardsIndex}
      />

      {/* Grid layout begins here */}
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

          // These are the default attributes that are applied to EVERY card in
          // selectedCardsIndex (aka the cards that are currently rendered on the page).
          // For many cards, there will be many null values. The reason why we just make
          // a defaultAttributes object containing every property for every card throughout the platform
          // is to reduce redundancy when conditionally rendering the cards. Without the defaultAttributes
          // object, we would be assigning properties like key, name, title, etc. to every card, causing a lot
          // of extra lines of repeated code. So instead, we just put it all into 1 object and assign it to every card.
          const defaultAttributes = {
            darkMode: darkMode,
            key: card.id,
            name: card.name,
            title: card.title,
            data: card.data,
            dataLabel: card.dataLabel,
            labels: card.labels,
            date: card.date,
            priceRange: card.priceRange,
            setPriceRange: card.setPriceRange,
            dividendRange: card.dividendRange,
            setDividendRange: card.setDividendRange,
            earningsPeriod: card.earningsPeriod,
            setEarningsPeriod: card.setEarningsPeriod,
            frame: card.frame,
            setFrame: card.setFrame,
            dates: card.dates,
            consensus: card.consensus,
            actual: card.actual,
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

          const defaultDataGrid = {
            x: card.x,
            y: card.y,
            w: card.w,
            h: card.h,
            minW: card.minW,
            isResizable: card.isResizable,
          };

          if (card.name in availableCardsObject) {
            const CustomTag = availableCardsObject[card.name];

            return (
              <div key={card.id} data-grid={defaultDataGrid}>
                <CustomTag {...defaultAttributes} />
              </div>
            );
          }
        })}
      </GridLayout>

      {/* Only renders when the user deletes a card from the page (for 5 seconds) */}
      {wasRemoved && (
        <UndoPrompt
          selectedCardsIndex={props.selectedCardsIndex}
          setSelectedCardsIndex={props.setSelectedCardsIndex}
          availableCards={props.availableCards}
          setWasRemoved={setWasRemoved}
          setUndoClicked={setUndoClicked}
          removedCardId={removedCard}
        />
      )}
    </div>
  );
};

export default HomeDashboard;
