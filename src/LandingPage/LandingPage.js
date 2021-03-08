import React from "react";
import ScriptTag from "react-script-tag";
import logo from "./images/logo.png";
import fullLogo from "./images/fullLogo.png";
import "./css/base.css";
import "./css/elements.css";
import "./css/font-awesome.min.css";
import "./css/magnific-popup.css";
import "./css/owl.carousel.css";
import "./css/owl.transitions.css";
import "./css/responsive.css";
import "./css/themify-icons.css";
// import './js/counter.js'
// import './js/equalize.min.js'
// import './js/html5shiv.min.js'
// import './js/imagesloaded.pkgd.min.js'
// import './js/jquery.appear.js'
// import './js/jquery.countTo.js'
// import './js/jquery.fitvids.js'
// import './js/jquery.isotope.min.js'
// import './js/jquery.magnific-popup.min.js'
// import './js/jquery.min.js'
// import './js/jquery.nav.js'
// import './js/main.js'
// import './js/owl.carousel.min.js'
// import './js/smooth-scroll.js'
// import './js/twitterFetcher_min.js'
// import './js/wow.min.js'

const LandingPage = () => {
  return (
    <div>
      <header className="header-style5" id="header-section12">
        {/* nav */}
        <div className="landing-navbar">
          <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div class="container-fluid">
              <a class="navbar-brand" href="/">
                <img
                  src={logo}
                  width="45"
                  class="d-inline-block align-top"
                  alt="sigma7"
                />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a
                      class="nav-link tz-text nav-text"
                      aria-current="page"
                      href="dashboard"
                    >
                      Demo
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link nav-text" href="#content-section44">
                      About
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link nav-text" href="#subscribe-section6">
                      Contact
                    </a>
                  </li>
                </ul>
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
                      <a
                        className="btn btn-large propClone bg-golden-yellow  btn-circle xs-margin-ten-bottom xs-width-100"
                        href="dashboard"
                      >
                        <span className="tz-text">Demo</span>
                        <i className="fa fa-angle-right text-extra-medium tz-icon-color" />
                      </a>
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
                Any feedback? Feel free to reach out to us!
              </div>
              <a
                className="btn-medium btn text-fast-blue2 border-2-fast-blue2 btn-circle"
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
            <div className="col-md-3 col-sm-6 col-xs-12 sm-margin-nine-bottom xs-margin-fifteen-bottom text-center">
              <div className="feature-box">
                <div className="margin-fifteen-bottom xs-margin-five-bottom">
                  <i className="fa ti-desktop text-fast-blue2 icon-large tz-icon-color" />
                </div>
                <h3 className="feature-title text-white text-medium alt-font display-block margin-three-bottom xs-margin-five-bottom tz-text">
                  Simple
                </h3>
                <div className="feature-text text-medium center-col tz-text">
                  <p className="no-margin-bottom">
                    Lorem Ipsum is simply dummy of the printing and typesetting
                    and industry. Lorem Ipsum been.
                  </p>
                </div>
              </div>
            </div>
            {/* end feature box */}
            {/* feature box */}
            <div className="col-md-3 col-sm-6 col-xs-12 sm-margin-nine-bottom xs-margin-fifteen-bottom text-center">
              <div className="feature-box">
                <div className="margin-fifteen-bottom xs-margin-five-bottom">
                  <i className="fa ti-clipboard text-fast-blue2 icon-large tz-icon-color" />
                </div>
                <h3 className="feature-title text-white text-medium alt-font display-block margin-three-bottom xs-margin-five-bottom tz-text">
                  Well Documented
                </h3>
                <div className="feature-text text-medium center-col tz-text">
                  <p className="no-margin-bottom">
                    Lorem Ipsum is simply dummy of the printing and typesetting
                    and industry. Lorem Ipsum been.
                  </p>
                </div>
              </div>
            </div>
            {/* end feature box */}
            {/* feature box */}
            <div className="col-md-3 col-sm-6 col-xs-12 text-center xs-margin-fifteen-bottom">
              <div className="feature-box">
                <div className="margin-fifteen-bottom xs-margin-five-bottom">
                  <i className="fa ti-settings text-fast-blue2 icon-large tz-icon-color" />
                </div>
                <h3 className="feature-title text-white text-medium alt-font display-block margin-three-bottom xs-margin-five-bottom tz-text">
                  Highly Customizable
                </h3>
                <div className="feature-text text-medium center-col tz-text">
                  <p className="no-margin-bottom">
                    Lorem Ipsum is simply dummy of the printing and typesetting
                    and industry. Lorem Ipsum been.
                  </p>
                </div>
              </div>
            </div>
            {/* end feature box */}
            {/* feature box */}
            <div className="col-md-3 col-sm-6 col-xs-12 text-center">
              <div className="feature-box">
                <div className="margin-eleven-bottom xs-margin-five-bottom">
                  <i className="fa ti-panel text-fast-blue2 icon-large tz-icon-color" />
                </div>
                <h3 className="feature-title text-white text-medium alt-font display-block margin-three-bottom xs-margin-five-bottom tz-text">
                  Friendly Admin
                </h3>
                <div className="feature-text text-medium center-col tz-text">
                  <p className="no-margin-bottom">
                    Lorem Ipsum is simply dummy of the printing and typesetting
                    and industry. Lorem Ipsum been.
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
                  src="http://placehold.it/722x804"
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
                    Amazing ultimate features
                  </h2>
                  <p className="text-extra-large font-weight-300 margin-fifteen-bottom xs-margin-nineteen-bottom xs-text-center tz-text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text.
                  </p>
                </div>
                {/* end section title */}
                {/* feature box */}
                <div className="row two-column no-margin">
                  <div className="col-md-6 col-sm-6 col-xs-12 margin-eight-bottom xs-margin-fifteen-bottom xs-text-center">
                    <div className="float-left xs-margin-lr-auto xs-float-none xs-margin-seven-bottom">
                      <i className="fa ti-crown text-fast-blue2 title-extra-large tz-icon-color" />
                    </div>
                    <div className="info xs-no-margin xs-width-100 xs-clear-both">
                      <h3 className="text-large text-white alt-font margin-two-bottom  tz-text font-weight-500">
                        Considered design
                      </h3>
                      <div className="text-medium tz-text">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting dummy text industry.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12 margin-eight-bottom xs-margin-fifteen-bottom xs-text-center">
                    <div className="float-left xs-margin-lr-auto xs-float-none xs-margin-seven-bottom">
                      <i className="fa ti-bookmark-alt text-fast-blue2 title-extra-large tz-icon-color" />
                    </div>
                    <div className="info xs-no-margin xs-width-100 xs-clear-both">
                      <h3 className="text-large text-white alt-font margin-two-bottom  tz-text font-weight-500">
                        Understand situation
                      </h3>
                      <div className="text-medium tz-text">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting dummy text industry.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12 xs-margin-fifteen-bottom xs-text-center">
                    <div className="float-left xs-margin-lr-auto xs-float-none xs-margin-seven-bottom">
                      <i className="fa ti-filter text-fast-blue2 title-extra-large tz-icon-color" />
                    </div>
                    <div className="info xs-no-margin xs-width-100 xs-clear-both">
                      <h3 className="text-large text-white alt-font margin-two-bottom  tz-text font-weight-500">
                        Impeccable service
                      </h3>
                      <div className="text-medium tz-text">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting dummy text industry.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12 xs-no-margin-bottom xs-text-center">
                    <div className="float-left xs-margin-lr-auto xs-float-none xs-margin-seven-bottom">
                      <i className="fa ti-heart text-fast-blue2 title-extra-large tz-icon-color" />
                    </div>
                    <div className="info xs-no-margin xs-width-100 xs-clear-both">
                      <h3 className="text-large text-white alt-font margin-two-bottom tz-text font-weight-500">
                        Creative collaboration
                      </h3>
                      <div className="text-medium tz-text">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting dummy text industry.
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
                LAUNCH YOUR STARTUP NOW!
              </span>
              <h2 className="title-extra-large-2 letter-spacing-minus-1 text-white alt-font display-block tz-text xs-margin-seven-bottom">
                Get the most amazing builder!
              </h2>
              <div className="text-medium display-block margin-three-top margin-six-bottom tz-text xs-margin-nine-bottom">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the an unknown printer took a
                  galley of type scrambled it to make a type specimen book.
                </p>
              </div>
              <a
                href="#subscribe-section6"
                className="btn-medium btn-circle btn border-2-fast-blue2 btn-border text-fast-blue2"
              >
                <span className="tz-text">SUPPORT US</span>
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
                  Discover our awesomeness.
                </div>
                {/* section title */}
                <h2 className="alt-font title-extra-large sm-title-large xs-title-large text-white margin-eight-bottom tz-text sm-margin-ten-bottom letter-spacing-minus-1">
                  Create high converting landing page in minutes.
                </h2>
                {/* end section title */}
                <div className="text-medium tz-text width-90 sm-width-100 margin-seven-bottom sm-margin-ten-bottom">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. It has survived not only five
                    centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged.
                  </p>
                </div>
                <div className="text-medium tz-text width-90 sm-width-100 margin-fifteen-bottom sm-margin-ten-bottom">
                  <p>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the when an unknown printer took a galley of type
                    scrambled it to make a type specimen book. Lorem Ipsum has
                    been the industry's standard dummy text ever since the when
                    an unknown printer.
                  </p>
                </div>
                <a
                  className="btn btn-medium propClone btn-circle bg-fast-blue2 text-white"
                  href="#subscribe-section6"
                >
                  <span className="tz-text">CREATE YOUR ACCOUNT</span>
                  <i className="fa fa-angle-right text-extra-medium tz-icon-color" />
                </a>
              </div>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 xs-12 xs-text-center display-table">
              <div className="display-table-cell-vertical-middle">
                <img
                  alt
                  src="http://placehold.it/800x820"
                  data-img-size="(W)800px X (H)785px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-gray builder-bg team-style8 padding-110px-tb xs-padding-60px-tb"
        id="team-section8"
      >
        <div className="container">
          <div className="row four-column">
            {/* team member */}
            <div className="col-md-6 col-sm-3 col-xs-12 text-center sm-margin-fifteen-bottom">
              <div className="team position-relative overflow-hidden box-shadow">
                <div className="team-img">
                  <img
                    alt
                    src="http://placehold.it/750x893"
                    data-img-size="(W)750px X (H)893px"
                  />
                </div>
                <div className="team-details main-light-blue builder-bg text-center">
                  <div className="team-name padding-twenty no-padding-lr">
                    <span className="alt-font  tz-text font-weight-500">
                      ANDREW LUPKIN
                    </span>
                    <span className="text-extra-small alt-font display-block tz-text">
                      DEVELOPER
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* end team member */}
            {/* team member */}
            <div className="col-md-6 col-sm-3 col-xs-12 text-center sm-margin-fifteen-bottom">
              <div className="team position-relative overflow-hidden box-shadow">
                <div className="team-img">
                  <img
                    alt
                    src="http://placehold.it/750x893"
                    data-img-size="(W)750px X (H)893px"
                  />
                </div>
                <div className="team-details main-light-blue builder-bg text-center">
                  <div className="team-name padding-twenty no-padding-lr">
                    <span className="alt-font  tz-text font-weight-500">
                      SARA SMITH
                    </span>
                    <span className="text-extra-small alt-font display-block tz-text">
                      DEVELOPER
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* end team member */}
          </div>
        </div>
      </section>
      <section
        className="padding-110px-tb xs-padding-60px-tb main-dark-blue builder-bg"
        id="subscribe-section6"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8 center-col col-sm-12 text-center">
              <h2 className="title-extra-large-2 letter-spacing-minus-1 text-white alt-font margin-four-bottom tz-text">
                Get started free trial!
              </h2>
              <div className="text-extra-large text-white sm-text-extra-large width-80 xs-width-100 center-col margin-twelve-bottom xs-margin-nineteen-bottom tz-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text.
              </div>
            </div>
            <div className="col-md-6 center-col col-sm-12 text-center">
              <form action="javascript:void(0)" method="post">
                <input
                  type="text"
                  name="name"
                  id="name"
                  data-email="required"
                  placeholder="Your Name"
                  className="big-input main-light-blue alt-font border-radius-4"
                />
                <input
                  type="text"
                  name="email"
                  id="email"
                  data-email="required"
                  placeholder="Your Email"
                  className="big-input main-light-blue alt-font border-radius-4"
                />
                <button
                  type="submit"
                  className="default-submit btn btn-extra-large2 propClone bg-deep-green btn-3d text-white width-100 builder-bg tz-text"
                >
                  START YOUR FREE TRIAL NOW!
                </button>
              </form>
              <div className="margin-seven-top text-small2 sm-width-100 center-col tz-text xs-line-height-20">
                * We don't share your personal info with anyone. Check out our{" "}
                <a href="#" className="text-decoration-underline tz-text">
                  Privacy Policy
                </a>{" "}
                for more information.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="padding-110px-tb main-light-blue builder-bg xs-padding-60px-tb"
        id="contact-section5"
      >
        <div className="container">
          <div className="row four-column">
            {/* feature box */}
            <div className="col-md-3 col-sm-6 col-xs-12 sm-margin-nine-bottom xs-margin-fifteen-bottom text-center sm-clear-both">
              <div className="feature-box xs-margin-thirteen xs-no-margin-tb">
                <i className="fa ti-location-pin text-fast-blue2 icon-large tz-icon-color margin-ten-bottom xs-margin-seven-bottom" />
                <h3 className="feature-title text-white text-medium alt-font display-block margin-three-bottom xs-margin-five-bottom tz-text font-weight-500">
                  Contact Address
                </h3>
                <div className="feature-text text-medium center-col tz-text">
                  301 The Greenhouse, Custard,
                  <br />
                  Factory, London, E2 8DY.
                </div>
              </div>
            </div>
            {/* end feature box */}
            {/* feature box */}
            <div className="col-md-3 col-sm-6 col-xs-12 sm-margin-nine-bottom xs-margin-fifteen-bottom text-center">
              <div className="feature-box xs-margin-thirteen xs-no-margin-tb">
                <i className="fa ti-mobile text-fast-blue2 icon-large tz-icon-color margin-ten-bottom xs-margin-seven-bottom" />
                <h3 className="feature-title text-white text-medium alt-font display-block margin-three-bottom xs-margin-five-bottom tz-text font-weight-500">
                  Call Us Today!
                </h3>
                <div className="feature-text text-medium center-col tz-text">
                  (M) +44 (0) 123 456 7890
                  <br />
                  (O) +44 (0) 123 456 7890
                </div>
              </div>
            </div>
            {/* end feature box */}
            {/* feature box */}
            <div className="col-md-3 col-sm-6 col-xs-12 text-center xs-margin-fifteen-bottom sm-clear-both">
              <div className="feature-box xs-margin-thirteen xs-no-margin-tb">
                <i className="fa ti-email text-fast-blue2 icon-large tz-icon-color margin-ten-bottom xs-margin-seven-bottom" />
                <h3 className="feature-title text-white text-medium alt-font display-block margin-three-bottom xs-margin-five-bottom tz-text font-weight-500">
                  Email
                </h3>
                <div className="feature-text text-medium center-col">
                  <a className="tz-text" href="mailto:no-reply@domain.com">
                    no-reply@domain.com
                  </a>
                  <br />
                  <a className="tz-text" href="mailto:help@domain.com">
                    help@domain.com
                  </a>
                </div>
              </div>
            </div>
            {/* end feature box */}
            {/* feature box */}
            <div className="col-md-3 col-sm-6 col-xs-12 text-center">
              <div className="feature-box xs-margin-thirteen xs-no-margin-tb">
                <i className="fa ti-time text-fast-blue2 icon-large tz-icon-color margin-ten-bottom xs-margin-seven-bottom" />
                <h3 className="feature-title text-white text-medium alt-font display-block margin-three-bottom xs-margin-five-bottom tz-text font-weight-500">
                  Working Hours
                </h3>
                <div className="feature-text text-medium center-col tz-text">
                  Mon to Sat - 9 AM to 11 PM
                  <br />
                  Sunday - 10 AM to 6 PM
                </div>
              </div>
            </div>
            {/* end feature box */}
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
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 sm-text-center sm-margin-five-bottom xs-margin-nine-bottom display-table">
              <div className="display-table-cell-vertical-middle">
                <a href="#home" className="inner-link">
                  <img
                    src="images/logo.png"
                    alt
                    data-img-size="(W)163px X (H)39px"
                  />
                </a>
              </div>
            </div>
            {/* end logo */}
            <div className="col-lg-6 col-md-5 col-sm-12 col-xs-12 sm-margin-three-bottom text-center xs-text-center display-table">
              <div className="display-table-cell-vertical-middle">
                <span className="tz-text">
                  © 2016 LeadGen is Proudly Powered By{" "}
                  <a
                    className="text-light-gray2"
                    href="http://www.themezaa.com/"
                  >
                    ThemeZaa
                  </a>
                  .
                </span>
              </div>
            </div>
            {/* social elements */}
            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 text-right sm-text-center display-table">
              <div className="social icon-extra-small display-table-cell-vertical-middle">
                <a href="#" className="margin-sixteen-right">
                  <i className="fa fa-facebook tz-icon-color" />
                </a>
                <a href="#" className="margin-sixteen-right">
                  <i className="fa fa-twitter tz-icon-color" />
                </a>
                <a href="#" className="margin-sixteen-right">
                  <i className="fa fa-google-plus tz-icon-color" />
                </a>
                <a href="#" className="margin-sixteen-right">
                  <i className="fa fa-pinterest tz-icon-color" />
                </a>
                <a href="#" className="margin-sixteen-right">
                  <i className="fa fa-linkedin tz-icon-color" />
                </a>
                <a href="#">
                  <i className="fa fa-youtube tz-icon-color" />
                </a>
              </div>
            </div>
            {/* end social elements */}
          </div>
        </div>
      </footer>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/jquery.min.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/jquery.appear.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/smooth-scroll.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/bootstrap.min.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/wow.min.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/owl.carousel.min.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/imagesloaded.pkgd.min.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/jquery.isotope.min.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/jquery.magnific-popup.min.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/jquery.nav.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/equalize.min.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/jquery.fitvids.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/jquery.countTo.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/counter.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/twitterFetcher_min.js"
      ></ScriptTag>
      <ScriptTag
        isHydrating={true}
        type="text/javascript"
        src="js/main.js"
      ></ScriptTag>
    </div>
  );
};

export default LandingPage;
