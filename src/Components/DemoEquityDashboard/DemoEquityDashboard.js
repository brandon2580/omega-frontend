import React, { useEffect, useRef, useState } from "react";
import { useStorageState } from "../../hooks/useStorageState";
import _ from "lodash";
import "../../App.scss";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useParams } from "react-router-dom";
import {
  CloseCircleOutlined,
  ConsoleSqlOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import Loader from "react-loader-spinner";
import Earnings from "../Cards/Earnings";
import AnalystRecommendations from "../Cards/AnalystRecommendations";
import Dividends from "../Cards/Dividends";
import Price from "../Cards/Price";
import PriceTarget from "../Cards/PriceTarget";
import CompareReturns from "../Cards/CompareReturns";
import UndoPrompt from "./DemoUndoPrompt";
import News from "../Cards/News";
import EarningsRatio from "../Cards/EarningsRatio";
import CorrelatedMarkets from "../Cards/CorrelatedMarkets";
import Risk from "../Cards/Risk";
import DebtToAssets from "../Cards/DebtToAssets";
import RevenueToProfit from "../Cards/RevenueToProfit";
import ResearchAndDevelopment from "../Cards/ResearchAndDevelopment";
import InstitutionalOwnership from "../Cards/InstitutionalOwnership";
import InsiderTrading from "../Cards/InsiderTrading";
import ComparingCEOPay from "../Cards/ComparingCEOPay";
import CEOPayBreakdown from "../Cards/CEOPayBreakdown";
import InsidersPie from "../Cards/InsidersPie";
import TopInsiders from "../Cards/TopInsiders";
import PoliticalSalesVsPurchases from "../Cards/PoliticalSalesVsPurchases";
import TopPoliticalInsiders from "../Cards/TopPoliticalInsiders";
import * as am4core from "@amcharts/amcharts4/core";
import { useAuth0 } from "@auth0/auth0-react";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "firebase/firestore";
import DemoCompanyHeader from "./DemoCompanyHeader";
import DemoEquityDashboardTour from "./DemoEquityDashboardTour";
import DemoSidenavbar from "../Navbars/DemoNavbars/DemoSidenavbar";
import DemoDashboardNavbar from "../Navbars/DemoNavbars/DemoDashboardNavbar";

const GridLayout = WidthProvider(Responsive);

const DemoHomeDashboard = (props) => {
  let { userID, dashboardID, urlTicker } = useParams();

  const { user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  // mainLayout is the default layout that the user will see when they first load the page
  // It consists of x amount cards identified by their id (i). They are assigned their default
  // widths, heights, and (x, y) positions on the grid
  const [mainLayout, setMainLayout] = useState([
    { i: "4", x: 0, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "17", x: 6, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "22", x: 0, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "18", x: 6, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "6", x: 0, y: 0, w: 12, h: 1, minW: 3, maxH: 1 },
  ]);
  const [newLayout, setNewLayout] = useState({});
  const [newLayoutName, setNewLayoutName] = useState();
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState(0);
  const [wasTaken, setWasTaken] = useState(false);
  const [wasYourDashboardSelected, setWasYourDashboardSelected] = useState();
  const [wasSavedDashboardSelected, setWasSavedDashboardSelected] = useState();
  const [value, setValue] = useState(true);
  const [doesUserMatch, setDoesUserMatch] = useState(true);
  const [wasRemoved, setWasRemoved] = useState(false);
  const [removedCard, setRemovedCard] = useState();
  const [preRemovedLayout, setPreRemovedLayout] = useState([]);
  const [undoClicked, setUndoClicked] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");
  const [isLinkShared, setIsLinkShared] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(true);
  const [dashboardNames, setDashboardNames] = useState([]);
  const [isNewLayoutLoading, setIsNewLayoutLoading] = useState(false);
  const [selectedDashboardName, setSelectedDashboardName] = useState("");
  const [selectedLayoutName, setSelectedLayoutName] =
    useState("Default_Layout");

  // If darkMode is active then change font to light and theme to dark & vice-versa if darkMode is disabled
  useEffect(() => {
    darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [darkMode]);

  const [isUserNewStatus, setIsUserNewStatus] = useStorageState(
    true,
    "isUserNew"
  );

  // If "isUserNew" doesn't exist in localstorage, create the item and assign it as "true"
  if (localStorage.getItem("isUserNew") == null) {
    localStorage.setItem("isUserNew", true);
  }

  // We're gonna disable animations for just Firefox because of how it handles the charts (causes lag). Every
  // other browser can have animations
  useEffect(() => {
    am4core.addLicense("ch-custom-attribution");
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
      console.log("using firefox, reverting to no animations");
      am4core.useTheme(am4themes_dark);
    } else {
      console.log("not using firefox, using animations");
      am4core.useTheme(am4themes_dark);
      am4core.useTheme(am4themes_animated);
    }
  }, []);

  // If the tour gets closed, the user is obviously no longer "new".
  // We set their "new" status to false.
  useEffect(() => {
    if (!isTourOpen) setIsUserNewStatus(false);
  }, [isTourOpen]);

  // If the user is NOT new, make sure to not open the Tour when
  // the page loads. The Tour is only intended for new users.
  useEffect(() => {
    if (!isUserNewStatus) setIsTourOpen(false);
  }, [isUserNewStatus]);

  // Set the active ticker to whatever ticker is present in the URL.
  useEffect(() => {
    props.setActiveTicker("AAPL");
  }, []);

  // Saves a new layout to state whenever the user edits the current one. This will be called
  // every time a card is moved, resized, deleted, or added
  const handleLayoutChange = (layout) => {
    let debounced = _.debounce(() => {
      return setNewLayout(layout), 100;
    });
    debounced();
  };

  // Deletes card from current layout
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

  // This allows the user to "undo" their deletion of a card from the
  // current layout within 5 seconds.
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

  // This is an object containing every available card that users have access to
  const availableCardsObject = {
    Earnings,
    AnalystRecommendations,
    Dividends,
    Price,
    PriceTarget,
    News,
    EarningsRatio,
    CompareReturns,
    CorrelatedMarkets,
    Risk,
    DebtToAssets,
    RevenueToProfit,
    ResearchAndDevelopment,
    InstitutionalOwnership,
    // CustomFundamentals,
    InsiderTrading,
    CEOPayBreakdown,
    ComparingCEOPay,
    InsidersPie,
    TopInsiders,
    PoliticalSalesVsPurchases,
    TopPoliticalInsiders,
  };

  const layout = { lg: value === true ? mainLayout : mainLayout };

  // Display a loading icon while the page is loading. Check if the user
  // is authenticated. If true, load the page. Otherwise, prompt them to login.
  if (isLoading) {
    return (
      <Loader
        className="fullyCentered"
        type="Puff"
        color="#007bff"
        height={100}
        width={100}
      />
    );
    {
      /*  If the layout is still loading, render everything except the cards that belong
        in the layout (instead, we replace that with a loading icon) */
    }
  } else if (isNewLayoutLoading) {
    return (
      <React.Fragment>
        <DemoDashboardNavbar
          availableCards={props.availableCards}
          setAvailableCards={props.setAvailableCards}
          selectedCardsIndex={props.selectedCardsIndex}
          setSelectedCardsIndex={props.setSelectedCardsIndex}
          setActiveTicker={props.setActiveTicker}
          activeTicker={props.activeTicker}
          urlTicker={urlTicker}
          userID={userID}
          selectedLayoutName={selectedLayoutName}
          isAuthenticated={isAuthenticated}
          wasTaken={wasTaken}
          setDarkMode={setDarkMode}
          darkMode={darkMode}
          setIsTourOpen={setIsTourOpen}
          setNewLayoutName={setNewLayoutName}
          dashboardNames={dashboardNames}
          setDashboardNames={setDashboardNames}
          setSelectedLayoutIndex={setSelectedLayoutIndex}
          setWasYourDashboardSelected={setWasYourDashboardSelected}
          mainLayout={mainLayout}
          selectedDashboardName={selectedDashboardName}
        />

        <h1 className="center header">{selectedDashboardName}</h1>

        {/* Sidenavbar goes here */}
        <DemoSidenavbar
          setSelectedLayoutIndex={setSelectedLayoutIndex}
          setWasYourDashboardSelected={setWasYourDashboardSelected}
          wasYourDashboardSelected={wasYourDashboardSelected}
          setWasSavedDashboardSelected={setWasSavedDashboardSelected}
          wasSavedDashboardSelected={wasSavedDashboardSelected}
          selectedCardsIndex={props.selectedCardsIndex}
          setSelectedCardsIndex={props.setSelectedCardsIndex}
          setDarkMode={setDarkMode}
          userID={userID}
          dashboardNames={dashboardNames}
          setDashboardNames={setDashboardNames}
          setIsNewLayoutLoading={setIsNewLayoutLoading}
        />

        <Loader
          className="fullyCentered"
          type="Puff"
          color="#007bff"
          height={100}
          width={100}
        />
      </React.Fragment>
    );
  } else if (!isLinkShared) {
    return (
      <React.Fragment>
        <DemoDashboardNavbar
          availableCards={props.availableCards}
          setAvailableCards={props.setAvailableCards}
          selectedCardsIndex={props.selectedCardsIndex}
          setSelectedCardsIndex={props.setSelectedCardsIndex}
          setActiveTicker={props.setActiveTicker}
          activeTicker={props.activeTicker}
          urlTicker={urlTicker}
          userID={userID}
          selectedLayoutName={selectedLayoutName}
          isAuthenticated={isAuthenticated}
          wasTaken={wasTaken}
          setDarkMode={setDarkMode}
          darkMode={darkMode}
          setIsTourOpen={setIsTourOpen}
          setNewLayoutName={setNewLayoutName}
          dashboardNames={dashboardNames}
          setDashboardNames={setDashboardNames}
          setSelectedLayoutIndex={setSelectedLayoutIndex}
          setWasYourDashboardSelected={setWasYourDashboardSelected}
          mainLayout={mainLayout}
          selectedDashboardName={selectedDashboardName}
        />

        <div
          className="row header justify-content-left"
          style={{ marginLeft: "5px" }}
        >
          <h1 className="equity-header col-lg-4">Default Layout</h1>
          <a href="/disclaimer" className="col-lg-8" style={{ textAlign: "right" }}>Disclaimer</a>
        </div>

        {/* CompanyHeader goes here */}
        <DemoCompanyHeader
          setActiveTicker={props.setActiveTicker}
          activeTicker={props.activeTicker}
          tickerCard={props.availableCards[0]}
        />

        {/* Sidenavbar goes here */}
        <DemoSidenavbar
          setSelectedLayoutIndex={setSelectedLayoutIndex}
          setWasYourDashboardSelected={setWasYourDashboardSelected}
          wasYourDashboardSelected={wasYourDashboardSelected}
          setWasSavedDashboardSelected={setWasSavedDashboardSelected}
          wasSavedDashboardSelected={wasSavedDashboardSelected}
          selectedCardsIndex={props.selectedCardsIndex}
          setSelectedCardsIndex={props.setSelectedCardsIndex}
          setDarkMode={setDarkMode}
          userID={userID}
          dashboardNames={dashboardNames}
          setDashboardNames={setDashboardNames}
          setIsNewLayoutLoading={setIsNewLayoutLoading}
        />

        {/* Tour goes here*/}
        <DemoEquityDashboardTour
          isTourOpen={isTourOpen}
          setIsTourOpen={setIsTourOpen}
          darkMode={darkMode}
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
          {/* We map out selectedCardsIndex and return each card along with it's attributes */}
          {props.selectedCardsIndex.map((cardId) => {
            const card = props.availableCards.find((c) => c.id === cardId);

            const defaultDataGrid = {
              x: card.x,
              y: card.y,
              w: card.w,
              h: card.h,
              minW: card.minW,
              isResizable: card.isResizable,
            };

            // This "extra" stuff is what shows up on the top part of every card. It includes
            // the "info" button and the "x" button to delete the card.
            const extra = (
              <span onClick={() => removeCardFromLayout(card.id)}>
                <CloseCircleOutlined />
              </span>
            );

            let infoButton = (
              <Popover
                content={card.info}
                title={card.title}
                trigger="click"
                visible={card.infoVisible}
              >
                <span className="span-margin">
                  <InfoCircleOutlined
                    style={{ paddingLeft: "10px" }}
                    className="blue-button"
                    onClick={() =>
                      props.setAvailableCards((arr) =>
                        arr.map((item) =>
                          item.id === card.id
                            ? { ...item, infoVisible: !item.infoVisible }
                            : item
                        )
                      )
                    }
                  />
                </span>
              </Popover>
            );

            let deleteButton = (
              <span onClick={() => removeCardFromLayout(card.id)}>
                <CloseCircleOutlined />
              </span>
            );

            let header = (
              <span className="justify-content-left">
                {card.title}
                <Popover
                  content={card.info}
                  title={card.title}
                  trigger="click"
                  visible={card.infoVisible}
                >
                  <span className="span-margin">
                    <InfoCircleOutlined
                      style={{ paddingLeft: "10px" }}
                      className="blue-button"
                      onClick={() =>
                        props.setAvailableCards((arr) =>
                          arr.map((item) =>
                            item.id === card.id
                              ? { ...item, infoVisible: !item.infoVisible }
                              : item
                          )
                        )
                      }
                    />
                  </span>
                </Popover>
              </span>
            );

            if (card.name in availableCardsObject) {
              const CustomTag = availableCardsObject[card.name];
              return (
                <div key={card.id} data-grid={defaultDataGrid}>
                  <CustomTag
                    {...card}
                    extra={extra}
                    header={header}
                    infoButton={infoButton}
                    deleteButton={deleteButton}
                    darkMode={darkMode}
                    activeTicker="AAPL"
                  />
                </div>
              );
            }
          })}
        </GridLayout>

        <p style={{ position: "fixed", bottom: "0", width: "100%", backgroundColor: "red" }}>You are using a DEMO version of sigma7. If you would like to have access to more features, please <a className="blue" onClick={loginWithRedirect}>login</a></p>

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
      </React.Fragment>
    );
  } else if (isLinkShared && user.sub == userID) {
    return (
      <React.Fragment>
        <h1>You can't save your own dashboards :(</h1>
      </React.Fragment>
    );
  }
};

export default DemoHomeDashboard;
