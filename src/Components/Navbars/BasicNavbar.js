import React, { useEffect, useState, useRef } from "react";
import "../../App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import logo from "./logo.png";

const BasicNavbar = (props) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="/">
        <img
          src={logo}
          width="45"
          class="d-inline-block align-top"
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

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/dashboard">
              Dashboard
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BasicNavbar;
