import React from "react";
import "../../App.scss";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import {
  HomeOutlined,
  LineChartOutlined,
  LayoutOutlined,
} from "@ant-design/icons";

const Sidenavbar = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.setSelectedLayoutName(e.target.value);
    props.setWasSelected(true);
  };

  return (
    <SideNav
      className="sidenav"
      style={{
        backgroundImage: "linear-gradient(315deg, #121516 0%, #000000 74%)",
        position: "fixed",
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon>
            <HomeOutlined />
          </NavIcon>
          <NavText>
            <a href="/">Home</a>
          </NavText>
        </NavItem>
        <NavItem eventKey="home">
          <NavIcon>
            <LineChartOutlined />
          </NavIcon>
          <NavText>
            <a href="/">Portfolio</a>
          </NavText>
        </NavItem>

        {props.storedLayoutNames.map((name, index) => {
          return (
            <NavItem eventKey="home">
              <NavIcon>
                <LayoutOutlined />
              </NavIcon>
              <NavText>
                <button
                  className="btn btn-primary"
                  value={name}
                  onClick={handleClick}
                >
                  {name}
                </button>
              </NavText>
            </NavItem>
          );
        })}
      </SideNav.Nav>
    </SideNav>
  );
};

export default Sidenavbar;
