import React, {useEffect, useRef, useState} from "react";
import "../../App.scss";
import {useHistory} from "react-router";
import {Popover} from "antd";
import DarkModeToggle from "../DarkModeToggle";
import AddCardModal from "../AddCardModal/AddCardModal";
import SaveLayoutButton from "../EquityDashboard/SaveLayoutButton";
import ShareLayoutModal from "../ShareLayoutModal/ShareLayoutModal";
import logo from "./images/logo.png";
import TextField from "@material-ui/core/TextField";
import {Autocomplete, createFilterOptions} from "@material-ui/lab";

import {useAuth0} from "@auth0/auth0-react";

const DashboardNavbar = (props) => {
    const {isAuthenticated, user} = useAuth0();
    const [allowedStocks, setAllowedStocks] = useState([]);
    const [ticker, setTicker] = useState("");
    const [wasOptionClicked, setWasOptionClicked] = useState(false);
    const [invalidTicker, setInvalidTicker] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [theme, setTheme] = useState("");
    const [highlightColor, setHighlightColor] = useState("");
    const [scrollbarColor, setScrollbarColor] = useState("");

    const formRef = React.useRef();

    const routerHistory = useHistory();

    useEffect(() => {
        props.darkMode ? setTheme("#000000") : setTheme("#FFFFFF");
        props.darkMode ? setScrollbarColor("#152233 #131722") : setScrollbarColor("");
        props.darkMode ? setHighlightColor("#292929") : setHighlightColor("lightgrey");
    }, [props.darkMode]);

    useEffect(() => {
        const allowed_stocks = fetch(
            `https://sigma7-api.azure-api.net/symbols`
        ).then((res) => res.json());

        Promise.resolve(allowed_stocks).then((allowed_stocks) => {
            let mapped = allowed_stocks.symbols.map((el, i) => {
                return {
                    symbol: el.symbol,
                    name: el.name,
                };
            });
            setAllowedStocks(mapped);
        });
    }, [props.activeTicker]);

    useEffect(() => {
        let mapped = allowedStocks.map((stock) => {
            return {
                name: stock.name,
                value: stock.name + " - " + stock.symbol,
                symbol: stock.symbol,
            };
        });
        setSuggestions(mapped);
    }, [allowedStocks]);

    // Don't execute this useEffect hook on the first render. Only when the value of
    // wasOptionClicked is changed.
    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            console.log("TICKER CHANGE")
            if (wasOptionClicked) {
                //document.getElementById('myForm').dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}))
            }

        }
        setWasOptionClicked(false);
    }, [wasOptionClicked])

    const handleSubmit = (e) => {
        e.preventDefault();

        let allowed_stocks = allowedStocks.map((el, i) => {
            return el.symbol;
        });

        if (allowed_stocks.includes(ticker)) {
            setInvalidTicker(false);
            props.setActiveTicker(ticker);

            // Update the URL
            routerHistory.push(`/dashboard/${props.userID}/${props.selectedLayoutName}/${ticker}`);
        } else {
            setInvalidTicker(true);
        }
        setTicker("");
    };

    // Limit the number of options in the dropdown to 30 items. We don't
    // want it to be huge
    const OPTIONS_LIMIT = 30;
    const defaultFilterOptions = createFilterOptions();

    const filterOptions = (options, state) => {
        return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark dashboard-navbar">
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
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        {isAuthenticated ? (
                            <a className="nav-link">Stocks</a>
                        ) : (
                            <h1>loading</h1>
                        )}
                    </li>
                    <li className="nav-item active">
                        {isAuthenticated ? (
                            <a className="nav-link">Crypto</a>
                        ) : (
                            <h1>loading</h1>
                        )}
                    </li>
                </ul>

                <form id="myForm" ref={formRef} onSubmit={handleSubmit}>
                    <Autocomplete
                        className="stock-symbol-form"
                        id="clear-on-blur"
                        clearOnBlur
                        clearOnEscape
                        clearText
                        filterOptions={filterOptions}
                        options={suggestions}
                        getOptionLabel={(option) => option.name + " - " + option.symbol}
                        renderInput={(params) => (
                            <TextField
                                placeholder="Stock Symbol"
                                {...params}
                                style={{height: 35}}
                                variant="outlined"
                            />
                        )}
                        renderOption={(option) => (
                            <div
                                onClick={(e) => {
                                    setTicker(e.target.innerText);
                                    setWasOptionClicked(true)
                                }}
                            >
                                {option.name} - <span className="blue">{option.symbol}</span>
                            </div>
                        )}
                        onSelect={(val) => {
                            let parts = val.target.value.split("- ");
                            let answer = parts[parts.length - 1];
                            setTicker(answer.toUpperCase());

                        }}
                    />
                </form>

                {invalidTicker && (
                    <p style={{color: "red"}}>Please use a valid stock symbol</p>
                )}

                <div className="ml-auto row dashboard-nav-buttons">
                    <div className="dashboard-nav-button">
                        <DarkModeToggle setDarkMode={props.setDarkMode}/>
                    </div>
                    <div className="dashboard-nav-button">
                        <Popover
                            overlayInnerStyle={{textAlign: "center"}}
                            overlayClassName="navbar-popover"
                            content={<h5 className="navbar-popover-text">Add Card</h5>}
                            placement="bottom"
                        >
                            <AddCardModal
                                availableCards={props.availableCards}
                                setAvailableCards={props.setAvailableCards}
                                selectedCardsIndex={props.selectedCardsIndex}
                                setSelectedCardsIndex={props.setSelectedCardsIndex}
                                darkMode={props.darkMode}
                                activeTicker={props.activeTicker}
                            />{" "}
                        </Popover>
                    </div>
                    <div className="dashboard-nav-button">
                        {/* Button that allows user to save layout goes here */}
                        <Popover
                            overlayInnerStyle={{textAlign: "center"}}
                            overlayClassName="navbar-popover"
                            content={<h5 className="navbar-popover-text">Save Layout</h5>}
                            placement="bottom"
                        >
                            <SaveLayoutButton
                                wasTaken={props.wasTaken}
                                setNewLayoutName={props.setNewLayoutName}
                                userID={props.userID}
                                dashboardNames={props.dashboardNames}
                                setDashboardNames={props.setDashboardNames}
                                setSelectedLayoutIndex={props.setSelectedLayoutIndex}
                                setWasYourDashboardSelected={props.setWasYourDashboardSelected}
                            />{" "}
                        </Popover>
                    </div>
                    <div className="dashboard-nav-button">
                        <Popover
                            overlayInnerStyle={{textAlign: "center"}}
                            overlayClassName="navbar-popover"
                            content={<h5 className="navbar-popover-text">Share</h5>}
                            placement="bottom"
                        >
                            <ShareLayoutModal
                                userID={props.userID}
                                mainLayout={props.mainLayout}
                                selectedDashboardName={props.selectedDashboardName}
                            />{" "}
                        </Popover>
                    </div>
                    {/* <div className="dashboard-nav-button">
            <a href={`/explore/${props.userID}`}>
              <button className="btn btn-primary">Explore</button>
            </a>
          </div> */}
                    <div className="dashboard-nav-button">
                        {props.isAuthenticated ? (
                            <a href="/profile">
                                <Popover
                                    overlayInnerStyle={{textAlign: "center"}}
                                    overlayClassName="navbar-popover"
                                    content={<h5 className="navbar-popover-text">Profile</h5>}
                                    placement="bottom"
                                >
                                    <i
                                        style={{cursor: "pointer"}}
                                        className="fi-rr-user top-nav-icon"
                                    />
                                </Popover>
                            </a>
                        ) : null}
                    </div>
                    {/* <div className="dashboard-nav-button">
            <button
              onClick={() => props.setIsTourOpen(true)}
              className="btn btn-info"
            >
              Tour
            </button>
          </div> */}
                    <div className="dashboard-nav-button">
                        <a
                            target="_blank"
                            href={`https://docs.google.com/forms/d/e/1FAIpQLScnw1acXUSDOxrKqz-CkY1Uskis8e5AkQf5KVCes8BvSupGHg/viewform`}
                        >
                            <Popover
                                overlayInnerStyle={{textAlign: "center"}}
                                overlayClassName="navbar-popover"
                                content={<h5 className="navbar-popover-text">Feedback</h5>}
                                placement="bottomLeft"
                            >
                                <i
                                    style={{cursor: "pointer"}}
                                    className="fi-rr-edit top-nav-icon"
                                />
                            </Popover>
                        </a>
                    </div>
                    {" "}
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
