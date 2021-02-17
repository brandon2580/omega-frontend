import React, { useState, useEffect } from "react";
import "./App.scss";
import EquityDashboard from "./Components/EquityDashboard/EquityDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import "antd/dist/antd.css";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Index,
} from "react-router-dom";
import Portfolio from "./Components/Portfolio/Portfolio";
import ErrorNotFound from "./Components/ErrorNotFound";

function App() {
  const [activeTicker, setActiveTicker] = useState("AAPL");
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = "https://sigma7apis.azure-api.net/omega";
  const apiCode = "pcRfOm56RQRqa9ixWAyq9qWtlofFpzIZZbVAcNxGwJBEMaA4z1Q5Qw";

  // The 7 values in the state array are the id's of the cards that render on the dashboard by default.
  // These are the initial "selected" cards that render by default
  const [selectedCardsIndex, setSelectedCardsIndex] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
  ]);

  useEffect(() => {
    selectedCardsIndex.sort(function (a, b) {
      return a - b;
    });
  }, [selectedCardsIndex]);

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
      x: 0,
      y: 0,
      w: 6,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
      activeTicker: activeTicker,
    },

    {
      id: 2,
      name: "AnalystRecommendations",
      title: "Analyst Recommendations",
      x: 12,
      y: 0,
      w: 6,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
      activeTicker: activeTicker,
    },

    {
      id: 3,
      name: "Dividends",
      title: "Dividends",
      x: 0,
      y: 0,
      w: 4,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
      activeTicker: activeTicker,
    },

    {
      id: 4,
      name: "Price",
      title: "Price",
      x: 4,
      y: 0,
      w: 4,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
      activeTicker: activeTicker,
    },

    {
      id: 5,
      name: "PriceTarget",
      title: "Price Target",
      x: 12,
      y: 0,
      w: 4,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
      activeTicker: activeTicker,
    },

    {
      id: 6,
      name: "RiskAnalysis",
      title: "Performance (Risk Adjusted)",
      x: 0,
      y: 0,
      w: 6,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
      activeTicker: activeTicker,
    },

    {
      id: 7,
      name: "PriceCalendar",
      title: "Price Calendar",
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
      activeTicker: activeTicker,
    },

    {
      id: 8,
      name: "News",
      title: "News",
      x: 0,
      y: 0,
      w: 12,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
      activeTicker: activeTicker,
    },

    {
      id: 10,
      name: "OverallReturns",
      title: "Overall Returns",
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
      activeTicker: activeTicker,
    },

    {
      id: 11,
      name: "AverageReturns",
      title: "Average Gain vs. Average Loss",
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
      activeTicker: activeTicker,
    },

    {
      id: 12,
      name: "EarningsRatio",
      title: "Earnings Ratio",
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
      activeTicker: activeTicker,
    },

    {
      id: 13,
      name: "Valuation",
      title: "Valuation",
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
      activeTicker: activeTicker,
    },

    {
      id: 14,
      name: "Volatility",
      title: "Volatility",
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
      apiBaseUrl: apiBaseUrl,
      apiCode: apiCode,
      activeTicker: activeTicker,
    },
  ]);

  useEffect(() => {
    const company = fetch(
      `${apiBaseUrl}/company?code=${apiCode}==&symbol=${activeTicker}`
    ).then((res) => res.json());

    const prices = fetch(
      `${apiBaseUrl}/prices?code=${apiCode}==&symbol=${activeTicker}&range=1y`
    ).then((res) => res.json());

    const price_target = fetch(
      `${apiBaseUrl}/price_targets?code=${apiCode}==&symbol=${activeTicker}`
    ).then((res) => res.json());

    const analyst_recs = fetch(
      `${apiBaseUrl}/analyst_recs?code=${apiCode}==&symbol=${activeTicker}`
    ).then((res) => res.json());

    const news = fetch(
      `https://cloud.iexapis.com/stable/stock/${activeTicker}/news/last/50?token=pk_756d2eedb1d64c5192084581943ee4b9`
    ).then((res) => res.json());

    const valuation = fetch(
      `${apiBaseUrl}/compare_metric?code=${apiCode}==&symbol=${activeTicker}&metric=pe_ratio`
    ).then((res) => res.json());

    const volatility = fetch(
      `${apiBaseUrl}/compare_metric?code=${apiCode}==&symbol=${activeTicker}&metric=beta`
    ).then((res) => res.json());

    const risk = fetch(
      `${apiBaseUrl}/risk_metrics?code=${apiCode}==&symbol=${activeTicker}`
    ).then((res) => res.json());

    const average_returns = fetch(
      `${apiBaseUrl}/return_compare?code=${apiCode}==&symbol=${activeTicker}`
    ).then((res) => res.json());

    const dividends = fetch(
      `${apiBaseUrl}/dividends?code=${apiCode}==&symbol=${activeTicker}`
    ).then((res) => res.json());   

    const earnings = fetch(
      `${apiBaseUrl}/earnings?code=${apiCode}==&symbol=${activeTicker}`
    ).then((res) => res.json());

    const price_calendar = fetch(
      `${apiBaseUrl}/avg_return?code=${apiCode}==&symbol=${activeTicker}`
    ).then((res) => res.json());

    let allReqs = [
      company,
      price_target,
      prices,
      analyst_recs,
      news,
      valuation,
      volatility,
      risk,
      average_returns,
      dividends,
      earnings,
      price_calendar,
    ];
    Promise.all(allReqs).then(() => {
      setLoading(false);
    });
  });

  useEffect(() => {
    const company = fetch(
      `${apiBaseUrl}/company?code=${apiCode}==&symbol=${activeTicker}`
    ).then((res) => res.json());

    Promise.resolve(company).then((company) => {
      // Function syntax of setState to use the previous value from the state, as recommended by React
      setAvailableCards((prevCards) => {
        // For each cards, return a new modified version of that card
        return prevCards.map((card) => {
          switch (card.name) {
            case "TickerHeader":
              return {
                ...card,
                company_name: company.company_name,
                ticker: activeTicker,
                description: company.description,
                industry: company.industry,
                country: company.country,
                phone: company.phone,
                website: company.website,
                ceo: company.CEO,
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
              <h1>Welcome</h1>
              <h1>
                <a href="/dashboard">Dashboard</a>{" "}
              </h1>
            </Route>
            <Route path="/dashboard">
              <EquityDashboard
                availableCards={availableCards}
                selectedCardsIndex={selectedCardsIndex}
                setSelectedCardsIndex={setSelectedCardsIndex}
                setActiveTicker={setActiveTicker}
                activeTicker={activeTicker}
                loading={loading}
              />
            </Route>
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route component={ErrorNotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
