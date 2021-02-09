import React, { useEffect, useState } from "react";
import "../../App.scss";
import DarkModeToggle from "../DarkModeToggle";
import AddCardModal from "../AddCardModal/AddCardModal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SaveLayoutButton from "../EquityDashboard/SaveLayoutButton";

const TopNavbar = (props) => {
  const [allowedStocks, setAllowedStocks] = useState([]);
  const [ticker, setTicker] = useState("");
  const [invalidTicker, setInvalidTicker] = useState(false);

  useEffect(() => {
    const allowed_stocks = fetch(
      `https://sigma7apis.azure-api.net/omega/master?code=pcRfOm56RQRqa9ixWAyq9qWtlofFpzIZZbVAcNxGwJBEMaA4z1Q5Qw==&all=1`
    ).then((res) => res.json());

    Promise.resolve(allowed_stocks).then((allowed_stocks) => {
      setAllowedStocks(Object.keys(allowed_stocks.tick_ex));
    });
  }, [props.activeTicker]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allowedStocks.includes(ticker)) {
      setInvalidTicker(false);
      props.setActiveTicker(ticker);
    } else {
      setInvalidTicker(true);
    }
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
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            style={{ color: "black" }}
            placeholder="ticker"
            type="text"
          />
        </form>

        {invalidTicker && <p style={{color: "red"}}>Please use a valid ticker in the DOW 30</p>}

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
