import React, { useEffect, useRef, useState } from "react";
import { useStorageState } from "../../hooks/useStorageState";
import _ from "lodash";
import "../../App.scss";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import uuid from "react-uuid";
import {
  CloseCircleOutlined,
  ConsoleSqlOutlined,
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
import EquityDashboardTour from "./EquityDashboardTour";
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
import db from "../../firebase";
import firebase from "firebase/app";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "firebase/firestore";

const GridLayout = WidthProvider(Responsive);

const HomeDashboard = (props) => {
  let { userID, dashboardID, urlTicker } = useParams();

  const { user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

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
  const [doesUserMatch, setDoesUserMatch] = useState(true);
  const [wasRemoved, setWasRemoved] = useState(false);
  const [removedCard, setRemovedCard] = useState();
  const [preRemovedLayout, setPreRemovedLayout] = useState([]);
  const [undoClicked, setUndoClicked] = useState(false);
  const [darkMode, setDarkMode] = useState();
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
    props.setActiveTicker(urlTicker);
  }, []);

  // This checks to see if the URL is a shared
  // one that the user was redirected to.
  useEffect(() => {
    const args = new URLSearchParams(window.location.search);
    let share = args.get("share");

    // The idea here is that if the URL contains "?share=true", then we
    // grab the name & structure of the layout and save it to the current
    // user's "saved_dashboards" collection.
    if (share == "true") {
      setIsLinkShared(true);
    }
  }, []);

  const saveSharedLayout = () => {
    var docRef = db.collection("user_dashboards").doc(userID);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let mapped = doc.data().dashboards.flatMap((el, i) => {
            console.log(el);

            let formatted = dashboardID.replaceAll("_", " ");
            let layoutNames = Object.values(el)[0][formatted];
            return layoutNames;
          });
          let formattedMap = mapped.filter((el) => {
            return el !== undefined;
          });

          db.collection("saved_dashboards")
            .doc(user.sub)
            .set(
              {
                id: user.sub,
                dashboards: firebase.firestore.FieldValue.arrayUnion({
                  [uuid()]: {
                    [dashboardID]: formattedMap,
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
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    console.log(user.sub);
  };

  console.log(isLinkShared);

  // Make sure that the page that the user is trying to view is a page that is only
  // viewable by them. I.e they shouldn't be able to look at other user's dashboards
  useEffect(() => {
    if (isAuthenticated) {
      if (user.sub != userID) {
        setDoesUserMatch(false);
      } else {
        setDoesUserMatch(true);
      }
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    if (isAuthenticated) {
      // This checks to see if the current user has a user_dashboards collection.
      const user_dashboard_data = db.collection("user_dashboards").doc(userID);

      user_dashboard_data.get().then((docSnapshot) => {
        // If not, create one and set mainLayout as the default
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
              if (split === dashboardID) {
                // If a layout was selected from the Sidenavbar, turn the item dashboard from firebase into an array,
                let mappedLayoutIndex = Object.values(values[key]).flatMap(
                  (card) => {
                    return parseInt(card.i);
                  }
                );

                props.setSelectedCardsIndex(mappedLayoutIndex);
                setMainLayout(values[key]);
                setSelectedDashboardName(Object.keys(values)[0]);
              }
            });
          });
        }
      });

      // This checks to see if the current user has a saved_dashboards collection.
      const saved_dashboard_data = db
        .collection("saved_dashboards")
        .doc(userID);

      saved_dashboard_data.get().then((docSnapshot) => {
        // If not, create one and set [] as the default
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
              if (split === dashboardID) {
                // If a layout was selected from the Sidenavbar, turn the item dashboard from firebase into an array,
                let mappedLayoutIndex = Object.values(values[key]).flatMap(
                  (card) => {
                    return parseInt(card.i);
                  }
                );

                props.setSelectedCardsIndex(mappedLayoutIndex);
                setMainLayout(values[key]);
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
    const docRef = db.collection("user_dashboards").doc(userID);
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
        const docRef = db.collection("user_dashboards").doc(userID);
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
              if (
                !mappedDashboards.includes(newLayoutName) &&
                newLayoutName !== undefined
              ) {
                // newLayout has some undefined values, so we automatically remove them here
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

            setWasYourDashboardSelected(false);

            // We setMainlayout to a null array
            setMainLayout([]);

            // Set mainLayout to the layout that the user selected.
            setTimeout(() => {
              setMainLayout(Object.values(currentLayout).flat());
              props.setSelectedCardsIndex(mappedLayoutIndex);
              setIsNewLayoutLoading(false);
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

            setWasSavedDashboardSelected(false);

            // We setMainlayout to a null array
            setMainLayout([]);

            // Set mainLayout to the layout that the user selected.
            setTimeout(() => {
              setMainLayout(Object.values(currentLayout).flat());
              props.setSelectedCardsIndex(mappedLayoutIndex);
              setIsNewLayoutLoading(false);
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
  } else if (isAuthenticated && doesUserMatch && !isLinkShared) {
    return (
      <React.Fragment>
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
        <CompanyHeader
          setActiveTicker={props.setActiveTicker}
          activeTicker={props.activeTicker}
          tickerCard={props.availableCards[0]}
        />

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
          setIsNewLayoutLoading={setIsNewLayoutLoading}
        />

        {/* Tour goes here*/}
        <EquityDashboardTour
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
              <React.Fragment>
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
                            item.id === card.id
                              ? { ...item, infoVisible: !item.infoVisible }
                              : item
                          )
                        )
                      }
                    />
                  </span>
                </Popover>

                <span onClick={() => removeCardFromLayout(card.id)}>
                  <CloseCircleOutlined />
                </span>
              </React.Fragment>
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
      </React.Fragment>
    );
  } else if (isLinkShared && user.sub == userID) {
    return (
      <React.Fragment>
        <h1>You can't save your own dashboards :(</h1>
      </React.Fragment>
    );
  } else if (isLinkShared) {
    return (
      <React.Fragment>
        <h1>Shared layout detected. Would you like to save it?</h1>
        <button className="btn btn-primary" onClick={saveSharedLayout}>
          Yes
        </button>
        <button className="btn btn-danger">No</button>
      </React.Fragment>
    );
  } else {
    loginWithRedirect();
  }
};

export default HomeDashboard;
