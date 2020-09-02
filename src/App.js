import React, { useState, useEffect } from "react";
import "./App.scss";
import AutoSuggest from "react-autosuggest";
import DarkModeToggle from "./DarkModeToggle";
import HomeDashboard from "./Components/HomeDashboard/HomeDashboard";
import FirstTestCard from "./Components/TestComponents/PieChartCard";
import { Modal } from "antd";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import SecondTestCard from "./Components/TestComponents/LineChartCard";
import LineChartCard from "./Components/TestComponents/LineChartCard";
import PieChartCard from "./Components/TestComponents/PieChartCard";

// List of components to auto-suggest
const components = [
  {
    id: 1,
    name: "Equities",
  },
  {
    id: 2,
    name: "Portfolio",
  },
  {
    id: 3,
    name: "Random",
  },
  {
    id: 4,
    name: "Analytics",
  },
  {
    id: 5,
    name: "Efficient frontier",
  },
];

const lowerCasedComponents = components.map((components) => {
  return {
    id: components.id,
    name: components.name.toLowerCase(),
  };
});

function App() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [selectedCardsIndex, setSelectedCardIndex] = useState([]);
  const [count, setCount] = useState(0);

  // availableCards is an array of objects.
  // Each object contains properties - id (int), title (string), data (array), (PieChartCard (bool) || LineChartCard (bool))
  const [availableCards, setAvailableCards] = useState([
    // 0th item
    {
      id: 8,
      title: "first title",
      data: [
        { name: "Group A", value: 70 },
        { name: "Group B", value: 30 },
      ],
      PieChartCard: true,
    },

    //1st item
    {
      id: 9,
      title: "second title",
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
    },

    //2nd item
    {
      id: 10,
      title: "third title",
      data: [
        { name: "Group A", value: 50 },
        { name: "Group B", value: 50 },
      ],
      PieChartCard: true,
    },
  ]);

  // Changing title of 0th item in array (just testing fetch requests)
  useEffect(() => {
    fetch("https://postman-echo.com/get?foo1=bar1&foo2=bar2")
      .then((res) => res.json())
      .then((data) => {
        // Function syntax of setState to use the previous value from the state, as recommended by React
        setAvailableCards((prevCards) => {
          // For each cards, return a new modified version of that card
          return prevCards.map((card, index) => {
            // If it's index 0, return a modified version (in this case, change the title to data.url)
            if (index === 0) {
              return {
                ...card,
                title: data.url,
              };
            }

            // Otherwise return the original card
            return card;
          });
        });
      });
  }, [count]);

  function selectCard(id) {
    // Card was selected, remove it
    if (selectedCardsIndex.includes(id)) {
      setSelectedCardIndex((prevSelected) =>
        prevSelected.filter((cardId) => cardId !== id)
      );
    }

    // Card was not selected, add it
    else {
      setSelectedCardIndex((prevSelected) => [...prevSelected, id]);
    }
  }

  // Shows modal
  const showModal = () => {
    setVisible(true);
  };

  // Handles the click of the "Ok" button in the modal
  const handleOk = (e) => {
    setVisible(false);
  };

  // Handles the click of the "Cancel" button in the modal
  const handleCancel = (e) => {
    setVisible(false);
  };

  // Filters through the name of available components
  // for when the user searches it in the modal
  function getSuggestions(value) {
    return lowerCasedComponents.filter((components) =>
      components.name.includes(value.trim().toLowerCase())
    );
  }

  return (
    <div className="side-margin">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Pricing
              </a>
            </li>
          </ul>

          <DarkModeToggle />

          <form className="form-inline ml-auto">
            <button
              className="btn btn-primary search-button"
              type="button"
              onClick={showModal}
            >
              Add Card
            </button>
            <Modal
              title="Add Card"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <form className="form-inline ml-auto col-lg-7">
                <AutoSuggest
                  suggestions={suggestions}
                  onSuggestionsClearRequested={() => setSuggestions([])}
                  onSuggestionsFetchRequested={({ value }) => {
                    setValue(value);
                    setSuggestions(getSuggestions(value));
                  }}
                  getSuggestionValue={(suggestion) => suggestion.name}
                  renderSuggestion={(suggestion) => (
                    <span>
                      {suggestion.name.charAt(0).toUpperCase() +
                        suggestion.name.slice(1)}
                    </span>
                  )}
                  inputProps={{
                    placeholder: "Add card",
                    value: value,
                    onChange: (_, { newValue, method }) => {
                      setValue(newValue);
                    },
                  }}
                  highlightFirstSuggestion={true}
                />
                <button className="btn btn-primary search-button" type="submit">
                  Add
                </button>
              </form>

              <div className="add-card-container">
                <div className="row">
                  {availableCards.map((card) => {
                    {
                      /* If the user clicked on a card, and it had {PieChartCard: true}, return JSX */
                    }
                    if (card.PieChartCard) {
                      return (
                        <div className="col-lg-4 modal-card">
                          <PieChartCard
                            key={card.id}
                            title={card.title}
                            data={card.data}
                          >
                            <p>{card.title}</p>
                          </PieChartCard>

                          <button onClick={() => selectCard(card.id)}>
                            Add
                          </button>
                        </div>
                      );
                    }

                    {
                      /* If the user clicked on a card, and it had {LineChartCard: true}, return JSX */
                    }
                    if (card.LineChartCard) {
                      return (
                        <div className="col-lg-4 modal-card">
                          <LineChartCard
                            key={card.id}
                            title={card.title}
                            data={card.data}
                          >
                            <p>{card.title}</p>
                          </LineChartCard>

                          <button onClick={() => selectCard(card.id)}>
                            Add
                          </button>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </Modal>
          </form>
        </div>
      </nav>

      <HomeDashboard
        availableCards={availableCards}
        selectedCardsIndex={selectedCardsIndex}
      />
    </div>
  );
}

export default App;
