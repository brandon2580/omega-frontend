import React, { useEffect, useState } from "react";
import "../../../App.scss";
import SideNav, { NavIcon, NavItem, NavText } from "@trendmicro/react-sidenav";
import DarkModeToggle from "../../DarkModeToggle";

import {
  CloudOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../images/logo.png";
import "firebase/firestore";

const DemoSidenavbar = (props) => {
  const { loginWithRedirect } = useAuth0();

  const [sidenavTextStyle, setSidenavTextStyle] = useState("hidden");
  const [logoStyle, setLogoStyle] = useState("");
  const [miscIconStyle, setMiscIconStyle] = useState("18px");
  const [sidenavToggleStyle, setSidenavToggleStyle] = useState("");


  return (
    <SideNav
      onToggle={(isExpanded) => {
        isExpanded
          ? setSidenavTextStyle("visible")
          : setSidenavTextStyle("hidden");
        isExpanded ? setLogoStyle("-70px") : setLogoStyle("");
        isExpanded ? setSidenavToggleStyle("80px") : setSidenavToggleStyle("");
        isExpanded ? setMiscIconStyle("10px") : setMiscIconStyle("18px");
      }}
      className="sidenav"
      style={{
        backgroundColor: "black",
        position: "fixed",
      }}
    >
      <a href="/">
        <img
          src={logo}
          width="65"
          className="d-inline-block align-top"
          alt="sigma7"
          style={{ marginLeft: logoStyle }}
        />
      </a>
      <SideNav.Toggle
        id="sidenav-toggle"
        style={{ marginTop: sidenavToggleStyle }}
      />

      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          {/* <NavIcon>
            <DollarOutlined />
          </NavIcon> */}
          <NavText>
            <div className="col-lg-12">
              <p
                style={{ visibility: sidenavTextStyle }}
                className="dashboards-text"
              >
                Stocks Dashboard
              </p>
            </div>
            <hr className="dashboards-hr" />
          </NavText>
        </NavItem>
        <p style={{marginLeft: "10px", visibility: sidenavTextStyle}} className="text">Please <a className="blue" onClick={loginWithRedirect}>login</a> to view saved dashboards</p>

        <span className="bottom-sidenav">
          <hr className="sidenav-misc-hr" />
          <span className="justify-content-left sidenav-misc-button">
            <CloudOutlined
              style={{ marginLeft: miscIconStyle }}
              className="color-scheme-icon"
            />
            <h4
              style={{ visibility: sidenavTextStyle }}
              className="sidenav-misc-text"
            >
              Theme
            </h4>
            <DarkModeToggle setDarkMode={props.setDarkMode} />
          </span>
          <hr className="sidenav-misc-hr" />
          <a href="/profile">
            <span className="justify-content-left sidenav-misc-button">
              <UserOutlined
                style={{ marginLeft: miscIconStyle }}
                className="profile-icon"
              />{" "}
              <h4
                style={{ visibility: sidenavTextStyle }}
                className="sidenav-misc-text"
              >
                My Profile
              </h4>
            </span>
          </a>
          <hr className="sidenav-misc-hr" />
          <span
            className="justify-content-left sidenav-misc-button"
          >
            <LogoutOutlined
              style={{ marginLeft: miscIconStyle }}
              className="logout-icon"
            />{" "}
            <h4
              style={{ visibility: sidenavTextStyle }}
              className="sidenav-misc-text"
            >
              Log Out
            </h4>
          </span>
        </span>
      </SideNav.Nav>
    </SideNav>
  );
};

export default DemoSidenavbar;
