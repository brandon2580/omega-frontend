import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import logo from "./images/logo.png";
import fullLogo from "./images/fullLogo.png";
import macImage from "./images/macImage.png";
import sigma7_1 from "./images/sigma7_1.png";
import debtAssets from "./images/debt-assets.png";
import ceoPie from "./images/ceo-pie.png";
import compareCeoSmall from "./images/compare-ceo-small.png";
import compareCeoLarge from "./images/compare-ceo-large.png";

// import "./css/base.css";
// import "./css/elements.css";
// import "./css/font-awesome.min.css";
// import "./css/magnific-popup.css";
// import "./css/owl.carousel.css";
// import "./css/owl.transitions.css";
// import "./css/responsive.css";
// import "./css/themify-icons.css";
// import "./assets/css/bootstrap.css";
// import "./assets/fonts/icon-font/css/style.css";
// import "./assets/fonts/typography-font/typo.css";
// import "./assets/fonts/fontawesome-5/css/all.css";
// import "./assets/plugins/aos/aos.min.css";
// import "./assets/plugins/slick/slick.min.css";
// import "./assets/css/main.css";

import "./assets/css/LineIcons.2.0.css";
import "./assets/css/tiny-slider.css";
import "./assets/css/animate.css";
import "./assets/css/main.css";

import LoginButton from "../Auth/Buttons/LoginButton";
import LogoutButton from "../Auth/Buttons/LogoutButton";
import { Menu, notification } from "antd";

import { useAuth0 } from "@auth0/auth0-react";
import { MenuOutlined } from "@ant-design/icons";

const LandingPage = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const [isMobileUser, setIsMobileUser] = useState(false);
  const [wasEmailSent, setWasEmailSent] = useState(false);
  const [wasEmailFailed, setWasEmailFailed] = useState(false);
  const ref = useRef(null);

  const scroll = () => ref.current.scrollIntoView();

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

  const desktopNotification = () => {
    notification.open({
      message: "Notice",
      description: (
        <div>
          We are working on a mobile app! Join the waitlist at{" "}
          <a target="_blank" href={"//" + "join.sigma7.io"}>
            join.sigma7.io
          </a>
        </div>
      ),
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 8,
    });
  };

  const mobileNotification = () => {
    notification.open({
      message: "Notice",
      description: (
        <div>
          We noticed you are using a mobile device. For an optimal experience,
          please use a desktop/laptop OR check out our upcoming app here -
          <a target="_blank" href={"//" + "join.sigma7.io"}>
            join.sigma7.io
          </a>
        </div>
      ),
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: 8,
    });
  };

  useEffect(() => {
    // Check to see if the user is on a mobile device or not
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      mobileNotification();
    } else {
      desktopNotification();
    }
  }, []);
  return (
    <div style={{ background: "#181818" }}>
      
      <section id="home" className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 style={{fontWeight: "700", fontSize: "55px"}}>Stop wasting time reading boring financial statements</h1>
                <p>
                  sigma7 provides simplified stock research in an easy, visual,
                  and digestible manner.
                </p>
                {isAuthenticated ? (
                  <div>
                    <a
                      className=" main-btn btn-hover "
                      href={`dashboard/${user.sub}/Default_Layout/AAPL`}
                    >
                      Launch
                    </a>

                    <i className="fa fa-angle-right text-extra-medium tz-icon-color" />
                  </div>
                ) : (
                  <div>
                    <a
                      onClick={loginWithRedirect}
                      className="main-btn btn-hover"
                    >
                      Login
                    </a>
                    <a
                      href="/demo/AAPL"
                      className="demo-btn btn-hover"
                    >
                      Demo
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image text-center text-lg-start">
                <img src={macImage} style={{ width: "175%", height: "100%", marginLeft: "-222.5px", marginRight: "-222.5px" }} alt="laptop" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section id="second-section" style={{ marginTop: "75px", marginLeft: "50px", marginRight: "50px" }}>
        <div className="row center">
          <div className="col-lg-4 landing-box">
            <p style={{ fontSize: "24px", marginBottom: "40px" }}>Choose from over 20+ widgets to create the perfect dashboard in minutes</p>
            <img src={ceoPie} alt="ceo-pie" />
            <img style={{ marginTop: "20px" }} src={debtAssets} alt="debt-assets" />

          </div>
          <div style={{ marginTop: "40px" }} className="col-lg-4">
            <h1 className="white">Maximize your efficiency</h1>
            <p style={{ fontSize: "20px" }}>Design a dashboard that suits every possible need.</p>
            <div className="landing-box" style={{ marginTop: "40px" }}>
              <p style={{ fontSize: "24px", marginBottom: "40px" }}>Adjust widgets to fit any layout you can imagine</p>
              <img src={compareCeoSmall} alt="ceo-pie" />
              <img src={compareCeoLarge} style={{ width: "100%", marginTop: "40px" }} alt="ceo-pie" />
            </div>
          </div>
          <div className="col-lg-4 landing-box">
            <p style={{ fontSize: "24px", marginBottom: "40px" }}>Share dashboards across your network of friends</p>
            <img src={ceoPie} alt="ceo-pie" />
            <img style={{ marginTop: "20px" }} src={debtAssets} alt="debt-assets" />

          </div>
        </div>
      </section> */}
    </div>
    // <React.Fragment>
    //   <header className="header-style5" id="header-section12">
    //     {/* nav */}
    //     <div className="landing-navbar">
    //       <Menu
    //         overflowedIndicator={
    //           <MenuOutlined className="collapse-icon-antd" />
    //         }
    //         mode="horizontal"
    //       >
    //         <Menu.Item style={{ marginTop: "7px" }}>
    //           <img
    //             src={logo}
    //             width="45"
    //             className="d-inline-block align-top"
    //             alt="sigma7"
    //           />
    //         </Menu.Item>
    //         <Menu.Item>
    //           <a className="nav-link nav-text" href="#content-section44">
    //             About
    //           </a>
    //         </Menu.Item>
    //         <Menu.Item>
    //           <a className="nav-link nav-text" href="#subscribe-section6">
    //             Contact
    //           </a>
    //         </Menu.Item>
    //       </Menu>
    //     </div>

    //     {/* end nav */}
    //   </header>

    //   <section
    //     className="position-relative hero-style19 cover-background tz-builder-bg-image hero-style19 hero-style2 border-none bg-img-one"
    //     id="home"
    //     data-img-size="(W)1920px X (H)800px"
    //     style={{
    //       background:
    //         'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)) repeat scroll 0% 0%, transparent url("https://wallpaperaccess.com/full/944557.jpg") repeat scroll 0% 0%',
    //     }}
    //   >
    //     <div className="container one-sixth-screen xs-height-auto position-relative">
    //       <div className="row">
    //         <div className="slider-typography xs-position-static text-center">
    //           <div className="slider-text-middle-main">
    //             <div className="slider-text-middle text-center xs-padding-fifteen xs-no-padding-lr">
    //               <div className="col-md-9 col-sm-12 col-xs-12 center-col ">
    //                 {/* title */}
    //                 <img
    //                   className="full-logo"
    //                   src={fullLogo}
    //                   style={{ marginTop: "50px" }}
    //                   width="50%"
    //                 />
    //                 {/* end title */}
    //                 <div className="btn-dual">
    //                   {isAuthenticated ? (
    //                     <a
    //                       className="btn btn-large propClone bg-golden-yellow  btn-circle xs-margin-ten-bottom xs-width-100"
    //                       href={`dashboard/${user.sub}/Default_Layout/AAPL`}
    //                     >
    //                       <span className="tz-text">Launch</span>

    //                       <i className="fa fa-angle-right text-extra-medium tz-icon-color" />
    //                     </a>
    //                   ) : (
    //                     <a
    //                       onClick={loginWithRedirect}
    //                       className="btn btn-large propClone bg-golden-yellow  btn-circle xs-margin-ten-bottom xs-width-100"
    //                     >
    //                       <span className="tz-text">Login</span>

    //                       <i className="fa fa-angle-right text-extra-medium tz-icon-color" />
    //                     </a>
    //                   )}
    //                   <a
    //                     className="btn btn-large propClone main-light-blue  btn-circle xs-margin-ten-bottom xs-width-100"
    //                     onClick={scroll}
    //                   >
    //                     <span className="tz-text text-white">Read More</span>

    //                     <i className="fa fa-angle-right text-extra-medium tz-icon-color text-white" />
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <section
    //     className="padding-110px-tb feature-style29 main-dark-blue builder-bg xs-padding-60px-tb"
    //     id="content-section44"
    //     ref={ref}
    //   >
    //     <div className="container">
    //       <div
    //         id="actionable-insights"
    //         className="row equalize xs-equalize-auto equalize-display-inherit"
    //       >
    //         <div className="col-md-6 display-table col-sm-12 col-xs-12 xs-margin-nineteen-bottom sm-height-auto">
    //           <div className="display-table-cell-vertical-middle">
    //             <img src={sigma7_1} alt />
    //           </div>
    //         </div>
    //         <div className="col-md-6 col-sm-12 col-xs-12 display-table sm-height-auto">
    //           <div className="display-table-cell-vertical-middle">
    //             {/* section title */}
    //             <div className="col-md-12 col-sm-12 col-xs-12">
    //               <h2
    //                 id="actionable-insights"
    //                 className="title-extra-large text-white alt-font sm-section-title-small letter-spacing-minus-1 xs-section-title-large  margin-four-bottom xs-text-center tz-text"
    //               >
    //                 Actionable Insights
    //               </h2>
    //               <p className="text-extra-large font-weight-300 margin-fifteen-bottom xs-margin-nineteen-bottom xs-text-center tz-text">
    //                 sigma7 provides financial analytics that are both intuitive
    //                 and actionable. Rather than showing users balance sheets,
    //                 tables, and confusing charts, sigma7 digests the financial
    //                 data for you and presents it to you visually, interactively,
    //                 and intuitively.
    //               </p>
    //             </div>
    //             {/* end section title */}
    //             {/* feature box */}
    //             <div className="row two-column no-margin">
    //               <div className="col-md-6 col-sm-6 col-xs-12 margin-eight-bottom xs-margin-fifteen-bottom xs-text-center">
    //                 <div className="float-left xs-margin-lr-auto xs-float-none xs-margin-seven-bottom">
    //                   <i className="fa ti-image text-fast-blue2 title-extra-large tz-icon-color" />
    //                 </div>
    //                 <div className="info xs-no-margin xs-width-100 xs-clear-both">
    //                   <h3 className="text-large text-white alt-font margin-two-bottom  tz-text font-weight-500">
    //                     Illustrative
    //                   </h3>
    //                   <div className="text-medium tz-text">
    //                     <p>
    //                       sigma7 analytics are presented to users with pleasing
    //                       and attractive visuals.
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="col-md-6 col-sm-6 col-xs-12 margin-eight-bottom xs-margin-fifteen-bottom xs-text-center">
    //                 <div className="float-left xs-margin-lr-auto xs-float-none xs-margin-seven-bottom">
    //                   <i className="fa ti-light-bulb text-fast-blue2 title-extra-large tz-icon-color" />
    //                 </div>
    //                 <div className="info xs-no-margin xs-width-100 xs-clear-both">
    //                   <h3 className="text-large text-white alt-font margin-two-bottom  tz-text font-weight-500">
    //                     Intuitive
    //                   </h3>
    //                   <div className="text-medium tz-text">
    //                     <p>
    //                       The sigma7 platform is built around user preference
    //                       and design. With sigma7, the user experience is a
    //                       priority.
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="col-md-6 col-sm-6 col-xs-12 xs-margin-fifteen-bottom xs-text-center">
    //                 <div className="float-left xs-margin-lr-auto xs-float-none xs-margin-seven-bottom">
    //                   <i className="fa ti-panel text-fast-blue2 title-extra-large tz-icon-color" />
    //                 </div>
    //                 <div className="info xs-no-margin xs-width-100 xs-clear-both">
    //                   <h3 className="text-large text-white alt-font margin-two-bottom  tz-text font-weight-500">
    //                     Flexible
    //                   </h3>
    //                   <div className="text-medium tz-text">
    //                     <p>
    //                       sigma7 tools are customizable to the user’s
    //                       preference. Resize, drag and drop, delete, and or add
    //                       visuals suited to one’s preference.
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="col-md-6 col-sm-6 col-xs-12 xs-no-margin-bottom xs-text-center">
    //                 <div className="float-left xs-margin-lr-auto xs-float-none xs-margin-seven-bottom">
    //                   <i className="fa ti-money text-fast-blue2 title-extra-large tz-icon-color" />
    //                 </div>
    //                 <div className="info xs-no-margin xs-width-100 xs-clear-both">
    //                   <h3 className="text-large text-white alt-font margin-two-bottom tz-text font-weight-500">
    //                     Robust
    //                   </h3>
    //                   <div className="text-medium tz-text">
    //                     <p>
    //                       All of sigma7’s data is accurate, robust, and
    //                       comprehensive. With sigma7, users will find data on a
    //                       plethora of stocks.
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             {/* end feature box */}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <section
    //     className="padding-110px-tb xs-padding-60px-tb main-light-blue builder-bg border-none"
    //     id="title-section13"
    //   >
    //     <div className="container">
    //       {/* section title */}
    //       <div className="row">
    //         <div className="col-md-7 col-sm-12 col-xs-12 title-small sm-title-small text-center center-col">
    //           <span className="text-large text-fast-blue2 alt-font tz-text xs-margin-seven-bottom">
    //             Join sigma7!
    //           </span>
    //           <h2 className="title-extra-large-2 letter-spacing-minus-1 text-white alt-font display-block tz-text xs-margin-seven-bottom">
    //             Start analyzing and tracking your investments with us!
    //           </h2>
    //           <div className="text-medium display-block margin-three-top margin-six-bottom tz-text xs-margin-nine-bottom">
    //             <p>
    //               sigma7 is building a platform for all types of investors. From
    //               novice to professional trader, sigma7 is built to provide an
    //               all-in-one platform for research, trading, and tracking.
    //             </p>
    //           </div>
    //           {isAuthenticated ? (
    //             <a
    //               className="btn btn-large propClone bg-golden-yellow  btn-circle xs-margin-ten-bottom xs-width-100"
    //               href={`dashboard/${user.sub}/Default_Layout/AAPL`}
    //             >
    //               <span className="tz-text">Launch</span>

    //               <i className="fa fa-angle-right text-extra-medium tz-icon-color" />
    //             </a>
    //           ) : (
    //             <a
    //               onClick={loginWithRedirect}
    //               className="btn btn-large propClone bg-golden-yellow  btn-circle xs-margin-ten-bottom xs-width-100"
    //             >
    //               <span className="tz-text">Login</span>

    //               <i className="fa fa-angle-right text-extra-medium tz-icon-color" />
    //             </a>
    //           )}
    //         </div>
    //       </div>
    //       {/* end section title */}
    //     </div>
    //   </section>
    //   <section
    //     className="padding-110px-tb xs-padding-60px-tb main-dark-blue builder-bg"
    //     id="content-section32"
    //   >
    //     <div className="container">
    //       <div className="row equalize xs-equalize-auto equalize-display-inherit">
    //         <div className="col-lg-5 col-md-6 col-sm-6 xs-12 xs-text-center xs-margin-nineteen-bottom display-table">
    //           <div className="display-table-cell-vertical-middle">
    //             <div className="sm-margin-five-bottom alt-font text-fast-blue2 font-weight-400 text-extra-large tz-text">
    //               Unleash your investments.
    //             </div>
    //             {/* section title */}
    //             <h2 className="alt-font title-extra-large sm-title-large xs-title-large text-white margin-eight-bottom tz-text sm-margin-ten-bottom letter-spacing-minus-1">
    //               Create dashboards your own way in minutes.
    //             </h2>
    //             {/* end section title */}
    //             <div className="text-medium tz-text width-90 sm-width-100 margin-seven-bottom sm-margin-ten-bottom">
    //               <p>
    //                 sigma7 dashboards are built to be customized. Add, remove,
    //                 resize, drag and drop all in one page. Conveniently save
    //                 your dashboards and their layouts for later use. sigma7
    //                 supports cryptocurrencies, US equities, etfs, mutual funds,
    //                 and econometrics. From novice to professional, sigma7 is
    //                 democratizing financial data.
    //               </p>
    //             </div>
    //             <div className="text-medium tz-text width-90 sm-width-100 margin-fifteen-bottom sm-margin-ten-bottom">
    //               <p>
    //                 sigma7 is aggregating more than just traditional data.
    //                 Alternative data is also on the horizon to provide even more
    //                 actionable insights for our users. More tools are also on
    //                 the way!
    //               </p>
    //             </div>
    //             {isAuthenticated ? (
    //               <a
    //                 className="btn btn-large propClone bg-golden-yellow  btn-circle xs-margin-ten-bottom xs-width-100"
    //                 href={`dashboard/${user.sub}/Default_Layout/AAPL`}
    //               >
    //                 <span className="tz-text">Launch</span>

    //                 <i className="fa fa-angle-right text-extra-medium tz-icon-color" />
    //               </a>
    //             ) : (
    //               <a
    //                 onClick={loginWithRedirect}
    //                 className="btn btn-large propClone bg-golden-yellow  btn-circle xs-margin-ten-bottom xs-width-100"
    //               >
    //                 <span className="tz-text">Login</span>

    //                 <i className="fa fa-angle-right text-extra-medium tz-icon-color" />
    //               </a>
    //             )}
    //           </div>
    //         </div>
    //         <div className="col-lg-7 col-md-6 col-sm-6 xs-12 xs-text-center display-table">
    //           <div className="display-table-cell-vertical-middle">
    //             <img alt src={dashboard} data-img-size="(W)800px X (H)785px" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <section
    //     className="padding-110px-tb xs-padding-60px-tb main-light-blue builder-bg"
    //     id="subscribe-section6"
    //   >
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-md-8 center-col col-sm-12 text-center">
    //           <h2 className="title-extra-large-2 letter-spacing-minus-1 text-white alt-font margin-four-bottom tz-text">
    //             Contact Us
    //           </h2>
    //         </div>
    //         <div className="col-md-6 center-col col-sm-12 text-center">
    //           <form className="contact-form" onSubmit={sendEmail}>
    //             <input
    //               type="text"
    //               id="name"
    //               placeholder="Your Name"
    //               name="from_name"
    //               className="big-input main-light-blue alt-font border-radius-4"
    //             />
    //             <input
    //               type="email"
    //               id="email"
    //               placeholder="Email"
    //               name="from_email"
    //               className="big-input main-light-blue alt-font border-radius-4"
    //             />
    //             <textarea
    //               name="message"
    //               id="message"
    //               placeholder="Message"
    //               className="big-input main-light-blue alt-font border-radius-4 message-input"
    //             />
    //             <button
    //               type="submit"
    //               value="Send"
    //               className="default-submit btn btn-extra-large2 propClone bg-sigmaBlue btn-3d text-white width-100 builder-bg tz-text"
    //             >
    //               Send
    //             </button>
    //           </form>
    //           {wasEmailSent && <h1 className="email-success">Success!</h1>}
    //           {wasEmailFailed && <h1 className="email-failed">Failed</h1>}
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <footer
    //     id="footer-section4"
    //     className="main-dark-blue builder-bg padding-60px-tb xs-padding-40px-tb footer-style4"
    //   >
    //     <div className="container">
    //       <div className="row equalize sm-equalize-auto">
    //         {/* logo */}
    //         <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 sm-text-center sm-margin-five-bottom xs-margin-nine-bottom display-table">
    //           <div className="display-table-cell-vertical-middle">
    //             <a href="#home" className="inner-link">
    //               <img src={logo} alt width="75" />
    //             </a>
    //             © 2021 sigma7. <a href="/disclaimer">Disclaimer</a>
    //           </div>
    //         </div>
    //         {/* end logo */}
    //       </div>
    //     </div>
    //   </footer>
    // </React.Fragment>
  );
};

export default LandingPage;
