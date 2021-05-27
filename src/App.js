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

function App() {
  const { isLoading, isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [activeTicker, setActiveTicker] = useState("AAPL");
  const apiBaseUrl = "https://sigma7apis.azure-api.net/omega";
  const apiCode = process.env.REACT_APP_API_KEY;
  // The 7 values in the state array are the id's of the cards that render on the dashboard by default.
  // These are the initial "selected" cards that render by default
  const [selectedCardsIndex, setSelectedCardsIndex] = useState([
    6, 2, 8, 10, 14, 4,
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
      w: 6,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
    },

    {
      id: 5,
      name: "PriceTarget",
      title: "Price Target",
      info: "Wall Street sets price targets usually at the same time it recommends a particular stock. These price targets are usually a range of targets, an expected best case scenario price (high), an expected average price (average), and an expected worst case scenario (low). Sigma7 has averaged these recommendations and plotted them accordingly ontop of the price history. This gives an indication as to where the stock price is heading according to Wall Street's recommendations.",
      infoVisible: false,
      x: 6,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
    },

    {
      id: 6,
      name: "RiskAnalysis",
      title: "Performance (Risk Adjusted)",
      info: "Sigma7 has taken the average return and the average volatility (or risk) of a stock and used compared the two values to determine the overall stocks performance. Generally speaking, a stock that performs well is one that grows/earns more money than the risk it holds. Likewise, a stock that carries a lot of risk but not a lot of return, is a poor performing stock. ",
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
      id: 7,
      name: "PriceCalendar",
      title: "Price Calendar",
      info: "Sigma7 has averaged the overall returns of a stock by month, and then plotted them on a price radial calendar. This hopefully gives insight on the historical monthly trends of a stock. This may also show insight into what seasons a stock best performs or underperforms in.",
      infoVisible: false,
      x: 9,
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
      id: 10,
      name: "OverallReturns",
      title: "Overall Returns",
      info: "Sigma7 has consolidated all the returns and losses of a stock and compared them on a pie chart. More specifically, how many days does the stock go up in value vs how many days does it go down in value. This gives the investor an idea what the historical chances of a green or red day is.",
      infoVisible: false,
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
    },

    {
      id: 11,
      name: "AverageReturns",
      title: "Cumulative Gains vs. Cumulative Losses",
      info: "This compares the cumulative returns and the cumulative losses of a stock. This is calculated by taking the average return and average loss of a stock by month, and then multiplying by the number of months the stock is green or red (respectively). ",
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
      id: 12,
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
      id: 13,
      name: "Valuation",
      title: "Valuation",
      info: "This card compares the current valuations of a stock to its competitors (average) valuation and the (average) valuation of the entire market. This gives an idea as to whether or not a stock is overpriced or not. Note: Just because a stock has a higher valuation than its competitors, does not necessarily mean its overpriced. It may mean that its competitors are undervalued and the stock in question is correctly valued. It may also mean the stock in question is an overperformer and therefore correctly valued to its underperforming peers.",
      infoVisible: false,
      x: 6,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
    },

    {
      id: 14,
      name: "Volatility",
      title: "Volatility",
      info: "Volatility is the word used to describe how much a stock moves (up AND down). Generally speaking, a stock that is volatile is more risky, although risk is not always synonymous to volatility. Sigma7 has compared the volatility of a stock to its competitors and the market at large. This card gives an idea on the price swings one may experience owning this stock.",
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
  ]);

  useEffect(() => {
    if (isAuthenticated) {
      db.collection("users")
        .doc(user.sub)
        .set({
          name: user.name,
          email: user.email,
          email_verified: user.email_verified,
          id: user.sub,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const company = fetch(
      `${apiBaseUrl}/company_info?code=${apiCode}==&symbol=${activeTicker}`
    ).then((res) => res.json());

    const price = fetch(
      `https://cloud.iexapis.com/stable/stock/${activeTicker}/price?token=pk_756d2eedb1d64c5192084581943ee4b9`
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
                company_name: values[0].company_name,
                ticker: activeTicker,
                description: values[0].description,
                industry: values[0].industry,
                country: values[0].country,
                phone: values[0].phone,
                website: values[0].website,
                ceo: values[0].ceo,
                market_cap: numberWithCommas(values[0].mktcap),
                total_return: values[0].total_return,
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
            {" "}
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/dashboard">
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
            <Route component={ErrorNotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
