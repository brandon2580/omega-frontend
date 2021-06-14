import React, { useEffect, useState } from "react";
import "../../App.scss";
import DarkModeToggle from "../DarkModeToggle";
import AddCardModal from "../AddCardModal/AddCardModal";
import SaveLayoutButton from "../EquityDashboard/SaveLayoutButton";
import ShareLayoutModal from "../ShareLayoutModal/ShareLayoutModal";
import Autocomplete from "react-autocomplete";
import logo from "./logo.png";

import { useAuth0 } from "@auth0/auth0-react";

const DashboardNavbar = (props) => {
  const { isAuthenticated, user } = useAuth0();
  const [allowedStocks, setAllowedStocks] = useState([]);
  const [ticker, setTicker] = useState("");
  const [invalidTicker, setInvalidTicker] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [theme, setTheme] = useState("");
  const [highlightColor, setHighlightColor] = useState("");
  const [scrollbarColor, setScrollbarColor] = useState("");

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode
      ? setScrollbarColor("#152233 #131722")
      : setScrollbarColor("");

    props.darkMode
      ? setHighlightColor("#292929")
      : setHighlightColor("lightgrey");
  }, [props.darkMode]);

  useEffect(() => {
    const allowed_stocks = fetch(
      `https://sigma7apis.azure-api.net/omega/master?code=${process.env.REACT_APP_API_KEY}==&all=1`
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
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <a className="navbar-brand" href="/">
        <img
          src={logo}
          width="45"
          className="d-inline-block align-top"
          alt="sigma7"
        />
      </a>
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

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            {isAuthenticated ? (
              <a className="nav-link" href={`dashboard/${user.sub}`}>
                Dashboard
              </a>
            ) : (
              <h1>loading</h1>
            )}
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
              placeholder: "Ticker",
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
          <div className="dashboard-nav-button">
            <DarkModeToggle setDarkMode={props.setDarkMode} />
          </div>
          <div className="dashboard-nav-button">
            <button
              onClick={() => props.setIsTourOpen(true)}
              className="btn btn-primary"
            >
              Tour
            </button>
          </div>
          <div className="dashboard-nav-button">
            <AddCardModal
              availableCards={props.availableCards}
              setAvailableCards={props.setAvailableCards}
              selectedCardsIndex={props.selectedCardsIndex}
              setSelectedCardsIndex={props.setSelectedCardsIndex}
              darkMode={props.darkMode}
              activeTicker={props.activeTicker}
            />{" "}
          </div>
          <div className="dashboard-nav-button">
            {/* Button that allows user to save layout goes here */}
            <SaveLayoutButton
              wasTaken={props.wasTaken}
              setNewLayoutName={props.setNewLayoutName}
              userID={props.userID}
              dashboardNames={props.dashboardNames}
              setDashboardNames={props.setDashboardNames}
              setSelectedLayoutIndex={props.setSelectedLayoutIndex}
              setWasSelected={props.setWasSelected}
            />{" "}
          </div>
          <div className="dashboard-nav-button">
            {props.isAuthenticated ? (
              <a href="/profile">
                <button className="btn btn-primary">Profile</button>
              </a>
            ) : null}
          </div>
          <div className="dashboard-nav-button">
            <ShareLayoutModal
              userID={props.userID}
              mainLayout={props.mainLayout}
            />{" "}
          </div>
          <div className="dashboard-nav-button">
            <a href="/explore">
              <button className="btn btn-success">Explore</button>
            </a>
          </div>{" "}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
