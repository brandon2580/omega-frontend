import React, { useState, useEffect } from "react";
import "./App.scss";
import Navbar from "./Components/Navbars/TopNavbar";
import HomeDashboard from "./Components/HomeDashboard/HomeDashboard";
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
      id: 1,
      title: "Earnings",
      data: [
        { name: "% Beat Estimates", value: 65 },
        { name: "% Below Estimates", value: 35 },
      ],
      PieChartCard: true,
      selectable: false,
      defaultCard: true,
    },

    {
      id: 2,
      title: "Analyst Recommendations",
      data: [
        { name: "Strong Buy", value: 25 },
        { name: "Buy", value: 40 },
        { name: "Hold", value: 10 },
        { name: "Sell", value: 20 },
        { name: "Strong Sell", value: 5 },
      ],
      PieChartCard: true,
      selectable: false,
      defaultCard: true,
    },

    {
      id: 3,
      title: "Dividend",
      data: [
        { name: "2014", data: 0.28 },
        { name: "2015", data: 0.31 },
        { name: "2016", data: 0.36 },
        { name: "2017", data: 0.39 },
        { name: "2018", data: 0.42 },
        { name: "2019", data: 0.46 },
        { name: "2020", data: 0.51 },
      ],
      LineChartCard: true,
      selectable: false,
      defaultCard: true,
    },

    {
      id: 4,
      title: "Chart",
      data: [
        { name: "2014", data: 38.72 },
        { name: "2015", data: 43.29 },
        { name: "2016", data: 56.05 },
        { name: "2017", data: 73.71 },
        { name: "2018", data: 113.37 },
        { name: "2019", data: 139.44 },
        { name: "2020", data: 214.25 },
      ],
      LineChartCard: true,
      tickCount: 10,
      selectable: false,
      defaultCard: true,
    },

    {
      id: 5,
      title: "Sentiment",
      data: [
        { name: "8/31", data: 2 },
        { name: "9/1", data: 2 },
        { name: "9/2", data: 3 },
        { name: "9/3", data: 1 },
        { name: "9/4", data: 2 },
      ],
      LineChartCard: true,
      tickCount: 4,
      selectable: false,
      defaultCard: true,
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
      BarChartCard: true,
      selectable: false,
      defaultCard: true,
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
      BarChartCard: true,
      selectable: false,
      defaultCard: true,
    },

    {
      id: 8,
      title: "Eighth Title",
      data: [
        { name: "Group A", value: 70 },
        { name: "Group B", value: 30 },
      ],
      PieChartCard: true,
      selectable: true,
    },

    {
      id: 9,
      title: "Ninth Title",
      data: [
        { name: "Page A", data: 1500, pv: 2400, amt: 2400 },
        { name: "Page B", data: 3000, pv: 1398, amt: 2210 },
        { name: "Page C", data: 1000, pv: 9800, amt: 2290 },
        { name: "Page D", data: 1500, pv: 3908, amt: 2000 },
        { name: "Page E", data: 1890, pv: 4800, amt: 2181 },
        { name: "Page F", data: 2390, pv: 3800, amt: 2500 },
        { name: "Page G", data: 1900, pv: 4300, amt: 2100 },
      ],
      LineChartCard: true,
      selectable: true,
    },

    {
      id: 10,
      title: "Tenth Title",
      data: [
        { name: "Group A", value: 50 },
        { name: "Group B", value: 50 },
      ],
      PieChartCard: true,
      selectable: true,
    },

    {
      id: 11,
      title: "Eleventh Title",
      data: [
        { name: "Page A", data: 1500, pv: 2400, amt: 2400 },
        { name: "Page B", data: 3000, pv: 1398, amt: 2210 },
        { name: "Page C", data: 1000, pv: 9800, amt: 2290 },
        { name: "Page D", data: 1500, pv: 3908, amt: 2000 },
        { name: "Page E", data: 1890, pv: 4800, amt: 2181 },
        { name: "Page F", data: 2390, pv: 3800, amt: 2500 },
        { name: "Page G", data: 1900, pv: 4300, amt: 2100 },
      ],
      BarChartCard: true,
      selectable: true,
    },
  ]);

  // This gets all of the data for the specified object in the availableCards array (CORS required)
  useEffect(() => {
    const reqOne = fetch("https://postman-echo.com/get?foo1=bar1&foo2=bar2");
    const reqTwo = fetch("https://postman-echo.com/get?foo1=bar1&jibberjabber");
    const allReqs = [reqOne, reqTwo];
    Promise.all(allReqs).then((allResp) => {
      const [resOne, resTwo] = allResp;

      // Function syntax of setState to use the previous value from the state, as recommended by React
      setAvailableCards((prevCards) => {
        // For each cards, return a new modified version of that card
        return prevCards.map((card, index) => {
          // If it's index 0, return a modified version (in this case, change the title to data.url)
          if (index === 0) {
            return {
              ...card,
              title: resOne.url,
            };
          }

          if (index === 1) {
            return {
              ...card,
              title: resTwo.url,
            };
          }

          // Otherwise return the original card
          return card;
        });
      });
    });
  }, []);

  return (
    <div className="side-margin">
      <Router>
        <Navbar
          availableCards={availableCards}
          selectedCardsIndex={selectedCardsIndex}
          setSelectedCardIndex={setSelectedCardIndex}
        />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dashboard">
            <HomeDashboard
              availableCards={availableCards}
              selectedCardsIndex={selectedCardsIndex}
              setSelectedCardIndex={setSelectedCardIndex}
            />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
