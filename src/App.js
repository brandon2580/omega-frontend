import React, { useState, useEffect } from "react";
import "./App.scss";
import TopNavbar from "./Components/Navbars/TopNavbar";
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

function App() {
  const [activeTickerChangeValue, setActiveTickerChangeValue] = useState("");
  const [activeTicker, setActiveTicker] = useState("AAPL");
  const apiBaseUrl = "https://api-omega.azurewebsites.net/api";
  const apiCode = "MoSRTDklfgUZFQX5w7NYpJGIW6FmGDd7MXBPHzj4ADrzLcD78KaFGw";

  // The 7 values in the state array are the id's of the cards that render on the dashboard by default
  const [selectedCardsIndex, setSelectedCardIndex] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
  ]);

  // availableCards is an array of objects.
  // Each object contains properties - id (int), title (string), data (array), (PieChartCard (bool) || LineChartCard (bool))
  const [availableCards, setAvailableCards] = useState([
    {
      id: 0,
      title: "Ticker Header",
      description: "",
      sector: "",
      country: "",
      phone: "",
      defaultCard: true,
    },
    {
      id: 1,
      title: "Earnings",
      data: [],
      labels: [],
      cardType: "ScatterChartCard",
      defaultCard: true,
    },

    {
      id: 2,
      title: "Analyst Recommendations",
      data: [],
      cardType: "PieChartCard",
      defaultCard: true,
    },

    {
      id: 3,
      title: "Dividends",
      data: [],
      cardType: "LineChartCard",
      defaultCard: true,
      dataLabel: "Dividend/Share",
    },

    {
      id: 4,
      title: "Price",
      data: [],
      cardType: "CandleChartCard",
      tickCount: 10,
      defaultCard: true,
      dataLabel: "Price",
    },

    {
      id: 5,
      title: "Price Target",
      data: [
        { name: "8/31", data: 2 },
        { name: "9/1", data: 2 },
        { name: "9/2", data: 3 },
        { name: "9/3", data: 1 },
        { name: "9/4", data: 2 },
      ],
      cardType: "LineChartCard",
      tickCount: 4,
      defaultCard: true,
      dataLabel: "Sentiment",
    },

    {
      id: 6,
      title: "Risk Analysis",
      data: [
        { name: "2017", data: 3 },
        { name: "2018", data: 3 },
        { name: "2019", data: 4 },
        { name: "2020", data: 5 },
      ],
      cardType: "BarChartCard",
      defaultCard: true,
      dataLabel: "Risk",
    },

    {
      id: 7,
      title: "Economics",
      data: [
        { name: "2014", data: 2.45 },
        { name: "2015", data: 2.88 },
        { name: "2016", data: 1.57 },
        { name: "2017", data: 2.22 },
        { name: "2018", data: 3.18 },
        { name: "2019", data: 2.33 },
        { name: "2020", data: -5.9 },
      ],
      cardType: "BarChartCard",
      defaultCard: true,
      dataLabel: "GDP",
    },

    {
      id: 8,
      title: "Volume Today",
      data: [
        { name: "Bought", value: 92 },
        { name: "Sold", value: 8 },
      ],
      cardType: "PieChartCard",
    },

    {
      id: 9,
      title: "Historical P/E",
      data: [
        { name: "2014", data: 13.76 },
        { name: "2015", data: 15.51 },
        { name: "2016", data: 39.27 },
        { name: "2017", data: 20.6 },
        { name: "2018", data: 44.87 },
        { name: "2019", data: 26.09 },
        { name: "2020", data: 26.33 },
      ],
      cardType: "LineChartCard",
    },

    {
      id: 10,
      title: "Buybacks",
      data: [
        { name: "2014", data: 20 },
        { name: "2015", data: 25 },
        { name: "2016", data: 37 },
        { name: "2017", data: 43 },
        { name: "2018", data: 43.5 },
        { name: "2019", data: 56 },
        { name: "2020", data: 60.5 },
      ],
      cardType: "BarChartCard",
    },
  ]);

  // This gets all of the data for the specified object in the availableCards array (CORS required)
  useEffect(() => {
    const company = fetch(
      `${apiBaseUrl}/company?code=${apiCode}==&symbol=${activeTicker}`
    ).then((res) => res.json());

    const earnings = fetch(
      `${apiBaseUrl}/earnings?code=${apiCode}==&symbol=${activeTicker}&lastN=4&period=Q`
    ).then((res) => res.json());

    const prices = fetch(
      `${apiBaseUrl}/prices?code=${apiCode}==&symbol=${activeTicker}&range=1y`
    ).then((res) => res.json());

    const analyst_recs = fetch(
      `${apiBaseUrl}/analyst_recs?code=${apiCode}==&symbol=${activeTicker}`
    ).then((res) => res.json());

    const dividends = fetch(
      `${apiBaseUrl}/dividends?code=${apiCode}==&symbol=${activeTicker}&lastN=5`
    ).then((res) => res.json());

    const adv_stats = fetch(
      `${apiBaseUrl}/adv_stats?code=${apiCode}==&symbol=${activeTicker}`
    ).then((res) => res.json());

    const allReqs = [
      company,
      earnings,
      prices,
      analyst_recs,
      dividends,
      adv_stats,
    ];

    Promise.all(allReqs).then((allResp) => {
      const [
        company,
        earnings,
        prices,
        analyst_recs,
        dividends,
        adv_stats,
      ] = allResp;

      // Function syntax of setState to use the previous value from the state, as recommended by React
      setAvailableCards((prevCards) => {
        // For each cards, return a new modified version of that card
        return prevCards.map((card) => {
          switch (card.title) {
            case "Ticker Header":
              return {
                ...card,
                company_name: company.company_name,
                description: company.description,
                sector: company.sector,
                country: company.country,
                phone: company.phone,
                // forward_pe_ratio: adv_stats.forward_pe_ratio.toFixed(2),
                // price_to_book: adv_stats.price_to_book.toFixed(2),
                // price_to_sales: adv_stats.price_to_sales.toFixed(2),
              };

            case "Earnings":
              console.log(Object.keys(earnings.consensus_eps));
              return {
                ...card,
                data: [
                  {
                    name: "Consensus",
                    data: [
                      [
                        1,
                        earnings.consensus_eps[
                          Object.keys(earnings.consensus_eps)[0]
                        ],
                      ],
                      [
                        2,
                        earnings.consensus_eps[
                          Object.keys(earnings.consensus_eps)[1]
                        ],
                      ],
                      [
                        3,
                        earnings.consensus_eps[
                          Object.keys(earnings.consensus_eps)[2]
                        ],
                      ],
                      [
                        4,
                        earnings.consensus_eps[
                          Object.keys(earnings.consensus_eps)[3]
                        ],
                      ],
                    ],
                  },
                  {
                    name: "Actual",
                    data: [
                      [1, earnings.real_eps[Object.keys(earnings.real_eps)[0]]],
                      [2, earnings.real_eps[Object.keys(earnings.real_eps)[1]]],
                      [3, earnings.real_eps[Object.keys(earnings.real_eps)[2]]],
                      [4, earnings.real_eps[Object.keys(earnings.real_eps)[3]]],
                    ],
                  },
                ],
                labels: [
                  Object.keys(earnings.consensus_eps)[0],
                  Object.keys(earnings.consensus_eps)[1],
                  Object.keys(earnings.consensus_eps)[2],
                  Object.keys(earnings.consensus_eps)[3],
                ],
              };

            case "Analyst Recommendations":
              return {
                ...card,
                data: [
                  { name: "Strong Buy", value: analyst_recs.rating_overweight },
                  { name: "Buy", value: analyst_recs.rating_buy },
                  { name: "Hold", value: analyst_recs.rating_hold },
                  { name: "Sell", value: analyst_recs.rating_sell },
                  {
                    name: "Strong Sell",
                    value: analyst_recs.rating_underweight,
                  },
                ],
              };

            case "Price":
              return {
                ...card,
                data: Object.keys(prices).map(function (key) {
                  return {
                    x: key,
                    y: [
                      prices[key].adj_open,
                      prices[key].adj_high,
                      prices[key].adj_low,
                      prices[key].adj_close,
                    ],
                  };
                }),
              };

            case "Dividends":
              return {
                ...card,
                data: Object.keys(dividends.amount)
                  .reverse()
                  .map(function (key) {
                    return {
                      name: key,
                      data: dividends.amount[key],
                    };
                  }),
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
            <Route path="/dashboard">
              <EquityDashboard
                availableCards={availableCards}
                selectedCardsIndex={selectedCardsIndex}
                setSelectedCardIndex={setSelectedCardIndex}
                activeTickerChangeValue={activeTickerChangeValue}
                setActiveTickerChangeValue={setActiveTickerChangeValue}
                activeTicker={activeTicker}
                setActiveTicker={setActiveTicker}
              />
            </Route>

            <Route path="/portfolio">
              <Portfolio />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
