import React, { useState } from "react";
import "../../App.scss";
import DarkModeToggle from "../DarkModeToggle";
import AddCardModal from "../AddCardModal/AddCardModal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SaveLayoutButton from "../EquityDashboard/SaveLayoutButton";

const TopNavbar = (props) => {
  const [ticker, setTicker] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setActiveTicker(ticker);
    e.target.reset();
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li className="nav-item active">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/portfolio" className="nav-link">
              Portfolio
            </Link>
          </li>
        </ul>

        <form onSubmit={handleSubmit}>
          <input
            className="react-autosuggest__input"
            onChange={e => setTicker(e.target.value.toUpperCase())}
            style={{ color: "black" }}
            placeholder="ticker"
            type="text"
          />
        </form>

        <div className="ml-auto row">
          <div className="col-lg-3">
            <DarkModeToggle setDarkMode={props.setDarkMode} />
          </div>

          <span className="verticalSpan" />

          <AddCardModal
            availableCards={props.availableCards}
            selectedCardsIndex={props.selectedCardsIndex}
            setSelectedCardsIndex={props.setSelectedCardsIndex}
            darkMode={props.darkMode}
          />
          <span className="verticalSpan2" />

          {/* Button that allows user to save layout goes here */}
          <SaveLayoutButton
            wasTaken={props.wasTaken}
            setNewLayoutName={props.setNewLayoutName}
          />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
