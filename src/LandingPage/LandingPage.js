import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import uuid from "react-uuid";
import emailjs from "emailjs-com";
import logo from "./images/logo.png";
import fullLogo from "./images/fullLogo.png";
import dashboard from "./images/dashboard.png";
import sigma7_1 from "./images/sigma7_1.png";
import "./css/base.css";
import "./css/elements.css";
import "./css/font-awesome.min.css";
import "./css/magnific-popup.css";
import "./css/owl.carousel.css";
import "./css/owl.transitions.css";
import "./css/responsive.css";
import "./css/themify-icons.css";
import LoginButton from "../Auth/Buttons/LoginButton";
import LogoutButton from "../Auth/Buttons/LogoutButton";
import db from "../firebase";
import firebase from "firebase/app";
import "firebase/firestore";

import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth0();
  let { userID, dashboardID } = useParams();
  const [wasEmailSent, setWasEmailSent] = useState(false);
  const [wasEmailFailed, setWasEmailFailed] = useState(false);
  const [defaultLayoutURL, setDefaultLayoutURL] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const data = db.collection("saved_dashboards").doc(user.sub);

      data.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          console.log(
            Object.keys(Object.values(docSnapshot.data().dashboards[0])[0])[0]
          );
          setDefaultLayoutURL(
            Object.keys(Object.values(docSnapshot.data().dashboards[0])[0])[0]
          );
        }
      });
    }
  }, [isAuthenticated]);

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_USER_ID
      )
      .then(
        (result) => {
          setWasEmailSent(true);
        },
        (error) => {
          setWasEmailFailed(true);
        }
      );
  }
  return (
    <div>
      <header className="header-style5" id="header-section12">
        {/* nav */}
        <div className="landing-navbar">
          <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
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
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    {isAuthenticated ? (
                      <a
                      className="nav-link tz-text nav-text"
                        aria-current="page"
                        href={`dashboard/${user.sub}/${defaultLayoutURL}`}
                      >
                        Demo
                      </a>
                    ) : (
                      <a className="nav-link tz-text nav-text" aria-current="page">
                        Please Login
                      </a>
                    )}
                  </li>
                  <li className="nav-item">
                    <a className="nav-link nav-text" href="#content-section44">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link nav-text" href="#subscribe-section6">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="ml-auto row">
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
              </div>
            </div>
          </nav>
        </div>

        {/* end nav */}
      </header>
      <section
        className="position-relative hero-style19 cover-background tz-builder-bg-image hero-style19 hero-style2 border-none bg-img-one"
        id="home"
        data-img-size="(W)1920px X (H)800px"
        style={{
          background:
            'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)) repeat scroll 0% 0%, transparent url("https://wallpaperaccess.com/full/944557.jpg") repeat scroll 0% 0%',
        }}
      >
        <div className="container one-sixth-screen xs-height-auto position-relative">
          <div className="row">
            <div className="slider-typography xs-position-static text-center">
              <div className="slider-text-middle-main">
                <div className="slider-text-middle text-center xs-padding-fifteen xs-no-padding-lr">
                  <div className="col-md-9 col-sm-12 col-xs-12 center-col ">
                    {/* title */}
                    <img className="full-logo" src={fullLogo} width="50%" />
                    {/* end title */}
                    <div className="btn-dual">
                      {isAuthenticated ? (
                        <a
                          className="btn btn-large propClone bg-golden-yellow  btn-circle xs-margin-ten-bottom xs-width-100"
                          href={`dashboard/${user.sub}/${defaultLayoutURL}`}
                        >
                          <span className="tz-text">Demo</span>

                          <i className="fa fa-angle-right text-extra-medium tz-icon-color" />
                        </a>
                      ) : (
                        <a className="btn btn-large propClone bg-golden-yellow  btn-circle xs-margin-ten-bottom xs-width-100">
                          <span className="tz-text">Please Login</span>

                          <i className="fa fa-angle-right text-extra-medium tz-icon-color" />
                        </a>
                      )}
                      <a
                        className="btn btn-large propClone main-light-blue  btn-circle xs-margin-ten-bottom xs-width-100"
                        href="#callto-action2"
                      >
                        <span className="tz-text text-white">Read More</span>
                        <i className="fa fa-angle-right text-extra-medium tz-icon-color text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="padding-60px-tb main-dark-blue builder-bg"
        id="callto-action2"
      >
        <div className="container">
          <div className="row equalize">
            <div className="col-md-12 col-sm-12 col-xs-12 text-center">
              <div className="display-inline-block sm-display-block vertical-align-middle margin-five-right sm-no-margin-right sm-margin-ten-bottom tz-text alt-font text-extra-large sm-text-extra-large">
                Interested in a demo? Contact us
              </div>
              <a
                className="btn-medium text-fast-blue2 border-2-fast-blue2 btn-circle"
                href="#subscribe-section6"
              >
                <span className="tz-text">CONTACT</span>
                <i className="fa fa-long-arrow-right text-extra-medium tz-icon-color" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section
        className="builder-bg padding-110px-tb xs-padding-60px-tb main-light-blue"
        id="feature-section27"
      >
        <div className="container">
          <div className="row four-column">
            {/* feature box */}
            <div className="col-md-4 col-sm-6 col-xs-12 sm-margin-nine-bottom xs-margin-fifteen-bottom text-center">
              <div className="feature-box">
                <div className="margin-fifteen-bottom xs-margin-five-bottom">
                  <i className="fa ti-thumb-up text-fast-blue2 icon-large tz-icon-color" />
                </div>
                <h3 className="feature-title text-white text-medium alt-font display-block margin-three-bottom xs-margin-five-bottom tz-text">
                  Straightforward
                </h3>
                <div className="feature-text text-medium center-col tz-text">
                  <p className="no-margin-bottom">
                    Analytics and visuals from sigma7 are meant to be easily
                    understood. sigma7 will help you understand and walk through
                    any of our analytics.
                  </p>
                </div>
              </div>
            </div>
            {/* end feature box */}
            {/* feature box */}
            <div className="col-md-4 col-sm-6 col-xs-12 text-center xs-margin-fifteen-bottom">
              <div className="feature-box">
                <div className="margin-fifteen-bottom xs-margin-five-bottom">
                  <i className="fa ti-panel text-fast-blue2 icon-large tz-icon-color" />
                </div>
                <h3 className="feature-title text-white text-medium alt-font display-block margin-three-bottom xs-margin-five-bottom tz-text">
                  Simple
                </h3>
                <div className="feature-text text-medium center-col tz-text">
                  <p className="no-margin-bottom">
                    sigma7 develops tools that are easy to use, interactive, and
                    intuitive for users of all experience levels.
                  </p>
                </div>
              </div>
            </div>
            {/* end feature box */}
            {/* feature box */}
            <div className="col-md-4 col-sm-6 col-xs-12 text-center">
              <div className="feature-box">
                <div className="margin-eleven-bottom xs-margin-five-bottom">
                  <i className="fa ti-layout text-fast-blue2 icon-large tz-icon-color" />
                </div>
                <h3 className="feature-title text-white text-medium alt-font display-block margin-three-bottom xs-margin-five-bottom tz-text">
                  Free
                </h3>
                <div className="feature-text text-medium center-col tz-text">
                  <p className="no-margin-bottom">
                    sigma7 is free to use. Don’t worry about paying for any
                    costly tools, sigma7 is meant for everybody.
                  </p>
                </div>
              </div>
            </div>
            {/* end feature box */}
          </div>
        </div>
      </section>
      <section
        className="padding-110px-tb feature-style29 main-dark-blue builder-bg xs-padding-60px-tb"
        id="content-section44"
      >
        <div className="container">
          <div className="row equalize xs-equalize-auto equalize-display-inherit">
            <div className="col-md-6 display-table col-sm-12 col-xs-12 xs-margin-nineteen-bottom sm-height-auto">
              <div className="display-table-cell-vertical-middle">
                <img
                  className="img-responsive sm-width-60 xs-width-100 margin-lr-auto sm-margin-twenty-bottom"
                  src={sigma7_1}
                  data-img-size="(W)984px X (H)1376px"
                  alt
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12 display-table sm-height-auto">
              <div className="display-table-cell-vertical-middle">
                {/* section title */}
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <h2 className="title-extra-large text-white alt-font sm-section-title-small letter-spacing-minus-1 xs-section-title-large  margin-four-bottom xs-text-center tz-text">
                    Actionable Insights
                  </h2>
                  <p className="text-extra-large font-weight-300 margin-fifteen-bottom xs-margin-nineteen-bottom xs-text-center tz-text">
                    sigma7 provides financial analytics that are both intuitive
                    and actionable. Rather than showing users balance sheets,
                    tables, and confusing charts, sigma7 digests the financial
                    data for you and presents it to you visually, interactively,
                    and intuitively.
                  </p>
                </div>
                {/* end section title */}
                {/* feature box */}
                <div className="row two-column no-margin">
                  <div className="col-md-6 col-sm-6 col-xs-12 margin-eight-bottom xs-margin-fifteen-bottom xs-text-center">
                    <div className="float-left xs-margin-lr-auto xs-float-none xs-margin-seven-bottom">
                      <i className="fa ti-image text-fast-blue2 title-extra-large tz-icon-color" />
                    </div>
                    <div className="info xs-no-margin xs-width-100 xs-clear-both">
                      <h3 className="text-large text-white alt-font margin-two-bottom  tz-text font-weight-500">
                        Illustrative
                      </h3>
                      <div className="text-medium tz-text">
                        <p>
                          sigma7 analytics are presented to users with pleasing
                          and attractive visuals.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12 margin-eight-bottom xs-margin-fifteen-bottom xs-text-center">
                    <div className="float-left xs-margin-lr-auto xs-float-none xs-margin-seven-bottom">
                      <i className="fa ti-light-bulb text-fast-blue2 title-extra-large tz-icon-color" />
                    </div>
                    <div className="info xs-no-margin xs-width-100 xs-clear-both">
                      <h3 className="text-large text-white alt-font margin-two-bottom  tz-text font-weight-500">
                        Intuitive
                      </h3>
                      <div className="text-medium tz-text">
                        <p>
                          The sigma7 platform is built around user preference
                          and design. With sigma7, the user experience is a
                          priority.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12 xs-margin-fifteen-bottom xs-text-center">
                    <div className="float-left xs-margin-lr-auto xs-float-none xs-margin-seven-bottom">
                      <i className="fa ti-panel text-fast-blue2 title-extra-large tz-icon-color" />
                    </div>
                    <div className="info xs-no-margin xs-width-100 xs-clear-both">
                      <h3 className="text-large text-white alt-font margin-two-bottom  tz-text font-weight-500">
                        Flexible
                      </h3>
                      <div className="text-medium tz-text">
                        <p>
                          sigma7 tools are customizable to the user’s
                          preference. Resize, drag and drop, delete, and or add
                          visuals suited to one’s preference.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12 xs-no-margin-bottom xs-text-center">
                    <div className="float-left xs-margin-lr-auto xs-float-none xs-margin-seven-bottom">
                      <i className="fa ti-money text-fast-blue2 title-extra-large tz-icon-color" />
                    </div>
                    <div className="info xs-no-margin xs-width-100 xs-clear-both">
                      <h3 className="text-large text-white alt-font margin-two-bottom tz-text font-weight-500">
                        Robust
                      </h3>
                      <div className="text-medium tz-text">
                        <p>
                          All of sigma7’s data is accurate, robust, and
                          comprehensive. With sigma7, users will find data on
                          cryptocurrencies, stocks, alternative data, etfs,
                          mutual funds, and econometrics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end feature box */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="padding-110px-tb xs-padding-60px-tb main-light-blue builder-bg border-none"
        id="title-section13"
      >
        <div className="container">
          {/* section title */}
          <div className="row">
            <div className="col-md-7 col-sm-12 col-xs-12 title-small sm-title-small text-center center-col">
              <span className="text-large text-fast-blue2 alt-font tz-text xs-margin-seven-bottom">
                Join sigma7!
              </span>
              <h2 className="title-extra-large-2 letter-spacing-minus-1 text-white alt-font display-block tz-text xs-margin-seven-bottom">
                Start analyzing and tracking your investments with us!
              </h2>
              <div className="text-medium display-block margin-three-top margin-six-bottom tz-text xs-margin-nine-bottom">
                <p>
                  sigma7 is building a platform for all types of investors. From
                  novice to professional trader, sigma7 is built to provide an
                  all-in-one platform for research, trading, and tracking.
                </p>
              </div>
              <a
                href="#subscribe-section6"
                className="btn-medium btn-circle border-2-fast-blue2 btn-border text-fast-blue2"
              >
                <span className="tz-text">Sign Up</span>
                <i className="fa fa-long-arrow-right text-extra-medium tz-icon-color" />
              </a>
            </div>
          </div>
          {/* end section title */}
        </div>
      </section>
      <section
        className="padding-110px-tb xs-padding-60px-tb main-dark-blue builder-bg"
        id="content-section32"
      >
        <div className="container">
          <div className="row equalize xs-equalize-auto equalize-display-inherit">
            <div className="col-lg-5 col-md-6 col-sm-6 xs-12 xs-text-center xs-margin-nineteen-bottom display-table">
              <div className="display-table-cell-vertical-middle">
                <div className="sm-margin-five-bottom alt-font text-fast-blue2 font-weight-400 text-extra-large tz-text">
                  Unleash your investments.
                </div>
                {/* section title */}
                <h2 className="alt-font title-extra-large sm-title-large xs-title-large text-white margin-eight-bottom tz-text sm-margin-ten-bottom letter-spacing-minus-1">
                  Create dashboards your own way in minutes.
                </h2>
                {/* end section title */}
                <div className="text-medium tz-text width-90 sm-width-100 margin-seven-bottom sm-margin-ten-bottom">
                  <p>
                    sigma7 dashboards are built to be customized. Add, remove,
                    resize, drag and drop all in one page. Conveniently save
                    your dashboards and their layouts for later use. sigma7
                    supports cryptocurrencies, US equities, etfs, mutual funds,
                    and econometrics. From novice to professional, sigma7 is
                    democratizing financial data.
                  </p>
                </div>
                <div className="text-medium tz-text width-90 sm-width-100 margin-fifteen-bottom sm-margin-ten-bottom">
                  <p>
                    sigma7 is aggregating more than just traditional data.
                    Alternative data is also on the horizon to provide even more
                    actionable insights for our users. More tools are also on
                    the way!
                  </p>
                </div>
                <a
                  className="btn btn-medium propClone btn-circle bg-fast-blue2 text-white"
                  href="#subscribe-section6"
                >
                  <span className="tz-text">Request a Demo</span>
                  <i className="fa fa-angle-right text-extra-medium tz-icon-color" />
                </a>
              </div>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 xs-12 xs-text-center display-table">
              <div className="display-table-cell-vertical-middle">
                <img alt src={dashboard} data-img-size="(W)800px X (H)785px" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="padding-110px-tb xs-padding-60px-tb main-light-blue builder-bg"
        id="subscribe-section6"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8 center-col col-sm-12 text-center">
              <h2 className="title-extra-large-2 letter-spacing-minus-1 text-white alt-font margin-four-bottom tz-text">
                Contact Us
              </h2>
            </div>
            <div className="col-md-6 center-col col-sm-12 text-center">
              <form className="contact-form" onSubmit={sendEmail}>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  name="from_name"
                  className="big-input main-light-blue alt-font border-radius-4"
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="from_email"
                  className="big-input main-light-blue alt-font border-radius-4"
                />
                <textarea
                  name="message"
                  id="message"
                  placeholder="Message"
                  className="big-input main-light-blue alt-font border-radius-4 message-input"
                />
                <button
                  type="submit"
                  value="Send"
                  className="default-submit btn btn-extra-large2 propClone bg-sigmaBlue btn-3d text-white width-100 builder-bg tz-text"
                >
                  Send
                </button>
              </form>
              {wasEmailSent && <h1 className="email-success">Success!</h1>}
              {wasEmailFailed && <h1 className="email-failed">Failed</h1>}
            </div>
          </div>
        </div>
      </section>
      <footer
        id="footer-section4"
        className="main-dark-blue builder-bg padding-60px-tb xs-padding-40px-tb footer-style4"
      >
        <div className="container">
          <div className="row equalize sm-equalize-auto">
            {/* logo */}
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 sm-text-center sm-margin-five-bottom xs-margin-nine-bottom display-table">
              <div className="display-table-cell-vertical-middle">
                <a href="#home" className="inner-link">
                  <img src={logo} alt width="75" />
                </a>
                © 2021 sigma7.
              </div>
            </div>
            {/* end logo */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
