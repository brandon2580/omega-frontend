import React, { useEffect, useState, useRef } from "react";
import "../../App.scss";
import DarkModeToggle from "../DarkModeToggle";
import AddCardModal from "../AddCardModal/AddCardModal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SaveLayoutButton from "../EquityDashboard/SaveLayoutButton";
import Autocomplete from "react-autocomplete";

const TopNavbar = (props) => {
  const [allowedStocks, setAllowedStocks] = useState([]);
  const [ticker, setTicker] = useState("");
  const [invalidTicker, setInvalidTicker] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [theme, setTheme] = useState("");
  const [textColor, setTextColor] = useState("");
  const [highlightColor, setHighlightColor] = useState("");
  const [scrollbarColor, setScrollbarColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode ? setTextColor("#FFFFFF") : setTextColor("#000000");
    props.darkMode ? setScrollbarColor("#152233 #131722") : setScrollbarColor("");

    props.darkMode
      ? setHighlightColor("#292929")
      : setHighlightColor("lightgrey");
  }, [props.darkMode]);

  useEffect(() => {
    const allowed_stocks = fetch(
      `https://sigma7apis.azure-api.net/omega/master?code=pcRfOm56RQRqa9ixWAyq9qWtlofFpzIZZbVAcNxGwJBEMaA4z1Q5Qw==&all=1`
    ).then((res) => res.json());

    Promise.resolve(allowed_stocks).then((allowed_stocks) => {
      setAllowedStocks(Object.keys(allowed_stocks.tick_ex));
    });
  }, [props.activeTicker]);

  useEffect(() => {
    let mapped = allowedStocks.map((stock) => {
      return {
        label: stock,
      };
    });
    setSuggestions(mapped);
  }, [allowedStocks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allowedStocks.includes(ticker)) {
      setInvalidTicker(false);
      props.setActiveTicker(ticker);
    } else {
      setInvalidTicker(true);
    }
    setTicker("");
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
              Dashboards
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/portfolio" className="nav-link">
              Portfolio
            </Link>
          </li>
        </ul>

        <form onSubmit={handleSubmit}>
          <Autocomplete
            getItemValue={(item) => item.label}
            items={suggestions}
            shouldItemRender={(item, value) =>
              item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            inputProps={{
              placeholder: "ticker",
              color: "#DC143C",
              type: "text",
              className: "react-autosuggest__input black",
            }}
            menuStyle={{
              scrollbarColor: scrollbarColor,
              position: "fixed",
              overflow: "auto",
              maxHeight: "50%",
            }}
            renderItem={(item, isHighlighted) => (
              <div
                className="ticker-dropdown-item"
                style={{ background: isHighlighted ? highlightColor : theme }}
              >
                {item.label}
              </div>
            )}
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            onSelect={(val) => {
              setTicker(val);
            }}
          />
        </form>

        {invalidTicker && (
          <p style={{ color: "red" }}>
            Please use a valid ticker in the DOW 30
          </p>
        )}

        <div className="ml-auto row">
          <div className="col-lg-3">
            <DarkModeToggle setDarkMode={props.setDarkMode} />
          </div>

          <span className="verticalSpan" />

          <AddCardModal
            availableCards={props.availableCards}
            setAvailableCards={props.setAvailableCards}
            selectedCardsIndex={props.selectedCardsIndex}
            setSelectedCardsIndex={props.setSelectedCardsIndex}
            darkMode={props.darkMode}
            activeTicker={props.activeTicker}
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
