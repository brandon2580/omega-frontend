import React, { useState, useEffect } from "react";
import "./App.scss";
import Navbar from "./Components/Navbars/TopNavbar";
import HomeDashboard from "./Components/HomeDashboard/HomeDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import "antd/dist/antd.css";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";

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
        { name: "Group A", value: 70 },
        { name: "Group B", value: 30 },
      ],
      PieChartCard: true,
      selectable: false,
      defaultCard: true,
    },

    {
      id: 2,
      title: "Analyst Recommendations",
      data: [
        { name: "Group A", value: 30 },
        { name: "Group B", value: 40 },
        { name: "Group C", value: 20 },
        { name: "Group D", value: 10 },
      ],
      PieChartCard: true,
      selectable: false,
      defaultCard: true,
    },

    {
      id: 3,
      title: "Dividend",
      data: [
        { name: "Page A", uv: 1500, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Page C", uv: 1000, pv: 9800, amt: 2290 },
        { name: "Page D", uv: 1500, pv: 3908, amt: 2000 },
        { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Page G", uv: 1900, pv: 4300, amt: 2100 },
      ],
      LineChartCard: true,
      selectable: false,
      defaultCard: true,
    },

    {
      id: 4,
      title: "Chart",
      data: [
        { name: "Page A", uv: 1500, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Page C", uv: 1000, pv: 9800, amt: 2290 },
        { name: "Page D", uv: 1500, pv: 3908, amt: 2000 },
        { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Page G", uv: 1900, pv: 4300, amt: 2100 },
      ],
      LineChartCard: true,
      selectable: false,
      defaultCard: true,
    },

    {
      id: 5,
      title: "Sentiment",
      data: [
        { name: "Page A", uv: 1500, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Page C", uv: 1000, pv: 9800, amt: 2290 },
        { name: "Page D", uv: 1500, pv: 3908, amt: 2000 },
        { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Page G", uv: 1900, pv: 4300, amt: 2100 },
      ],
      LineChartCard: true,
      selectable: false,
      defaultCard: true,
    },

    {
      id: 6,
      title: "Risk Analysis",
      data: [
        { name: "Page A", uv: 4000 },
        { name: "Page B", uv: 3000, amt: 2210 },
        { name: "Page C", uv: 2000, amt: 2290 },
        { name: "Page D", uv: 2780, amt: 2000 },
      ],
      BarChartCard: true,
      selectable: false,
      defaultCard: true,
    },

    {
      id: 7,
      title: "Economics",
      data: [
        { name: "Page A", uv: 1500, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Page C", uv: 1000, pv: 9800, amt: 2290 },
        { name: "Page D", uv: 1500, pv: 3908, amt: 2000 },
        { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Page G", uv: 1900, pv: 4300, amt: 2100 },
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
        { name: "Page A", uv: 1500, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Page C", uv: 1000, pv: 9800, amt: 2290 },
        { name: "Page D", uv: 1500, pv: 3908, amt: 2000 },
        { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Page G", uv: 1900, pv: 4300, amt: 2100 },
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
        { name: "Page A", uv: 1500, pv: 2400, amt: 2400 },
        { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Page C", uv: 1000, pv: 9800, amt: 2290 },
        { name: "Page D", uv: 1500, pv: 3908, amt: 2000 },
        { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
        { name: "Page G", uv: 1900, pv: 4300, amt: 2100 },
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
      <Navbar
        availableCards={availableCards}
        selectedCardsIndex={selectedCardsIndex}
        setSelectedCardIndex={setSelectedCardIndex}
      />

      <HomeDashboard
        availableCards={availableCards}
        selectedCardsIndex={selectedCardsIndex}
        setSelectedCardIndex={setSelectedCardIndex}
      />
    </div>
  );
}

export default App;
