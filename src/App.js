import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import "antd/dist/antd.css";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import EquityDashboard from "./Components/EquityDashboard/EquityDashboard";
import Portfolio from "./Components/Portfolio/Portfolio";
import ErrorNotFound from "./Components/ErrorNotFound";
import LandingPage from "./LandingPage/LandingPage";
import Profile from "./Auth/Profile/Profile";
import Loader from "react-loader-spinner";
import { useAuth0 } from "@auth0/auth0-react";
import db from "./firebase";
import Explore from "./Components/Explore/Explore";
import Feedback from "./Components/Feedback/Feedback";

function App() {
  const { isLoading, isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [activeTicker, setActiveTicker] = useState("AAPL");
  const apiBaseUrl = "https://sigma7apis.azure-api.net/omega";
  const apiCode = process.env.REACT_APP_API_KEY;
  // The 7 values in the state array are the id's of the cards that render on the dashboard by default.
  // These are the initial "selected" cards that render by default
  const [selectedCardsIndex, setSelectedCardsIndex] = useState([
    5, 2, 8, 3, 6, 4
  ]);

  // These are every single available card throughout the platform, each identified by an id
  // which helps with identifying which cards are rendered on the dashboard and which ones aren't
  const [availableCards, setAvailableCards] = useState([
    {
      id: 0,
      name: "TickerHeader",
      title: "Ticker Header",
      description: "",
      sector: "",
      country: "",
      phone: "",
    },
    {
      id: 1,
      name: "Earnings",
      title: "Earnings",
      info: "Wall Street has expectations set for companies and their earnings/revenue. Compares the estimated earnings/revenue expectations vs the real earnings/revenue expectations. This typically dictates whether or not the company is underperforming, overperforming, or performing as expected. If a company is overperforming, that usually means their earnings are higher than what Wall Street expected. If a company is underperforming, that usually means their earnings are lower than what Wall Street expected.",
      infoVisible: false,
      x: 0,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
    },

    {
      id: 2,
      name: "AnalystRecommendations",
      title: "Analyst Recommendations",
      info: "Wall Street has recommendations set for companies. These recommendations typically are Strong Buy, Buy, Hold, Sell, Strong Sell. This usually dictates Wall Streets view on this, and we can aggregate the data on this for interesting insights. Sigma7 is displaying this in the format of a pie chart to dictate the proportions of the recommendations. ",
      infoVisible: false,
      x: 12,
      y: 0,
      w: 6,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
    },

    {
      id: 3,
      name: "Dividends",
      title: "Dividends",
      info: "Dividends are effectively cash payments paid out to investors from a company. Dividends are usually profits leftover from the business that are passed onto the investor in the form of a dividend. Likewise, this usually is a sign of stability and consistent returns. Most companies only issue dividends when their profits are consistent and stable. A growing dividend trend is usually a good sign of a stable business.",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
    },

    {
      id: 4,
      name: "Price",
      title: "Price",
      info: "This price card protrays the price of a stock in the format of candlesticks. Candlesticks display the price in a high, open, low, and close format. The wicks themselves are the highs and lows, and the bodies of the candles are the open and close. If a candlestick is red, that means it ended the day losing value. If a candlestick is green that means it ended the day growing in value. For more info, please google stock candlesticks explained.",
      infoVisible: false,
      x: 3,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
    },

    {
      id: 5,
      name: "PriceTarget",
      title: "Price Target (1 Year Out)",
      info: "Wall Street sets price targets usually at the same time it recommends a particular stock. These price targets are usually a range of targets, an expected best case scenario price (high), an expected average price (average), and an expected worst case scenario (low). Sigma7 has averaged these recommendations and plotted them accordingly ontop of the price history. This gives an indication as to where the stock price is heading according to Wall Street's recommendations.",
      infoVisible: false,
      x: 0,
      y: 0,
      w: 6,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
    },

    {
      id: 6,
      name: "News",
      title: "News",
      info: "Sigma7 has aggregated all of the news related to this particular stock.",
      infoVisible: false,
      x: 0,
      y: 0,
      w: 12,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
    },

    {
      id: 7,
      name: "EarningsRatio",
      title: "Earnings Ratio",
      info: "How often does this stock outperform expectations or underperform? This card computes how often overperformance and underperformance occurs and plots this onto a pie chart. This gives an idea how historical performance has been at the earnings/revenue level. A company with large growth often outperforms expectations.",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
    },
    {
      id: 8,
      name: "CompareReturns",
      title: "Compare Returns",
      info: "Compares returns of stock vs. competitors",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
    },
    {
      id: 9,
      name: "CorrelatedMarkets",
      title: "Correlated Markets",
      info: "Compares correlation",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
    },
  ]);

  const pk_key = process.env.IEX_PK_KEY;

  useEffect(() => {
    if (isAuthenticated) {
      db.collection("users").doc(user.sub).set({
        name: user.name,
        email: user.email,
        email_verified: user.email_verified,
        id: user.sub,
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const company = fetch(
      `https://sigma7-analytics.azure-api.net/sigma7-analytics/ticker_card?symbol=${activeTicker}`
    ).then((res) => res.json());

    const price = fetch(
      `https://cloud.iexapis.com/stable/stock/${activeTicker}/price?token=pk_6fdc6387a2ae4f8e9783b029fc2a3774`
    ).then((res) => res.json());

    // We use this function to add necessary commas (when needed) to large numbers such as market cap
    function numberWithCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    Promise.all([company, price]).then((values) => {
      // Function syntax of setState to use the previous value from the state, as recommended by React
      setAvailableCards((prevCards) => {
        // For each cards, return a new modified version of that card
        return prevCards.map((card) => {
          switch (card.name) {
            case "TickerHeader":

              return {
                ...card,
                company_name: values[0].companyName,
                ticker: activeTicker,
                description: values[0].description,
                industry: values[0].industry,
                country: values[0].country,
                phone: values[0].phone,
                website: values[0].website,
                ceo: values[0].ceo,
                market_cap: numberWithCommas(values[0].marketcap),
                price: values[1],
              };
          }

          // Otherwise return the original card
          return card;
        });
      });
    });
  }, [activeTicker]);

  return (
    <div className="app">
      <div className="side-margin">
        <Router>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>

            <Route
              path={`/dashboard/:userID/:dashboardID/:urlTicker`}
              component={EquityDashboard}
            >
              <div className="dashboard">
                <EquityDashboard
                  availableCards={availableCards}
                  setAvailableCards={setAvailableCards}
                  selectedCardsIndex={selectedCardsIndex}
                  setSelectedCardsIndex={setSelectedCardsIndex}
                  setActiveTicker={setActiveTicker}
                  activeTicker={activeTicker}
                />
              </div>
            </Route>
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route component={Explore} path={`/explore/:userID`}>
              <Explore />
            </Route>
            <Route path="/profile">
              {/* 
                Is the page loading? Show loading icon. Then make sure
                the user is authenticated. If they are, show them their profile. Redirect them to login
              */}
              {isLoading ? (
                <Loader
                  className="fullyCentered"
                  type="Puff"
                  color="#007bff"
                  height={100}
                  width={100}
                />
              ) : isAuthenticated ? (
                <Profile />
              ) : (
                <h1 className="login-prompt">
                  Please{" "}
                  <a className="login-link" onClick={loginWithRedirect}>
                    Login
                  </a>
                </h1>
              )}
            </Route>
            <Route component={Feedback} path={`/feedback/:userID`}>
              <Feedback />
            </Route>
            <Route component={ErrorNotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
