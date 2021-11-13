import React, { useEffect, useRef, useState } from "react";
import "../../../App.scss";
import { useHistory } from "react-router";
import AddCardModal from "../../AddCardModal/AddCardModal";
import TextField from "@material-ui/core/TextField";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import DemoSaveLayoutButton from "../../DemoEquityDashboard/DemoSaveLayoutButton";
import DemoShareLayoutModal from "../../ShareLayoutModal/DemoShareLayoutModal";

const DemoDashboardNavbar = (props) => {
  const [invalidTicker, setInvalidTicker] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [theme, setTheme] = useState("");
  const [highlightColor, setHighlightColor] = useState("");
  const [scrollbarColor, setScrollbarColor] = useState("");

  const formRef = React.useRef();

  const routerHistory = useHistory();

  useEffect(() => {
    props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
    props.darkMode
      ? setScrollbarColor("#152233 #131722")
      : setScrollbarColor("");
    props.darkMode
      ? setHighlightColor("#292929")
      : setHighlightColor("lightgrey");
  }, [props.darkMode]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark dashboard-navbar">

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <form
          id="myForm"
          className="form-inline"
          ref={formRef}
        >
          <Autocomplete
            className="stock-symbol-form"
            id="clear-on-blur"
            clearOnBlur
            clearOnEscape
            noOptionsText={<p>Please login for access to more stock symbols</p>}
            clearText
            options={suggestions}
            renderInput={(params) => (
              <TextField
                placeholder="Stock Symbol"
                {...params}
                style={{ height: 35 }}
                variant="outlined"
              />
            )}
          />
        </form>

        {invalidTicker && (
          <p style={{ color: "red" }}>Please use a valid stock symbol</p>
        )}

        <div className="ml-auto row dashboard-nav-buttons">
          <div className="dashboard-nav-button ">
              <AddCardModal
                availableCards={props.availableCards}
                setAvailableCards={props.setAvailableCards}
                selectedCardsIndex={props.selectedCardsIndex}
                setSelectedCardsIndex={props.setSelectedCardsIndex}
                darkMode={props.darkMode}
                activeTicker={props.activeTicker}
              />
          </div>

          <div className="dashboard-nav-button">
            <DemoSaveLayoutButton
                wasTaken={props.wasTaken}
                setNewLayoutName={props.setNewLayoutName}
                userID={props.userID}
                dashboardNames={props.dashboardNames}
                setDashboardNames={props.setDashboardNames}
                setSelectedLayoutIndex={props.setSelectedLayoutIndex}
                setWasYourDashboardSelected={props.setWasYourDashboardSelected}
              />
          </div>

          <div className="dashboard-nav-button">
            <DemoShareLayoutModal
                userID={props.userID}
                mainLayout={props.mainLayout}
                selectedDashboardName={props.selectedDashboardName}
              />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DemoDashboardNavbar;
