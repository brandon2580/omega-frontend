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
  const [priceRange, setPriceRange] = useState("1y");
  const [dividendRange, setDividendRange] = useState(25);
  const [earningsPeriod, setEarningsPeriod] = useState("Q");
  const [priceFrame, setPriceFrame] = useState("daily");
  const [calendarFrame, setCalendarFrame] = useState("max");

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
      actual: { name: "Actual", eps: [] },
      consensus: { name: "Consensus", eps: [] },
      earningsPeriod: earningsPeriod,
      setEarningsPeriod: setEarningsPeriod,
      dates: [],
      x: 0,
      y: 0,
      w: 6,
      h: 1,
      minW: 3,
      maxH: 1,
    },

    {
      id: 2,
      name: "AnalystRecommendations",
      title: "Analyst Recommendations",
      data: [
        { name: "Strong Buy", value: 0 },
        { name: "Buy", value: 0 },
        { name: "Hold", value: 0 },
        { name: "Sell", value: 0 },
        { name: "Strong Sell", value: 0 },
      ],
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
      data: [{ label: "", value: 0 }],
      dividendRange: dividendRange,
      setDividendRange: setDividendRange,
      dataLabel: "Dividend/Share",
      x: 0,
      y: 0,
      w: 4,
      h: 1,
      minW: 3,
      maxH: 1,
    },

    {
      id: 4,
      name: "Price",
      title: "Price",
      data: [{ x: "", y: [0, 0, 0, 0] }],
      priceRange: priceRange,
      setPriceRange: setPriceRange,
      priceFrame: priceFrame,
      setPriceFrame: setPriceFrame,
      date: "",
      tickCount: 10,
      dataLabel: "Price",
      x: 4,
      y: 0,
      w: 4,
      h: 1,
      minW: 3,
      maxH: 1,
    },

    {
      id: 5,
      name: "PriceTarget",
      title: "Price Target",
      data: [[], {}],
      tickCount: 4,
      dataLabel: "Price",
      x: 12,
      y: 0,
      w: 4,
      h: 1,
      minW: 3,
      maxH: 1,
    },

    {
      id: 6,
      name: "RiskAnalysis",
      title: "Performance (Risk Adjusted)",
      data: {
        cvar: 0,
        date: "",
        omega_id: 0,
        period: "",
        rid: 0,
        sharpe_ratio: 0,
        sortino_ratio: 0,
        std: 0,
        symbol: "",
      },
      dataLabel: "Risk",
      x: 0,
      y: 0,
      w: 6,
      h: 1,
      minW: 3,
      maxH: 1,
    },

    {
      id: 7,
      name: "PriceCalendar",
      title: "Price Calendar",
      data: [{ value: 0 }],
      calendarFrame: calendarFrame,
      setCalendarFrame: setCalendarFrame,
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },

    {
      id: 8,
      name: "News",
      title: "News",
      data: [{ title: "", source: "" }],
      x: 0,
      y: 0,
      w: 12,
      h: 1,
      minW: 3,
      maxH: 1,
    },

    {
      id: 10,
      name: "OverallReturns",
      title: "Overall Returns",
      data: [{ x: "", change: 0 }],
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },

    {
      id: 11,
      name: "AverageReturns",
      title: "Average Returns",
      data: {
        avg_gain: 0,
        avg_loss: 0,
        gain_ratio: 0,
        loss_ratio: 0,
        num_gain: 0,
        num_loss: 0,
        symbol: "",
        timeframe: "",
      },
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },

    {
      id: 12,
      name: "EarningsRatio",
      title: "Earnings Ratio",
      data: { actual: { "": 0 }, consensus: { "": 0 } },
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },

    {
      id: 13,
      name: "Valuation",
      title: "Valuation",
      data: { pe_ratio: 0, comp_pe_ratio: 0, dow_pe_ratio: 0 },
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },

    {
      id: 14,
      name: "Volatility",
      title: "Volatility",
      data: { beta: 0, comp_beta: 0, dow_beta: 0 },
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      minW: 3,
      maxH: 1,
    },
  ]);

  // The reason why many different endpoints have their own useEffect hooks is because we want to get
  // new data from each individual endpoint based on whether or not specific state values have changed. For instance if
  // priceRange or frame changes, we ONLY want to upate the prices endpoint, and every single one. Same idea applies with
  // the dividend endpoint and the dividendRange state value.
  useEffect(() => {
    const prices = fetch(
      `${apiBaseUrl}/prices?code=${apiCode}==&symbol=${activeTicker}&range=${priceRange}&frame=${priceFrame}`
    ).then((res) => res.json());

    Promise.resolve(prices).then((price) => {
      // Function syntax of setState to use the previous value from the state, as recommended by React
      setAvailableCards((prevCards) => {
        // For each cards, return a new modified version of that card
        return prevCards.map((card) => {
          if (card.name == "Price") {
            let date = Object.keys(price).map(function (key, i) {
              return {
                label: key,
                x: i,
              };
            });

            return {
              ...card,
              data: Object.keys(price).map(function (key) {
                return {
                  x: key,
                  y: [
                    price[key].adj_open,
                    price[key].adj_high,
                    price[key].adj_low,
                    price[key].adj_close,
                  ],
                };
              }),
              priceRange: priceRange,
              setPriceRange: setPriceRange,
              priceFrame: priceFrame,
              setPriceFrame: setPriceFrame,
            };
          }

          if (card.name == "OverallReturns") {
            return {
              ...card,
              data: Object.keys(price).map(function (key) {
                return {
                  x: key,
                  change: price[key].change,
                };
              }),
            };
          }
          return card;
        });
      });
    });
  }, [priceRange, priceFrame, activeTicker]);

  useEffect(() => {
    const dividends = fetch(
      `${apiBaseUrl}/dividends?code=${apiCode}==&symbol=${activeTicker}&lastN=${dividendRange}`
    ).then((res) => res.json());

    Promise.resolve(dividends).then((dividends) => {
      // Function syntax of setState to use the previous value from the state, as recommended by React
      setAvailableCards((prevCards) => {
        // For each cards, return a new modified version of that card
        return prevCards.map((card) => {
          if (card.name == "Dividends") {
            return {
              ...card,
              data: Object.keys(dividends.amount)
                .reverse()
                .map(function (key) {
                  return {
                    label: key,
                    value: dividends.amount[key].toFixed(2),
                  };
                }),
              dividendRange: dividendRange,
              setDividendRange: setDividendRange,
            };
          }
          return card;
        });
      });
    });
  }, [dividendRange, activeTicker]);

  useEffect(() => {
    const earnings = fetch(
      `${apiBaseUrl}/earnings?code=${apiCode}==&symbol=${activeTicker}&lastN=4&period=${earningsPeriod}`
    ).then((res) => res.json());

    Promise.resolve(earnings).then((earnings) => {
      // Function syntax of setState to use the previous value from the state, as recommended by React
      setAvailableCards((prevCards) => {
        // For each cards, return a new modified version of that card
        return prevCards.map((card) => {
          if (card.name == "Earnings") {
            let dates = Object.keys(earnings.fiscal_period)
              .sort()
              .map(function (key, i) {
                return earnings.fiscal_period[key];
              });

            let consensusMap = Object.keys(earnings.consensus_eps)
              .sort()
              .map(function (key, i) {
                return {
                  x: dates[i],
                  y: earnings.consensus_eps[key].toFixed(2),
                };
              });

            let actualMap = Object.keys(earnings.real_eps)
              .sort()
              .map(function (key, i) {
                return {
                  x: dates[i],
                  y: earnings.real_eps[key].toFixed(2),
                };
              });

            return {
              ...card,
              actual: {
                name: "Actual",
                eps: actualMap,
              },

              consensus: {
                name: "Consensus",
                eps: consensusMap,
              },

              earningsPeriod: earningsPeriod,
              setEarningsPeriod: setEarningsPeriod,
              dates,
            };
          }

          if (card.name == "EarningsRatio") {
            return {
              ...card,
              data: {
                consensus: earnings.consensus_eps,
                actual: earnings.real_eps,
              },
            };
          }
          return card;
        });
      });
    });
  }, [earningsPeriod, activeTicker]);

  useEffect(() => {
    const price_calendar = fetch(
      `${apiBaseUrl}/avg_return?code=${apiCode}==&symbol=${activeTicker}&range=${calendarFrame}`
    ).then((res) => res.json());

    Promise.resolve(price_calendar).then((price_calendar) => {
      // Function syntax of setState to use the previous value from the state, as recommended by React
      setAvailableCards((prevCards) => {
        // For each cards, return a new modified version of that card
        return prevCards.map((card) => {
          if (card.name == "PriceCalendar") {
            return {
              ...card,
              data: Object.keys(price_calendar).map(function (key) {
                return {
                  value: price_calendar[key].avg_return * 100,
                };
              }),
              calendarFrame: calendarFrame,
              setCalendarFrame: setCalendarFrame,
            };
          }

          return card;
        });
      });
    });
  }, [calendarFrame, activeTicker]);

  useEffect(() => {
    const company = fetch(
      `https://cloud.iexapis.com/stable/stock/${activeTicker}/company?token=pk_41174bf196e6408bb544b6d89806902a`
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

    const allReqs = [
      company,
      price_target,
      prices,
      analyst_recs,
      news,
      valuation,
      volatility,
      risk,
      average_returns,
    ];

    Promise.all(allReqs).then((allResp) => {
      const [
        company,
        price_target,
        prices,
        analyst_recs,
        news,
        valuation,
        volatility,
        risk,
        average_returns,
      ] = allResp;

      // Function syntax of setState to use the previous value from the state, as recommended by React
      setAvailableCards((prevCards) => {
        // For each cards, return a new modified version of that card
        return prevCards.map((card) => {
          switch (card.name) {
            case "TickerHeader":
              return {
                ...card,
                company_name: company.companyName,
                ticker: activeTicker,
                description: company.description,
                industry: company.industry,
                country: company.country,
                phone: company.phone,
                website: company.website,
                ceo: company.CEO,
              };

            case "PriceTarget":
              return {
                ...card,
                data: [
                  Object.keys(prices).map(function (key) {
                    return {
                      label: key,
                      value: prices[key].adj_close,
                    };
                  }),
                  {
                    last_updated: price_target.update_date,
                    average: price_target.price_target_avg,
                    high: price_target.price_target_high,
                    low: price_target.price_target_low,
                    numOfAnalysts: price_target.num_of_analysts,
                  },
                ],
              };

            case "AnalystRecommendations":
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

            case "News":
              return {
                ...card,
                data: Object.keys(news).map(function (key) {
                  return {
                    title: news[key].headline,
                    source: news[key].source,
                  };
                }),
              };

            case "Valuation":
              return {
                ...card,
                data: valuation,
              };

            case "Volatility":
              return {
                ...card,
                data: volatility,
              };

            case "RiskAnalysis":
              return {
                ...card,
                data: risk,
              };

            case "AverageReturns":
              return {
                ...card,
                data: average_returns,
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
                setSelectedCardsIndex={setSelectedCardsIndex}
                setActiveTicker={setActiveTicker}
                activeTicker={activeTicker}
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
