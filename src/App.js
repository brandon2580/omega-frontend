import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.scss";
import "jquery";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/src/collapse.js";
import "antd/dist/antd.css";
import "./icons/uicons-regular-rounded/css/uicons-regular-rounded.css";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import EquityDashboard from "./Components/EquityDashboard/EquityDashboard";
import Portfolio from "./Components/Portfolio/Portfolio";
import ErrorNotFound from "./Components/ErrorNotFound";
import LandingPage from "./LandingPage/LandingPage";
import Profile from "./Auth/Profile/Profile";
import Loader from "react-loader-spinner";
import {useAuth0} from "@auth0/auth0-react";
import db from "./firebase";

// import Explore from "./Components/Explore/Explore";

function App() {
  const {isLoading, isAuthenticated, loginWithRedirect, user} = useAuth0();
  const [activeTicker, setActiveTicker] = useState("");
  // The values in the state array represent the id's of the cards that render on the dashboard by default.
  // These are the initial "selected" cards that render by default.
  const [selectedCardsIndex, setSelectedCardsIndex] = useState([4, 2, 7, 5, 6]);

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
    },

    {
      id: 2,
      name: "AnalystRecommendations",
      title: "Wall St. Recommendations",
      info: "Wall Street has recommendations set for companies. These recommendations typically are Strong Buy, Buy, Hold, Sell, Strong Sell. This usually dictates Wall Streets view on this, and we can aggregate the data on this for interesting insights. Sigma7 is displaying this in the format of a pie chart to dictate the proportions of the recommendations. ",
      infoVisible: false,
      x: 12,
      y: 0,
      w: 6,
      h: 1,
      minW: 3,
      maxH: 1,
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
    },

    {
      id: 5,
      name: "PriceTarget",
      title: "Price Prediction (1 Year Out)",
      info: "Wall Street sets price targets usually at the same time it recommends a particular stock. These price targets are usually a range of targets, an expected best case scenario price (high), an expected average price (average), and an expected worst case scenario (low). Sigma7 has averaged these recommendations and plotted them accordingly ontop of the price history. This gives an indication as to where the stock price is heading according to Wall Street's recommendations.",
      infoVisible: false,
      x: 0,
      y: 0,
      w: 6,
      h: 1,
      minW: 3,
      maxH: 1,
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
    },
    {
      id: 8,
      name: "CompareReturns",
      title: "Compare Returns",
      info: "This card compares the returns of a given stock to its competitors. The formats that are displayed are Year to Date or Total Return.",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
    {
      id: 9,
      name: "CorrelatedMarkets",
      title: "Correlated Markets",
      info: "This card displays the top markets that a given stock is correlated to. This is determined by correlating the last year of price returns against the given security. The more correlated a stock is to a specific market, the more closely related they are in moving each others prices.",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
    {
      id: 10,
      name: "Risk",
      title: "Risk/Return",
      info: "This card displays the historical risk adjusted performance of a given stock, its competitors, and the S&P 500. The historical performance is plotted on a scatter plot. Stocks or points that are towards the bottom right corner are performing poorly, and stocks towards the top left corner are performing well. ",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
    {
      id: 11,
      name: "DebtToAssets",
      title: "Debt and Assets",
      info: "This card displays the debt and assets of a given company on a stacked line chart. This format should allow one to see whether or not a company has the means/assets to service their debt. Too much debt is often a poor indicator for a company.",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
    {
      id: 12,
      name: "RevenueToProfit",
      title: "Revenue and Profit",
      info: "This card displays the net income and revenue of a company on a stacked line chart. This format should allow one to see the profit margin towards the top of the area.",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
    {
      id: 13,
      name: "ResearchAndDevelopment",
      title: "Research and Development",
      info: "This chart visualizes the historical Research and Development of a given company. Depending on the industry, R&D can be an important driver of growth.",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
    {
      id: 14,
      name: "InstitutionalOwnership",
      title: "Institutional Ownership",
      info: "This card displays the top 10 largest institutional owners. More specifically, large companies, banks, hedgefunds, or other financial groups that own a large portion of a given company.",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
    {
      id: 15,
      name: "CustomFundamentals",
      title: "Custom Fundamentals",
      info: "This is a customizable fundamentals card.",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
    {
      id: 16,
      name: "InsiderTrading",
      title: "Insider Trades",
      info: "This card displays the historical transactions from insiders within the company. This allows users to determine the general pattern of sales and direction insiders are taking. It also may gleam information on how these insiders feel about the company's future. Insiders are typically those who work within the company or were involved early on in the company's history.",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
    {
      id: 17,
      name: "ComparingCEOPay",
      title: "Comparing CEO Pay",
      info: "ComparingCEOPay",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
    {
      id: 18,
      name: "CEOPayBreakdown",
      title: "CEO Pay Breakdown",
      info: "CEOPayBreakdown",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
    {
      id: 19,
      name: "InsidersPie",
      title: "Insider Sales vs Purchases",
      info: "This card displays the recent transactions of insider trades and shows their ratio of purchases to sales. This gives a quick snapshot of the general direction insiders are trading on. Insiders are typically those who work within the company or were involved early on in the company's history",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
    {
      id: 20,
      name: "TopInsiders",
      title: "Top Insiders",
      info: "This card shows the top insiders ranked by volume. The volume is an approximation as exact amounts are not specified in their disclosures, only ranges. Insiders are typically those who work within the company or were involved early on in the company's history",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
    {
      id: 21,
      name: "PoliticalInsiders",
      title: "Political Sales vs Purchases",
      info: "This card displays the recent transactions of politicians trades and shows their ratio of purchases to sales. This gives a quick snapshot of the general direction insiders are trading on. Politicians often make legislation that they believe will affect the stock market, and are unrestricted to trading in the stock market. Monitoring their transactions may be valuable to some.",
      infoVisible: false,
      x: 3,
      y: 2,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
  ]);

  // If the user is authenticated, create a doc for them in the database
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
            {/* <Route component={Explore} path={`/explore/:userID`}>
              <Explore />
            </Route> */}
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
            {/* <Route component={Feedback} path={`/feedback/:userID`}>
              <Feedback />
            </Route> */}
            <Route component={ErrorNotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
