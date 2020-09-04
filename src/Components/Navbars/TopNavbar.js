import React from "react";
import "../../App.scss";
import DarkModeToggle from "../../DarkModeToggle";
import AddCardModal from "./AddCardModal";

const Navbar = (props) => {
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

        <div className="ml-auto">
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

export default Navbar;
