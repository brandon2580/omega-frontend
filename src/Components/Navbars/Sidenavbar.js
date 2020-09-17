import React from "react";
import "../../App.scss";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import {
  HomeOutlined,
  LineChartOutlined,
  LayoutOutlined,
} from "@ant-design/icons";

const Sidenavbar = (props) => {
  const handleClick = () => {

  }

  return (
    <SideNav
      style={{
        backgroundImage: "linear-gradient(315deg, #121516 0%, #000000 74%)",
        position: "fixed",
      }}
      className="sidenav"
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
                <a onClick={handleClick}>{name}</a>
              </NavText>
            </NavItem>
          );
        })}
      </SideNav.Nav>
    </SideNav>
  );
};

export default Sidenavbar;
