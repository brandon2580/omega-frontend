import React, { useState } from "react";
import "./App.scss";
import AutoSuggest from "react-autosuggest";
import DarkModeToggle from "./DarkModeToggle";
import HomeDashboard from "./Components/HomeDashboard/HomeDashboard";
import { Modal } from "antd";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";

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

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

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
                <div className="row center">
                  <div className="col-lg-4">
                    <h1>Card</h1>
                  </div>
                  <div className="col-lg-4">
                    <h1>Card</h1>
                  </div>
                  <div className="col-lg-4">
                    <h1>Card</h1>
                  </div>
                </div>

                <div className="row center">
                  <div className="col-lg-4">
                    <h1>Card</h1>
                  </div>
                  <div className="col-lg-4">
                    <h1>Card</h1>
                  </div>
                  <div className="col-lg-4">
                    <h1>Card</h1>
                  </div>
                </div>

                <div className="row center">
                  <div className="col-lg-4">
                    <h1>Card</h1>
                  </div>
                  <div className="col-lg-4">
                    <h1>Card</h1>
                  </div>
                  <div className="col-lg-4">
                    <h1>Card</h1>
                  </div>
                </div>
              </div>
            </Modal>
          </form>
        </div>
      </nav>

      <HomeDashboard />
    </div>
  );
}

export default App;
