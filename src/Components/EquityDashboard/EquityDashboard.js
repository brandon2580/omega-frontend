import React, { useEffect, useRef, useState } from "react";
import { useStorageState } from "../../hooks/useStorageState";
import _ from "lodash";
import "../../App.scss";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import Tour from "reactour";
import { Responsive, WidthProvider } from "react-grid-layout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useHistory } from "react-router";
import { hotjar } from 'react-hotjar';
import uuid from "react-uuid";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseCircleOutlined,
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
import Sidenavbar from "../Navbars/Sidenavbar";
import UndoPrompt from "./UndoPrompt";
import CompanyHeader from "./CompanyHeader";
import DashboardNavbar from "../Navbars/DashboardNavbar";
import News from "../Cards/News";
import EarningsRatio from "../Cards/EarningsRatio";
import CorrelatedMarkets from "../Cards/CorrelatedMarkets";
import Risk from "../Cards/Risk";
import { useAuth0 } from "@auth0/auth0-react";
import db from "../../firebase";
import firebase from "firebase/app";
import "firebase/firestore";

// hotjar.initialize(2462125, hjsv);
const GridLayout = WidthProvider(Responsive);


const HomeDashboard = (props) => {
  let { userID, dashboardID, urlTicker } = useParams();

  const { isLoading, isAuthenticated, loginWithRedirect, user } = useAuth0();

  // mainLayout is the default layout that the user will see when they first load the page
  // It consists of x amount cards identified by their id (i). They are assigned their default
  // widths, heights, and (x, y) positions on the grid
  const [mainLayout, setMainLayout] = useState([
    { i: "4", x: 0, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "2", x: 6, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "7", x: 0, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "5", x: 6, y: 0, w: 6, h: 1, minW: 3, maxH: 1 },
    { i: "6", x: 0, y: 0, w: 12, h: 1, minW: 3, maxH: 1 },
  ]);
  const [newLayout, setNewLayout] = useState({});
  const [newLayoutName, setNewLayoutName] = useState();
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState(0);
  const [wasTaken, setWasTaken] = useState(false);
  const [wasYourDashboardSelected, setWasYourDashboardSelected] = useState();
  const [wasSavedDashboardSelected, setWasSavedDashboardSelected] = useState();
  const [value, setValue] = useState(true);
  const [wasRemoved, setWasRemoved] = useState(false);
  const [removedCard, setRemovedCard] = useState();
  const [preRemovedLayout, setPreRemovedLayout] = useState([]);
  const [undoClicked, setUndoClicked] = useState(false);
  const [darkMode, setDarkMode] = useState();
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");
  const [isTourOpen, setIsTourOpen] = useState(true);
  const [dashboardNames, setDashboardNames] = useState([]);
  const [selectedDashboardName, setSelectedDashboardName] = useState("");
  const [selectedLayoutName, setSelectedLayoutName] =
    useState("Default_Layout");

  useEffect(() => {
    darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
  }, [darkMode]);

  const [isUserNewStatus, setIsUserNewStatus] = useStorageState(
    true,
    "isUserNew"
  );

  if (localStorage.getItem("isUserNew") == null) {
    localStorage.setItem("isUserNew", true);
  }

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

  useEffect(() => {
    props.setActiveTicker(urlTicker)
  }, [])

  // This checks to see if the current user has a user_dashboards collection.
  // If not, create one and set mainLayout as the default
  useEffect(() => {
    if (isAuthenticated) {
      const user_dashboard_data = db.collection("user_dashboards").doc(userID);

      user_dashboard_data.get().then((docSnapshot) => {
        if (!docSnapshot.exists) {
          user_dashboard_data.set({
            id: userID,
            dashboards: [{ [uuid()]: { "Default Layout": mainLayout } }],
          });
        } else {
          docSnapshot.data().dashboards.map((el) => {
            let values = Object.values(el)[0];
            let keys = Object.keys(values);

            keys.forEach((key) => {
              let split = key.split(" ").join("_");
              if (split == dashboardID) {
                // If a layout was selected from the Sidenavbar, turn the item dashboard from firebase into an array,
                let mappedLayoutIndex = Object.values(values[key]).flatMap(
                  (card) => {
                    return parseInt(card.i);
                  }
                );

                setMainLayout(
                  values[key],
                  props.setSelectedCardsIndex(mappedLayoutIndex)
                );
              }
            });
          });
        }
      });

      const saved_dashboard_data = db
        .collection("saved_dashboards")
        .doc(userID);

      saved_dashboard_data.get().then((docSnapshot) => {
        if (!docSnapshot.exists) {
          saved_dashboard_data.set({
            id: userID,
            dashboards: [],
          });
        } else {
          docSnapshot.data().dashboards.map((el) => {
            let values = Object.values(el)[0];
            let keys = Object.keys(values);

            keys.forEach((key) => {
              let split = key.split(" ").join("_");
              if (split == dashboardID) {

                // If a layout was selected from the Sidenavbar, turn the item dashboard from firebase into an array,
                let mappedLayoutIndex = Object.values(values[key]).flatMap(
                  (card) => {
                    return parseInt(card.i);
                  }
                );

                setMainLayout(
                  values[key],
                  props.setSelectedCardsIndex(mappedLayoutIndex)
                );
              }
            });
          });
        }
      });
    }
  }, [isAuthenticated]);

  // Saves a new layout to state whenever the user edits the current one. This will be called
  // every time a card is moved, resized, deleted, or added
  const handleLayoutChange = (layout) => {
    let debounced = _.debounce(() => {
      return setNewLayout(layout), 100;
    });
    debounced();
  };

  // Gets the name of the currently selected layout. We use this info for when the user wants
  // to share a layout to the Explore page. This way, each layout is labeled.
  useEffect(() => {
    var docRef = db.collection("user_dashboards").doc(userID);
    docRef.get().then((doc) => {
      if (doc.exists) {
        let mapped = Object.values(doc.data().dashboards).flatMap((el, i) => {
          let values = Object.values(el)[0];
          let names = Object.keys(values);
          return names;
        });
        setSelectedDashboardName(mapped[selectedLayoutIndex]);
      }
    });
  }, [selectedLayoutIndex]);

  // We use a ref to make sure that this useEffect hook is NOT called on the
  // initial render of the page. Only when the state value of newLayoutName changes (aka when
  // the user saves a new dashboard)
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (isAuthenticated) {
        var docRef = db.collection("user_dashboards").doc(userID);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              let dashboards = Object.values(doc.data().dashboards);

              let mappedDashboards = dashboards.flatMap((el) => {
                return Object.keys(Object.values(el)[0]);
              });

              // Checks to see if the layoutName already exists.
              // If not, save the layout & the layoutName to firebase
              if (!mappedDashboards.includes(newLayoutName)) {
                // newLayout has some undefined values, so we automatically remove them here.
                let newLayoutExcludeUndefined = newLayout.map((card) => {
                  Object.keys(card).forEach(
                    (key) => card[key] === undefined && delete card[key]
                  );
                  return card;
                });

                db.collection("user_dashboards")
                  .doc(userID)
                  .set(
                    {
                      id: userID,
                      dashboards: firebase.firestore.FieldValue.arrayUnion({
                        [uuid()]: {
                          [newLayoutName]: newLayoutExcludeUndefined,
                        },
                      }),
                    },
                    { merge: true }
                  )
                  .then(() => {
                    console.log("Document successfully written!");
                  })
                  .catch((error) => {
                    console.error("Error writing document: ", error);
                  });
                setWasTaken(false);
              } else {
                setWasTaken(true);
                return;
              }
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }
    }
  }, [newLayoutName]);

  const routerHistory = useHistory();
  // If a layout from "Your Dashboards" was selected from the SideNav, change the mainLayout to whatever they selected.
  if (wasYourDashboardSelected) {
    let docRef = db.collection("user_dashboards").doc(userID);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let data = doc.data().dashboards[selectedLayoutIndex];
          if (data) {
            let currentLayout = Object.values(data)[0];

            // If a layout was selected from the Sidenavbar, turn the item dashboard from firebase into an array,
            let mappedLayoutIndex = Object.values(currentLayout)
              .flat()
              .map((card) => {
                return parseInt(card.i);
              });

            setSelectedLayoutName(
              Object.keys(currentLayout).flat()[0].split(" ").join("_")
            );
            routerHistory.push(
              `/dashboard/${userID}/${selectedLayoutName}/${urlTicker.toUpperCase()}`
            );

            // We setMainlayout to a null array
            setMainLayout([], setWasYourDashboardSelected(false));

            // Set mainLayout to the layout that the user selected.
            setTimeout(() => {
              setMainLayout(
                Object.values(currentLayout).flat(),
                props.setSelectedCardsIndex(mappedLayoutIndex)
              );
            });
          }
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  // If a layout from "Saved Dashboards" was selected from the SideNav, change the mainLayout to whatever they selected.
  if (wasSavedDashboardSelected) {
    let docRef = db.collection("saved_dashboards").doc(userID);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let data = doc.data().dashboards[selectedLayoutIndex];
          if (data) {
            let currentLayout = Object.values(data)[0];

            // If a layout was selected from the Sidenavbar, turn the item dashboard from firebase into an array,
            let mappedLayoutIndex = Object.values(currentLayout)
              .flat()
              .map((card) => {
                return parseInt(card.i);
              });

            setSelectedLayoutName(
              Object.keys(currentLayout).flat()[0].split(" ").join("_")
            );
            routerHistory.push(
              `/dashboard/${userID}/${selectedLayoutName}/${urlTicker.toUpperCase()}`
            );

            // We setMainlayout to a null array
            setMainLayout([], setWasSavedDashboardSelected(false));

            // Set mainLayout to the layout that the user selected.
            setTimeout(() => {
              setMainLayout(
                Object.values(currentLayout).flat(),
                props.setSelectedCardsIndex(mappedLayoutIndex)
              );
            });
          }
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
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
    News,
    EarningsRatio,
    CompareReturns,
    CorrelatedMarkets,
    Risk
  };

  var layout = { lg: value === true ? mainLayout : mainLayout };

  const steps = [
    {
      selector: "body",
      content: "Welcome to sigma7! We are going to go through a short tour.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".dashboard-navbar",
      content: "This is the navigation bar where you can search for stocks, add cards, share dashboards, & more!",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".stock-symbol-form",
      content: "If you want to search up any given stock/company, this is where you would type it. Feel free to type in the whole name of the company or just the stock symbol.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".dashboard-nav-buttons",
      content: "This is where you can add cards to your dashboard, save a new layout, share dashboards, view your profile, and send us feedback!",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".sidenav",
      content: "This is the side navigation bar. This is where you will find your saved layouts. In the future, you will be able to save other users' dashboards here on top of your own.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".ticker-header",
      content: "This is where you can find general information about the company you're researching.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".price-card",
      content: "This card displays the price movements of a given stock.This card's chart format may swap between a candlestick or line format.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },

    {
      selector: ".analystrecs-card",
      content: "This card displays analyst recommendations from Wall Street. These recommendations are derived from extensive research and industry knowledge.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".earningsratio-card",
      content: "This card displays the rate in which a company meets or misses expectations set by research analysts. Typically, a company will see a significant value/price increase if they exceed or meet the expectations set for them. The inverse is true if companies fail to meet expectations set for them.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".pricetarget-card",
      content:
        "Much like Analyst Recommendations, Analysts from Wall Street set price targets for given stocks. These targets are essentially predictions set by experienced industry professionals within Wall Street. These targets can often dictate the price expectations of other investors.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
    {
      selector: ".news-card",
      content: "This card displays the most recent news articles for a particular stock, and color codes them according to their sentiment or feelings on the stock.",
      style: {
        backgroundColor: theme,
        border: `1px solid ${textColor}`,
      },
    },
  ];

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
  } else {
    if (isAuthenticated) {
      return (
        <div>
          <DashboardNavbar
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

          {/* CompanyHeader goes here */}
          <CompanyHeader tickerCard={props.availableCards[0]} />

          {/* Sidenavbar goes here */}
          <Sidenavbar
            setSelectedLayoutIndex={setSelectedLayoutIndex}
            setWasYourDashboardSelected={setWasYourDashboardSelected}
            wasYourDashboardSelected={wasYourDashboardSelected}
            setWasSavedDashboardSelected={setWasSavedDashboardSelected}
            wasSavedDashboardSelected={wasSavedDashboardSelected}
            selectedCardsIndex={props.selectedCardsIndex}
            setSelectedCardsIndex={props.setSelectedCardsIndex}
            userID={userID}
            dashboardNames={dashboardNames}
            setDashboardNames={setDashboardNames}
          />

          <Tour
            steps={steps}
            isOpen={isTourOpen}
            onRequestClose={() => setIsTourOpen(false)}
            lastStepNextButton={<a className="lets-begin-link">Lets begin!</a>}
            accentColor={"#007bff"}
            nextButton={<ArrowRightOutlined />}
            prevButton={<ArrowLeftOutlined />}
            rounded={10}
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

              const defaultDataGrid = {
                x: card.x,
                y: card.y,
                w: card.w,
                h: card.h,
                minW: card.minW,
                isResizable: card.isResizable,
              };

              const extra = (
                <div>
                  <Popover
                    content={card.info}
                    title={card.title}
                    trigger="click"
                    visible={card.infoVisible}
                  >
                    <span className="span-margin">
                      <InfoCircleOutlined
                        className="blue-button"
                        onClick={() =>
                          props.setAvailableCards((arr) =>
                            arr.map((item) =>
                              item.id == card.id
                                ? { ...item, infoVisible: !item.infoVisible }
                                : item
                            )
                          )
                        }
                      />
                    </span>{" "}
                  </Popover>

                  <span onClick={() => removeCardFromLayout(card.id)}>
                    <CloseCircleOutlined />
                  </span>
                </div>
              );

              if (card.name in availableCardsObject) {
                const CustomTag = availableCardsObject[card.name];
                return (
                  <div key={card.id} data-grid={defaultDataGrid}>
                    <CustomTag
                      {...card}
                      extra={extra}
                      darkMode={darkMode}
                      activeTicker={urlTicker}
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
              setSelectedCardsIndex={props.setSelectedCardsIndex}
              availableCards={props.availableCards}
              setWasRemoved={setWasRemoved}
              setUndoClicked={setUndoClicked}
              removedCardId={removedCard}
            />
          )}
        </div>
      );
    } else {
      loginWithRedirect();
    }
  }
};

export default HomeDashboard;
