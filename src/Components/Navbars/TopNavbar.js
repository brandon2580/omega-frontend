import React from "react";
import "../../App.scss";
import DarkModeToggle from "../DarkModeToggle";
import AddCardModal from "../AddCardModal/AddCardModal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const TopNavbar = (props) => {
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

        <div className="ml-auto row">
          <div className="col-lg-6">
            <DarkModeToggle />
          </div>

          <AddCardModal
            availableCards={props.availableCards}
            selectedCardsIndex={props.selectedCardsIndex}
            setSelectedCardIndex={props.setSelectedCardIndex}
          />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
